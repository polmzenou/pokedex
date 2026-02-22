'use client'

import { useState, useEffect } from 'react'
import { Ability } from '@/types/ability'
import AbilityCard from './AbilityCard'

interface AbilityListProps {
  pokemonName: string
}

export default function AbilityList({ pokemonName }: AbilityListProps) {
  const [abilities, setAbilities] = useState<Ability[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAbilities = async () => {
      setLoading(true)
      setError(null)

      try {
        const res = await fetch(`/api/pokemon/${pokemonName}/abilities`)
        if (!res.ok) throw new Error('Erreur chargement')
        const data = await res.json()
        setAbilities(data)
      } catch {
        setError('Impossible de charger les talents')
      } finally {
        setLoading(false)
      }
    }

    if (pokemonName) {
      fetchAbilities()
    }
  }, [pokemonName])

  if (loading) {
    return (
      <div className="space-y-2">
        <h3 className="font-pixel text-gameboy-light text-[10px]">Talents</h3>
        <div className="space-y-1">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="h-12 bg-gameboy-dark rounded animate-pulse"
            />
          ))}
        </div>
      </div>
    )
  }

  if (error || abilities.length === 0) {
    return null
  }

  return (
    <div className="space-y-2">
      <h3 className="font-pixel text-gameboy-light text-[10px]">Talents</h3>
      <div className="space-y-1">
        {abilities.map((ability) => (
          <AbilityCard key={ability.id} ability={ability} />
        ))}
      </div>
    </div>
  )
}
