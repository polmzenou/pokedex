'use client'

import { GENERATION_RANGES } from '@/types/generation'

interface GenerationFilterProps {
  selectedGeneration: number | null
  onSelect: (generation: number | null) => void
  loading?: boolean
}

const GENERATION_LABELS: Record<number, string> = {
  1: 'I',
  2: 'II',
  3: 'III',
  4: 'IV',
  5: 'V',
  6: 'VI',
  7: 'VII',
  8: 'VIII',
  9: 'IX',
}

export default function GenerationFilter({
  selectedGeneration,
  onSelect,
  loading = false,
}: GenerationFilterProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="font-pixel text-[8px] text-gameboy-lightest">
          Génération
        </span>
        {selectedGeneration && (
          <button
            onClick={() => onSelect(null)}
            className="font-pixel text-[6px] text-gameboy-light hover:text-gameboy-lightest transition-colors"
          >
            Tout ✕
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-1">
        {Object.keys(GENERATION_RANGES).map((genId) => {
          const gen = parseInt(genId)
          const isSelected = selectedGeneration === gen
          const range = GENERATION_RANGES[gen]

          return (
            <button
              key={gen}
              onClick={() => onSelect(isSelected ? null : gen)}
              disabled={loading}
              title={`${range.name} (${range.start}-${range.end})`}
              className={`
                font-pixel text-[8px] px-2 py-1.5
                border-2 rounded
                transition-all duration-100
                disabled:opacity-50
                ${
                  isSelected
                    ? 'bg-gameboy-light text-white border-gameboy-lightest shadow-[2px_2px_0_#0a1628]'
                    : 'bg-gameboy-darkest text-gameboy-lightest border-gameboy-dark hover:border-gameboy-light hover:bg-gameboy-dark'
                }
              `}
            >
              {GENERATION_LABELS[gen]}
            </button>
          )
        })}
      </div>

      {selectedGeneration && (
        <div className="font-pixel text-[6px] text-gameboy-light/60">
          {GENERATION_RANGES[selectedGeneration].name} •{' '}
          {GENERATION_RANGES[selectedGeneration].start}-
          {GENERATION_RANGES[selectedGeneration].end}
        </div>
      )}
    </div>
  )
}
