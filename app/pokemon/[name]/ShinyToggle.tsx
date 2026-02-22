'use client'

import { useState } from 'react'
import Image from 'next/image'
import PixelButton from '@/components/PixelButton'

interface ShinyToggleProps {
  sprite: string
  spriteShiny: string
  name: string
}

export default function ShinyToggle({
  sprite,
  spriteShiny,
  name,
}: ShinyToggleProps) {
  const [isShiny, setIsShiny] = useState(false)
  const currentSprite = isShiny ? spriteShiny : sprite

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-56 h-56 animate-sprite-bounce">
        {currentSprite ? (
          <Image
            src={currentSprite}
            alt={name}
            fill
            className="object-contain drop-shadow-[0_0_12px_rgba(139,172,15,0.6)]"
            priority
            unoptimized
          />
        ) : (
          <div className="w-full h-full bg-gameboy-dark flex items-center justify-center">
            <span className="font-pixel text-gameboy-light text-2xl">?</span>
          </div>
        )}
      </div>

      <div className="mt-4">
        <PixelButton
          onClick={() => setIsShiny(!isShiny)}
          active={isShiny}
          size="md"
        >
          ★ Shiny {isShiny ? 'ON' : 'OFF'}
        </PixelButton>
      </div>
    </div>
  )
}
