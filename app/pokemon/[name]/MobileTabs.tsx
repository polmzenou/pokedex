'use client'

import { useState, useEffect } from 'react'
import MoveList from '@/components/MoveList'
import AbilityList from '@/components/AbilityList'
import TypeEffectivenessChart from '@/components/TypeEffectivenessChart'

interface MobileTabsProps {
  pokemonName: string
}

export default function MobileTabs({ pokemonName }: MobileTabsProps) {
  const [activeTab, setActiveTab] = useState<'types' | 'moves' | 'abilities'>('types')
  const [types, setTypes] = useState<string[]>([])

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await fetch(`/api/pokemon/${pokemonName}`)
        if (res.ok) {
          const data = await res.json()
          setTypes(data.types || [])
        }
      } catch {
        console.error('Error fetching pokemon types')
      }
    }

    fetchTypes()
  }, [pokemonName])

  return (
    <div className="space-y-4">
      {/* Tab Buttons */}
      <div className="flex gap-1 border-b-2 border-gameboy-dark">
        {(['types', 'moves', 'abilities'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              font-pixel text-[8px] px-3 py-2
              border-2 border-b-0 rounded-t
              transition-colors duration-100
              ${
                activeTab === tab
                  ? 'bg-gameboy-dark text-white border-gameboy-dark'
                  : 'bg-gameboy-darkest text-gameboy-light border-transparent hover:text-gameboy-lightest'
              }
            `}
          >
            {tab === 'types' && 'Forces'}
            {tab === 'moves' && 'Attaques'}
            {tab === 'abilities' && 'Talents'}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-gameboy-dark/50 border-2 border-gameboy-light/30 rounded-lg p-4">
        {activeTab === 'types' && types.length > 0 && (
          <TypeEffectivenessChart types={types} />
        )}
        {activeTab === 'types' && types.length === 0 && (
          <div className="h-20 bg-gameboy-dark rounded animate-pulse" />
        )}
        {activeTab === 'moves' && (
          <MoveList pokemonName={pokemonName} />
        )}
        {activeTab === 'abilities' && (
          <AbilityList pokemonName={pokemonName} />
        )}
      </div>
    </div>
  )
}
