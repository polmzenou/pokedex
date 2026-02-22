'use client'

import Image from 'next/image'
import { formatPokemonId } from '@/lib/utils'

interface PokemonListItemProps {
  id: number
  name: string
  nameFr: string
  sprite: string
  isSelected: boolean
  onClick: () => void
}

export default function PokemonListItem({
  id,
  sprite,
  isSelected,
  onClick,
}: PokemonListItemProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex flex-col items-center justify-center p-2
        border-2 rounded-lg
        transition-all duration-100
        aspect-square
        ${
          isSelected
            ? 'bg-gameboy-light border-gameboy-lightest shadow-[0_0_12px_rgba(59,130,246,0.5)]'
            : 'bg-gameboy-dark border-gameboy-dark hover:border-gameboy-light hover:bg-gameboy-dark/80'
        }
      `}
    >
      <span
        className={`font-pixel text-[8px] mb-1 ${isSelected ? 'text-white' : 'text-gameboy-lightest'}`}
      >
        {formatPokemonId(id)}
      </span>

      <div className="relative w-12 h-12 sm:w-14 sm:h-14">
        {sprite ? (
          <Image
            src={sprite}
            alt={`Pokemon ${id}`}
            fill
            className="object-contain pixelated"
            unoptimized
          />
        ) : (
          <div className="w-full h-full bg-gameboy-darkest rounded animate-pulse" />
        )}
      </div>
    </button>
  )
}
