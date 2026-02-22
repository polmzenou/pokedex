'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PokemonList from './PokemonList'
import PokemonDetail from './PokemonDetail'
import Link from 'next/link'

interface PokemonBasic {
  id: number
  name: string
  nameFr: string
  sprite: string
  types: string[]
}

interface PokedexLayoutProps {
  initialPokemon: PokemonBasic[]
}

export default function PokedexLayout({ initialPokemon }: PokedexLayoutProps) {
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(
    initialPokemon[0]?.name || null
  )
  const router = useRouter()

  const handleSelect = (name: string) => {
    setSelectedPokemon(name)
    if (window.innerWidth < 1024) {
      router.push(`/pokemon/${name}`)
    }
  }

  const handleEvolutionSelect = (name: string) => {
    setSelectedPokemon(name)
  }

  return (
    <div className="h-screen flex flex-col bg-gameboy-darkest">
      {/* Header */}
      <header className="flex-shrink-0 bg-gradient-to-r from-gameboy-dark to-gameboy-darkest border-b-4 border-gameboy-light/30">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)] animate-pulse" />
            <h1 className="font-pixel text-gameboy-lightest text-sm lg:text-base">
              POKÉDEX
            </h1>
          </div>

          <nav className="flex gap-2">
            <Link
              href="/"
              className="font-pixel text-[8px] text-white bg-gameboy-light px-3 py-1.5 border-2 border-gameboy-lightest rounded hover:bg-gameboy-lightest transition-colors"
            >
              POKÉMON
            </Link>
            <Link
              href="/items"
              className="font-pixel text-[8px] text-gameboy-lightest hover:text-white px-3 py-1.5 transition-colors"
            >
              OBJETS
            </Link>
            <Link
              href="/berries"
              className="font-pixel text-[8px] text-gameboy-lightest hover:text-white px-3 py-1.5 transition-colors"
            >
              BAIES
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Panel - Grid List */}
        <aside className="w-full lg:w-[480px] flex-shrink-0 border-r-4 border-gameboy-dark overflow-hidden">
          <PokemonList
            initialPokemon={initialPokemon}
            selectedName={selectedPokemon}
            onSelect={handleSelect}
          />
        </aside>

        {/* Right Panel - Detail (hidden on mobile) */}
        <section className="hidden lg:flex flex-1 bg-gradient-to-br from-gameboy-darkest to-gameboy-dark overflow-hidden">
          <div className="flex-1 relative">
            {/* Scanlines overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.02] z-10"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 2px,
                  rgba(147, 197, 253, 0.1) 2px,
                  rgba(147, 197, 253, 0.1) 4px
                )`,
              }}
            />
            <PokemonDetail
              pokemonName={selectedPokemon}
              onEvolutionSelect={handleEvolutionSelect}
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex-shrink-0 bg-gameboy-dark border-t-4 border-gameboy-light/30 px-4 py-2">
        <div className="flex items-center justify-between">
          <span className="font-pixel text-[6px] text-gameboy-lightest">
            ←→↑↓ Navigation • ENTRÉE Sélectionner
          </span>
          <span className="font-pixel text-[6px] text-gameboy-light/50">
            Données: PokéAPI
          </span>
        </div>
      </footer>
    </div>
  )
}
