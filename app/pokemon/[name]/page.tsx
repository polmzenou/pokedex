import { Metadata } from 'next'
import Link from 'next/link'
import { getProcessedPokemon, getEvolutionStages, getPokemonVarieties } from '@/lib/api'
import { formatPokemonId, formatHeight, formatWeight } from '@/lib/utils'
import TypeBadge from '@/components/TypeBadge'
import StatBar from '@/components/StatBar'
import EvolutionChain from '@/components/EvolutionChain'
import ShinyToggle from './ShinyToggle'
import MobileFormSelector from './MobileFormSelector'
import MobileTabs from './MobileTabs'

export const revalidate = 86400

interface Props {
  params: Promise<{ name: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params
  try {
    const pokemon = await getProcessedPokemon(name)
    return {
      title: `${pokemon.nameFr} - Pokédex GameBoy`,
      description: pokemon.descriptionFr || `Informations sur ${pokemon.nameFr}`,
    }
  } catch {
    return {
      title: 'Pokémon non trouvé - Pokédex GameBoy',
    }
  }
}

export default async function PokemonPage({ params }: Props) {
  const { name } = await params

  let pokemon
  let evolution
  let varieties

  try {
    ;[pokemon, evolution, varieties] = await Promise.all([
      getProcessedPokemon(name),
      getEvolutionStages(name),
      getPokemonVarieties(name),
    ])
  } catch {
    return (
      <div className="min-h-screen bg-gameboy-darkest flex items-center justify-center">
        <div className="text-center p-6">
          <div className="font-pixel text-red-500 text-lg mb-4">Erreur</div>
          <div className="font-pixel text-gameboy-light text-[10px] mb-6">
            Pokémon non trouvé
          </div>
          <Link
            href="/"
            className="font-pixel text-[10px] text-white bg-gameboy-light px-4 py-2 border-2 border-gameboy-lightest rounded shadow-[4px_4px_0_#0a1628] hover:bg-gameboy-lightest transition-colors"
          >
            ← Retour
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gameboy-darkest">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-gameboy-dark to-gameboy-darkest border-b-4 border-gameboy-light/30">
        <div className="flex items-center justify-between px-4 py-3">
          <Link
            href="/"
            className="font-pixel text-[10px] text-gameboy-lightest hover:text-white transition-colors flex items-center gap-2"
          >
            ← Retour
          </Link>
          <h1 className="font-pixel text-gameboy-lightest text-sm">POKÉDEX</h1>
          <div className="w-16" />
        </div>
      </header>

      {/* Content */}
      <main className="p-4 pb-8 max-w-lg mx-auto space-y-6">
        {/* Header Info */}
        <div className="text-center">
          <div className="font-pixel text-gameboy-light text-[10px] mb-1">
            {formatPokemonId(pokemon.id)}
          </div>
          <h2 className="font-pixel text-white text-xl mb-1">
            {pokemon.nameFr}
          </h2>
          {pokemon.genusFr && (
            <div className="font-pixel text-gameboy-light/60 text-[8px]">
              {pokemon.genusFr}
            </div>
          )}
        </div>

        {/* Sprite with Shiny Toggle */}
        <ShinyToggle
          sprite={pokemon.sprite}
          spriteShiny={pokemon.spriteShiny}
          name={pokemon.nameFr}
        />

        {/* Form Selector */}
        {varieties.length > 1 && (
          <MobileFormSelector
            varieties={varieties}
            currentPokemonName={name}
          />
        )}

        {/* Types */}
        <div className="flex justify-center gap-2">
          {pokemon.types.map((type) => (
            <TypeBadge key={type} type={type} size="lg" />
          ))}
        </div>

        {/* Tabs for additional content */}
        <MobileTabs pokemonName={name} />

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gameboy-dark/50 border-2 border-gameboy-light/30 rounded-lg p-4 text-center">
            <div className="font-pixel text-[8px] text-gameboy-light mb-1">
              Taille
            </div>
            <div className="font-pixel text-white text-sm">
              {formatHeight(pokemon.height)}
            </div>
          </div>
          <div className="bg-gameboy-dark/50 border-2 border-gameboy-light/30 rounded-lg p-4 text-center">
            <div className="font-pixel text-[8px] text-gameboy-light mb-1">
              Poids
            </div>
            <div className="font-pixel text-white text-sm">
              {formatWeight(pokemon.weight)}
            </div>
          </div>
        </div>

        {/* Description */}
        {pokemon.descriptionFr && (
          <div className="bg-gameboy-dark/50 border-2 border-gameboy-light/30 rounded-lg p-4">
            <p className="font-pixel text-[8px] text-gameboy-lightest leading-relaxed">
              {pokemon.descriptionFr}
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="bg-gameboy-dark/50 border-2 border-gameboy-light/30 rounded-lg p-4">
          <h3 className="font-pixel text-gameboy-light text-[10px] mb-4">
            Statistiques
          </h3>
          <div className="space-y-3">
            {pokemon.stats.map((stat) => (
              <StatBar key={stat.name} name={stat.nameFr} value={stat.value} />
            ))}
          </div>
        </div>

        {/* Evolution Chain */}
        <div className="bg-gameboy-dark/50 border-2 border-gameboy-light/30 rounded-lg p-4">
          <h3 className="font-pixel text-gameboy-light text-[10px] mb-4">
            Évolutions
          </h3>
          <EvolutionChain stages={evolution} />
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          {pokemon.id > 1 && (
            <Link
              href={`/pokemon/${pokemon.id - 1}`}
              className="font-pixel text-[8px] text-gameboy-light hover:text-gameboy-lightest transition-colors"
            >
              ← Précédent
            </Link>
          )}
          <div className="flex-1" />
          <Link
            href={`/pokemon/${pokemon.id + 1}`}
            className="font-pixel text-[8px] text-gameboy-light hover:text-gameboy-lightest transition-colors"
          >
            Suivant →
          </Link>
        </div>
      </main>
    </div>
  )
}
