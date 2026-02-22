export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: PokemonListItem[]
}

export interface PokemonListItem {
  name: string
  url: string
}

export interface Pokemon {
  id: number
  name: string
  height: number
  weight: number
  sprites: PokemonSprites
  types: PokemonTypeSlot[]
  stats: PokemonStat[]
  species: {
    name: string
    url: string
  }
}

export interface PokemonSprites {
  front_default: string | null
  front_shiny: string | null
  other?: {
    'official-artwork'?: {
      front_default: string | null
      front_shiny: string | null
    }
    home?: {
      front_default: string | null
      front_shiny: string | null
    }
  }
  versions?: {
    'generation-i'?: {
      'red-blue'?: {
        front_default: string | null
      }
    }
  }
}

export interface PokemonTypeSlot {
  slot: number
  type: {
    name: string
    url: string
  }
}

export interface PokemonStat {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}

export interface PokemonSpecies {
  id: number
  name: string
  names: LocalizedName[]
  flavor_text_entries: FlavorTextEntry[]
  genera: Genus[]
  evolution_chain: {
    url: string
  }
  varieties: {
    is_default: boolean
    pokemon: {
      name: string
      url: string
    }
  }[]
}

export interface LocalizedName {
  name: string
  language: {
    name: string
    url: string
  }
}

export interface FlavorTextEntry {
  flavor_text: string
  language: {
    name: string
    url: string
  }
  version: {
    name: string
    url: string
  }
}

export interface Genus {
  genus: string
  language: {
    name: string
    url: string
  }
}

export interface EvolutionChain {
  id: number
  chain: ChainLink
}

export interface ChainLink {
  species: {
    name: string
    url: string
  }
  evolution_details: EvolutionDetail[]
  evolves_to: ChainLink[]
}

export interface EvolutionDetail {
  min_level: number | null
  trigger: {
    name: string
    url: string
  }
  item: {
    name: string
    url: string
  } | null
}

export interface ProcessedPokemon {
  id: number
  name: string
  nameFr: string
  height: number
  weight: number
  sprite: string
  spriteShiny: string
  spritePixel: string
  types: string[]
  typesFr: string[]
  stats: {
    name: string
    nameFr: string
    value: number
  }[]
  descriptionFr: string
  genusFr: string
}

export interface EvolutionStage {
  id: number
  name: string
  nameFr: string
  sprite: string
  minLevel: number | null
  trigger: string | null
  item: string | null
}

export interface Item {
  id: number
  name: string
  nameFr: string
  sprite: string
  category: string
  effect: string
}

export interface Berry {
  id: number
  name: string
  nameFr: string
  sprite: string
  firmness: string
  size: number
  smoothness: number
  flavors: {
    name: string
    potency: number
  }[]
}

export interface ItemResponse {
  id: number
  name: string
  names: LocalizedName[]
  sprites: {
    default: string | null
  }
  category: {
    name: string
    url: string
  }
  effect_entries: {
    effect: string
    short_effect: string
    language: {
      name: string
      url: string
    }
  }[]
}

export interface BerryResponse {
  id: number
  name: string
  firmness: {
    name: string
    url: string
  }
  size: number
  smoothness: number
  flavors: {
    flavor: {
      name: string
      url: string
    }
    potency: number
  }[]
  item: {
    name: string
    url: string
  }
}

export type PokemonType =
  | 'normal'
  | 'fire'
  | 'water'
  | 'electric'
  | 'grass'
  | 'ice'
  | 'fighting'
  | 'poison'
  | 'ground'
  | 'flying'
  | 'psychic'
  | 'bug'
  | 'rock'
  | 'ghost'
  | 'dragon'
  | 'dark'
  | 'steel'
  | 'fairy'
