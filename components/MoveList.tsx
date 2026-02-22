'use client'

import { useState, useEffect } from 'react'
import { Move } from '@/types/move'
import MoveCard from './MoveCard'
import PixelButton from './PixelButton'

interface MoveListProps {
  pokemonName: string
}

export default function MoveList({ pokemonName }: MoveListProps) {
  const [moves, setMoves] = useState<Move[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [expandedMove, setExpandedMove] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    const fetchMoves = async () => {
      setLoading(true)
      setError(null)
      setExpandedMove(null)

      try {
        const res = await fetch(`/api/pokemon/${pokemonName}/moves`)
        if (!res.ok) throw new Error('Erreur chargement')
        const data = await res.json()
        setMoves(data)
      } catch {
        setError('Impossible de charger les attaques')
      } finally {
        setLoading(false)
      }
    }

    if (pokemonName) {
      fetchMoves()
    }
  }, [pokemonName])

  if (loading) {
    return (
      <div className="space-y-2">
        <h3 className="font-pixel text-gameboy-light text-[10px]">Attaques</h3>
        <div className="space-y-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-8 bg-gameboy-dark rounded animate-pulse"
            />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-2">
        <h3 className="font-pixel text-gameboy-light text-[10px]">Attaques</h3>
        <p className="font-pixel text-[8px] text-red-400">{error}</p>
      </div>
    )
  }

  if (moves.length === 0) {
    return null
  }

  const displayedMoves = showAll ? moves : moves.slice(0, 8)

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="font-pixel text-gameboy-light text-[10px]">
          Attaques ({moves.length})
        </h3>
      </div>

      <div className="space-y-1">
        {displayedMoves.map((move) => (
          <MoveCard
            key={move.id}
            move={move}
            expanded={expandedMove === move.name}
            onToggle={() =>
              setExpandedMove(expandedMove === move.name ? null : move.name)
            }
          />
        ))}
      </div>

      {moves.length > 8 && (
        <div className="text-center pt-2">
          <PixelButton size="sm" onClick={() => setShowAll(!showAll)}>
            {showAll ? 'Moins' : `+${moves.length - 8} attaques`}
          </PixelButton>
        </div>
      )}
    </div>
  )
}
