'use client'

import Image from 'next/image'
import { EvolutionStage } from '@/types/pokemon'

interface EvolutionChainProps {
  stages: EvolutionStage[]
  onSelect?: (name: string) => void
}

export default function EvolutionChain({
  stages,
  onSelect,
}: EvolutionChainProps) {
  if (stages.length <= 1) {
    return (
      <div className="text-center font-pixel text-[8px] text-gameboy-light/60">
        Pas d&apos;évolution
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      {stages.map((stage, index) => (
        <div key={stage.id} className="flex items-center gap-2">
          <button
            onClick={() => onSelect?.(stage.name)}
            className="
              flex flex-col items-center gap-1 p-2
              border-2 border-gameboy-dark rounded-lg
              bg-gameboy-darkest
              hover:border-gameboy-light hover:bg-gameboy-dark
              transition-colors duration-100
              cursor-pointer
            "
          >
            {stage.sprite ? (
              <div className="relative w-12 h-12">
                <Image
                  src={stage.sprite}
                  alt={stage.nameFr}
                  fill
                  className="object-contain pixelated"
                  unoptimized
                />
              </div>
            ) : (
              <div className="w-12 h-12 bg-gameboy-dark rounded flex items-center justify-center">
                <span className="font-pixel text-[6px] text-gameboy-light">
                  ?
                </span>
              </div>
            )}
            <span className="font-pixel text-[6px] text-gameboy-lightest text-center">
              {stage.nameFr}
            </span>
          </button>

          {index < stages.length - 1 && (
            <div className="flex flex-col items-center">
              <span className="font-pixel text-gameboy-light text-lg">→</span>
              {stages[index + 1].minLevel && (
                <span className="font-pixel text-[6px] text-gameboy-light/60">
                  Nv.{stages[index + 1].minLevel}
                </span>
              )}
              {stages[index + 1].item && (
                <span className="font-pixel text-[6px] text-gameboy-light/60">
                  {stages[index + 1].item}
                </span>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
