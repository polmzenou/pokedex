import {
  Pokemon,
  PokemonListResponse,
  PokemonSpecies,
  EvolutionChain,
  ProcessedPokemon,
  EvolutionStage,
  ItemResponse,
  BerryResponse,
  Item,
  Berry,
  PokemonListItem,
} from '@/types/pokemon'
import { GenerationResponse, Generation, GENERATION_RANGES } from '@/types/generation'
import { MoveResponse, Move, PokemonMoveEntry } from '@/types/move'
import { AbilityResponse, Ability, PokemonAbilityEntry } from '@/types/ability'
import { VarietyInfo, FORM_TYPE_LABELS } from '@/types/form'
import { TypeResponse, TypeEffectiveness } from '@/types/typeEffectiveness'
import {
  TYPE_NAMES_FR,
  STAT_NAMES_FR,
  cleanFlavorText,
  extractIdFromUrl,
} from './utils'

const API_BASE = 'https://pokeapi.co/api/v2'
const CACHE_OPTIONS = { next: { revalidate: 86400 } }

async function fetchApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, CACHE_OPTIONS)
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`)
  }
  return response.json()
}

export async function getPokemonList(
  offset: number = 0,
  limit: number = 151
): Promise<PokemonListItem[]> {
  const data = await fetchApi<PokemonListResponse>(
    `/pokemon?offset=${offset}&limit=${limit}`
  )
  return data.results
}

export async function getPokemon(nameOrId: string | number): Promise<Pokemon> {
  return fetchApi<Pokemon>(`/pokemon/${nameOrId}`)
}

export async function getPokemonSpecies(
  nameOrId: string | number
): Promise<PokemonSpecies> {
  return fetchApi<PokemonSpecies>(`/pokemon-species/${nameOrId}`)
}

export async function getEvolutionChain(id: number): Promise<EvolutionChain> {
  return fetchApi<EvolutionChain>(`/evolution-chain/${id}`)
}

export async function getProcessedPokemon(
  nameOrId: string | number
): Promise<ProcessedPokemon> {
  const [pokemon, species] = await Promise.all([
    getPokemon(nameOrId),
    getPokemonSpecies(nameOrId),
  ])

  const nameFr =
    species.names.find((n) => n.language.name === 'fr')?.name || pokemon.name

  const descriptionFr =
    species.flavor_text_entries.find((e) => e.language.name === 'fr')
      ?.flavor_text || ''

  const genusFr =
    species.genera.find((g) => g.language.name === 'fr')?.genus || ''

  return {
    id: pokemon.id,
    name: pokemon.name,
    nameFr,
    height: pokemon.height,
    weight: pokemon.weight,
    sprite:
      pokemon.sprites.other?.['official-artwork']?.front_default ||
      pokemon.sprites.front_default ||
      '',
    spriteShiny:
      pokemon.sprites.other?.['official-artwork']?.front_shiny ||
      pokemon.sprites.front_shiny ||
      '',
    spritePixel: pokemon.sprites.front_default || '',
    types: pokemon.types.map((t) => t.type.name),
    typesFr: pokemon.types.map(
      (t) => TYPE_NAMES_FR[t.type.name] || t.type.name
    ),
    stats: pokemon.stats.map((s) => ({
      name: s.stat.name,
      nameFr: STAT_NAMES_FR[s.stat.name] || s.stat.name,
      value: s.base_stat,
    })),
    descriptionFr: cleanFlavorText(descriptionFr),
    genusFr,
  }
}

export async function getEvolutionStages(
  speciesNameOrId: string | number
): Promise<EvolutionStage[]> {
  const species = await getPokemonSpecies(speciesNameOrId)
  const chainId = extractIdFromUrl(species.evolution_chain.url)
  const chain = await getEvolutionChain(chainId)

  const stages: EvolutionStage[] = []

  async function processChainLink(
    link: EvolutionChain['chain'],
    prevEvolutionDetails?: EvolutionChain['chain']['evolution_details'][0]
  ) {
    const speciesId = extractIdFromUrl(link.species.url)

    try {
      const [pokemon, speciesData] = await Promise.all([
        getPokemon(speciesId),
        getPokemonSpecies(speciesId),
      ])

      const nameFr =
        speciesData.names.find((n) => n.language.name === 'fr')?.name ||
        link.species.name

      stages.push({
        id: speciesId,
        name: link.species.name,
        nameFr,
        sprite: pokemon.sprites.front_default || '',
        minLevel: prevEvolutionDetails?.min_level || null,
        trigger: prevEvolutionDetails?.trigger?.name || null,
        item: prevEvolutionDetails?.item?.name || null,
      })
    } catch {
      stages.push({
        id: speciesId,
        name: link.species.name,
        nameFr: link.species.name,
        sprite: '',
        minLevel: prevEvolutionDetails?.min_level || null,
        trigger: prevEvolutionDetails?.trigger?.name || null,
        item: prevEvolutionDetails?.item?.name || null,
      })
    }

    for (const evolution of link.evolves_to) {
      await processChainLink(evolution, evolution.evolution_details[0])
    }
  }

  await processChainLink(chain.chain)
  return stages
}

export async function getPokemonListWithDetails(
  offset: number = 0,
  limit: number = 151
): Promise<
  { id: number; name: string; nameFr: string; sprite: string; types: string[] }[]
> {
  const list = await getPokemonList(offset, limit)

  const detailsPromises = list.map(async (item) => {
    const id = extractIdFromUrl(item.url)
    try {
      const [pokemon, species] = await Promise.all([
        getPokemon(id),
        getPokemonSpecies(id),
      ])

      const nameFr =
        species.names.find((n) => n.language.name === 'fr')?.name || item.name

      return {
        id,
        name: item.name,
        nameFr,
        sprite: pokemon.sprites.front_default || '',
        types: pokemon.types.map((t) => t.type.name),
      }
    } catch {
      return {
        id,
        name: item.name,
        nameFr: item.name,
        sprite: '',
        types: [],
      }
    }
  })

  return Promise.all(detailsPromises)
}

export async function getItems(limit: number = 20): Promise<Item[]> {
  const response = await fetchApi<{ results: { name: string; url: string }[] }>(
    `/item?limit=${limit}`
  )

  const itemsPromises = response.results.map(async (item) => {
    const id = extractIdFromUrl(item.url)
    try {
      const itemData = await fetchApi<ItemResponse>(`/item/${id}`)

      const nameFr =
        itemData.names.find((n) => n.language.name === 'fr')?.name || item.name

      const effectEntry = itemData.effect_entries.find(
        (e) => e.language.name === 'fr'
      ) ||
        itemData.effect_entries.find((e) => e.language.name === 'en') || {
          short_effect: '',
        }

      return {
        id,
        name: item.name,
        nameFr,
        sprite: itemData.sprites.default || '',
        category: itemData.category.name,
        effect: effectEntry.short_effect,
      }
    } catch {
      return {
        id,
        name: item.name,
        nameFr: item.name,
        sprite: '',
        category: '',
        effect: '',
      }
    }
  })

  return Promise.all(itemsPromises)
}

export async function getBerries(limit: number = 20): Promise<Berry[]> {
  const response = await fetchApi<{ results: { name: string; url: string }[] }>(
    `/berry?limit=${limit}`
  )

  const berriesPromises = response.results.map(async (berry) => {
    const id = extractIdFromUrl(berry.url)
    try {
      const berryData = await fetchApi<BerryResponse>(`/berry/${id}`)
      const itemData = await fetchApi<ItemResponse>(
        `/item/${berryData.item.name}`
      )

      const nameFr =
        itemData.names.find((n) => n.language.name === 'fr')?.name || berry.name

      return {
        id,
        name: berry.name,
        nameFr,
        sprite: itemData.sprites.default || '',
        firmness: berryData.firmness.name,
        size: berryData.size,
        smoothness: berryData.smoothness,
        flavors: berryData.flavors
          .filter((f) => f.potency > 0)
          .map((f) => ({
            name: f.flavor.name,
            potency: f.potency,
          })),
      }
    } catch {
      return {
        id,
        name: berry.name,
        nameFr: berry.name,
        sprite: '',
        firmness: '',
        size: 0,
        smoothness: 0,
        flavors: [],
      }
    }
  })

  return Promise.all(berriesPromises)
}

// ============================================
// GENERATION FUNCTIONS
// ============================================

export async function getGeneration(id: number): Promise<Generation> {
  const data = await fetchApi<GenerationResponse>(`/generation/${id}`)
  
  const nameFr = data.names.find((n) => n.language.name === 'fr')?.name || data.name
  
  return {
    id: data.id,
    name: data.name,
    nameFr,
    region: data.main_region.name,
    pokemonCount: data.pokemon_species.length,
  }
}

export async function getPokemonByGeneration(
  generationId: number
): Promise<{ id: number; name: string; nameFr: string; sprite: string; types: string[] }[]> {
  const range = GENERATION_RANGES[generationId]
  if (!range) return []

  const limit = range.end - range.start + 1
  const offset = range.start - 1

  return getPokemonListWithDetails(offset, limit)
}

export async function getAllGenerations(): Promise<Generation[]> {
  const generations = await Promise.all(
    Array.from({ length: 9 }, (_, i) => getGeneration(i + 1))
  )
  return generations
}

// ============================================
// MOVE FUNCTIONS
// ============================================

export async function getMove(nameOrId: string | number): Promise<Move> {
  const data = await fetchApi<MoveResponse>(`/move/${nameOrId}`)

  const nameFr = data.names.find((n) => n.language.name === 'fr')?.name || data.name

  const effectFr =
    data.flavor_text_entries.find((e) => e.language.name === 'fr')?.flavor_text ||
    data.effect_entries.find((e) => e.language.name === 'fr')?.short_effect ||
    data.effect_entries.find((e) => e.language.name === 'en')?.short_effect ||
    ''

  return {
    id: data.id,
    name: data.name,
    nameFr,
    type: data.type.name,
    damageClass: data.damage_class.name,
    power: data.power,
    accuracy: data.accuracy,
    pp: data.pp,
    effectFr: cleanFlavorText(effectFr),
  }
}

export async function getPokemonMoves(
  pokemonName: string,
  method: string = 'level-up',
  limit: number = 20
): Promise<Move[]> {
  const pokemon = await getPokemon(pokemonName)

  const levelUpMoves = (pokemon as unknown as { moves: PokemonMoveEntry[] }).moves
    .filter((m) =>
      m.version_group_details.some((v) => v.move_learn_method.name === method)
    )
    .slice(0, limit)

  const movePromises = levelUpMoves.map(async (m) => {
    try {
      return await getMove(m.move.name)
    } catch {
      return null
    }
  })

  const moves = await Promise.all(movePromises)
  return moves.filter((m): m is Move => m !== null)
}

// ============================================
// ABILITY FUNCTIONS
// ============================================

export async function getAbility(nameOrId: string | number): Promise<Omit<Ability, 'isHidden'>> {
  const data = await fetchApi<AbilityResponse>(`/ability/${nameOrId}`)

  const nameFr = data.names.find((n) => n.language.name === 'fr')?.name || data.name

  const descriptionFr =
    data.flavor_text_entries.find((e) => e.language.name === 'fr')?.flavor_text ||
    data.effect_entries.find((e) => e.language.name === 'fr')?.short_effect ||
    data.effect_entries.find((e) => e.language.name === 'en')?.short_effect ||
    ''

  return {
    id: data.id,
    name: data.name,
    nameFr,
    descriptionFr: cleanFlavorText(descriptionFr),
  }
}

export async function getPokemonAbilities(pokemonName: string): Promise<Ability[]> {
  const pokemon = await getPokemon(pokemonName)
  const abilityEntries = (pokemon as unknown as { abilities: PokemonAbilityEntry[] }).abilities

  const abilityPromises = abilityEntries.map(async (entry) => {
    try {
      const ability = await getAbility(entry.ability.name)
      return {
        ...ability,
        isHidden: entry.is_hidden,
      }
    } catch {
      return null
    }
  })

  const abilities = await Promise.all(abilityPromises)
  return abilities.filter((a): a is Ability => a !== null)
}

// ============================================
// TYPE EFFECTIVENESS FUNCTIONS
// ============================================

export async function getTypeData(typeName: string): Promise<TypeResponse> {
  return fetchApi<TypeResponse>(`/type/${typeName}`)
}

export async function calculateTypeEffectiveness(types: string[]): Promise<TypeEffectiveness> {
  const typeDataPromises = types.map((t) => getTypeData(t))
  const typeData = await Promise.all(typeDataPromises)

  const multipliers: Record<string, number> = {}

  for (const data of typeData) {
    for (const t of data.damage_relations.double_damage_from) {
      multipliers[t.name] = (multipliers[t.name] || 1) * 2
    }
    for (const t of data.damage_relations.half_damage_from) {
      multipliers[t.name] = (multipliers[t.name] || 1) * 0.5
    }
    for (const t of data.damage_relations.no_damage_from) {
      multipliers[t.name] = 0
    }
  }

  const weaknesses: { type: string; multiplier: number }[] = []
  const resistances: { type: string; multiplier: number }[] = []
  const immunities: string[] = []

  for (const [type, mult] of Object.entries(multipliers)) {
    if (mult === 0) {
      immunities.push(type)
    } else if (mult > 1) {
      weaknesses.push({ type, multiplier: mult })
    } else if (mult < 1) {
      resistances.push({ type, multiplier: mult })
    }
  }

  weaknesses.sort((a, b) => b.multiplier - a.multiplier)
  resistances.sort((a, b) => a.multiplier - b.multiplier)

  return { weaknesses, resistances, immunities }
}

// ============================================
// FORM / VARIETY FUNCTIONS
// ============================================

function detectFormType(name: string): 'mega' | 'alola' | 'galar' | 'hisui' | 'gmax' | 'other' {
  const lowerName = name.toLowerCase()
  if (lowerName.includes('-mega') || lowerName.includes('mega-')) return 'mega'
  if (lowerName.includes('-alola') || lowerName.includes('alolan')) return 'alola'
  if (lowerName.includes('-galar') || lowerName.includes('galarian')) return 'galar'
  if (lowerName.includes('-hisui') || lowerName.includes('hisuian')) return 'hisui'
  if (lowerName.includes('-gmax') || lowerName.includes('gigantamax')) return 'gmax'
  return 'other'
}

export async function getPokemonVarieties(speciesName: string): Promise<VarietyInfo[]> {
  const species = await getPokemonSpecies(speciesName)

  const varietyPromises = species.varieties.map(async (variety) => {
    try {
      const pokemon = await getPokemon(variety.pokemon.name)

      const formType = variety.is_default ? 'other' : detectFormType(variety.pokemon.name)

      let formLabel = FORM_TYPE_LABELS[formType] || ''
      if (variety.is_default) {
        formLabel = 'Normal'
      }

      return {
        name: variety.pokemon.name,
        isDefault: variety.is_default,
        formType,
        formLabel,
        sprite:
          pokemon.sprites.other?.['official-artwork']?.front_default ||
          pokemon.sprites.front_default ||
          '',
        types: pokemon.types.map((t) => t.type.name),
        stats: pokemon.stats.map((s) => ({
          name: s.stat.name,
          nameFr: STAT_NAMES_FR[s.stat.name] || s.stat.name,
          value: s.base_stat,
        })),
      }
    } catch {
      return null
    }
  })

  const varieties = await Promise.all(varietyPromises)
  return varieties.filter((v): v is VarietyInfo & { formLabel: string } => v !== null)
}
