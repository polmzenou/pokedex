'use client'

import { useState, useEffect } from 'react'
import { TypeEffectiveness } from '@/types/typeEffectiveness'
import { TYPE_COLORS, TYPE_NAMES_FR } from '@/lib/utils'
import { PokemonType } from '@/types/pokemon'

interface TypeEffectivenessChartProps {
  types: string[]
}

export default function TypeEffectivenessChart({ types }: TypeEffectivenessChartProps) {
  const [effectiveness, setEffectiveness] = useState<TypeEffectiveness | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchEffectiveness = async () => {
      if (types.length === 0) return

      setLoading(true)
      try {
        const params = new URLSearchParams()
        types.forEach((t) => params.append('types', t))
        const res = await fetch(`/api/type-effectiveness?${params}`)
        if (res.ok) {
          const data = await res.json()
          setEffectiveness(data)
        }
      } catch {
        console.error('Error fetching type effectiveness')
      } finally {
        setLoading(false)
      }
    }

    fetchEffectiveness()
  }, [types])

  if (loading) {
    return (
      <div className="space-y-2">
        <h3 className="font-pixel text-gameboy-light text-[10px]">
          Forces & Faiblesses
        </h3>
        <div className="h-20 bg-gameboy-dark rounded animate-pulse" />
      </div>
    )
  }

  if (!effectiveness) {
    return null
  }

  const hasData =
    effectiveness.weaknesses.length > 0 ||
    effectiveness.resistances.length > 0 ||
    effectiveness.immunities.length > 0

  if (!hasData) {
    return null
  }

  return (
    <div className="space-y-3">
      <h3 className="font-pixel text-gameboy-light text-[10px]">
        Forces & Faiblesses
      </h3>

      {/* Weaknesses */}
      {effectiveness.weaknesses.length > 0 && (
        <div className="space-y-1">
          <div className="font-pixel text-[6px] text-red-400">
            Faiblesses
          </div>
          <div className="flex flex-wrap gap-1">
            {effectiveness.weaknesses.map(({ type, multiplier }) => (
              <div
                key={type}
                className="flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-white/20"
                style={{ backgroundColor: TYPE_COLORS[type as PokemonType] || '#A8A878' }}
              >
                <span className="font-pixel text-[6px] text-white">
                  {TYPE_NAMES_FR[type] || type}
                </span>
                <span className="font-pixel text-[5px] text-white/80">
                  x{multiplier}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resistances */}
      {effectiveness.resistances.length > 0 && (
        <div className="space-y-1">
          <div className="font-pixel text-[6px] text-green-400">
            Résistances
          </div>
          <div className="flex flex-wrap gap-1">
            {effectiveness.resistances.map(({ type, multiplier }) => (
              <div
                key={type}
                className="flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-white/20"
                style={{ backgroundColor: TYPE_COLORS[type as PokemonType] || '#A8A878' }}
              >
                <span className="font-pixel text-[6px] text-white">
                  {TYPE_NAMES_FR[type] || type}
                </span>
                <span className="font-pixel text-[5px] text-white/80">
                  x{multiplier}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Immunities */}
      {effectiveness.immunities.length > 0 && (
        <div className="space-y-1">
          <div className="font-pixel text-[6px] text-gameboy-lightest">
            Immunités
          </div>
          <div className="flex flex-wrap gap-1">
            {effectiveness.immunities.map((type) => (
              <div
                key={type}
                className="flex items-center gap-0.5 px-1.5 py-0.5 rounded border-2 border-white/40"
                style={{ backgroundColor: TYPE_COLORS[type as PokemonType] || '#A8A878' }}
              >
                <span className="font-pixel text-[6px] text-white">
                  {TYPE_NAMES_FR[type] || type}
                </span>
                <span className="font-pixel text-[5px] text-white/80">x0</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
