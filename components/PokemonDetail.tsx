'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ProcessedPokemon, EvolutionStage } from '@/types/pokemon'
import { VarietyInfo } from '@/types/form'
import { formatPokemonId, formatHeight, formatWeight, STAT_NAMES_FR } from '@/lib/utils'
import TypeBadge from './TypeBadge'
import StatBar from './StatBar'
import EvolutionChain from './EvolutionChain'
import PixelButton from './PixelButton'
import PokemonDetailSkeleton from './PokemonDetailSkeleton'
import FormSelector from './FormSelector'
import TypeEffectivenessChart from './TypeEffectivenessChart'
import AbilityList from './AbilityList'
import MoveList from './MoveList'

interface PokemonDetailProps {
  pokemonName: string | null
  onEvolutionSelect?: (name: string) => void
}

export default function PokemonDetail({
  pokemonName,
  onEvolutionSelect,
}: PokemonDetailProps) {
  const [pokemon, setPokemon] = useState<ProcessedPokemon | null>(null)
  const [evolution, setEvolution] = useState<EvolutionStage[]>([])
  const [varieties, setVarieties] = useState<VarietyInfo[]>([])
  const [selectedForm, setSelectedForm] = useState<string | null>(null)
  const [formData, setFormData] = useState<{
    sprite: string
    types: string[]
    stats: { name: string; nameFr: string; value: number }[]
  } | null>(null)
  const [isShiny, setIsShiny] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [animationKey, setAnimationKey] = useState(0)
  const [activeTab, setActiveTab] = useState<'info' | 'moves' | 'more'>('info')

  useEffect(() => {
    if (!pokemonName) {
      setPokemon(null)
      setVarieties([])
      setSelectedForm(null)
      setFormData(null)
      return
    }

    const fetchPokemon = async () => {
      setLoading(true)
      setError(null)
      setActiveTab('info')

      try {
        const [pokemonRes, evolutionRes, varietiesRes] = await Promise.all([
          fetch(`/api/pokemon/${pokemonName}`),
          fetch(`/api/pokemon/${pokemonName}/evolution`),
          fetch(`/api/pokemon/${pokemonName}/varieties`),
        ])

        if (!pokemonRes.ok) throw new Error('Pokémon non trouvé')

        const pokemonData = await pokemonRes.json()
        const evolutionData = evolutionRes.ok ? await evolutionRes.json() : []
        const varietiesData = varietiesRes.ok ? await varietiesRes.json() : []

        setPokemon(pokemonData)
        setEvolution(evolutionData)
        setVarieties(varietiesData)
        setSelectedForm(pokemonName)
        setFormData(null)
        setAnimationKey((prev) => prev + 1)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue')
      } finally {
        setLoading(false)
      }
    }

    fetchPokemon()
  }, [pokemonName])

  const handleFormSelect = async (formName: string) => {
    setSelectedForm(formName)

    if (!pokemon || formName === pokemon.name) {
      setFormData(null)
      return
    }

    const variety = varieties.find((v) => v.name === formName)
    if (variety) {
      setFormData({
        sprite: variety.sprite,
        types: variety.types,
        stats: variety.stats.map((s) => ({
          name: s.name,
          nameFr: STAT_NAMES_FR[s.name] || s.name,
          value: s.value,
        })),
      })
      setAnimationKey((prev) => prev + 1)
    }
  }

  if (!pokemonName) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="font-pixel text-gameboy-lightest text-sm mb-4">
            ◄ Sélectionnez un Pokémon
          </div>
          <div className="font-pixel text-gameboy-light/50 text-[8px]">
            Utilisez ←→↑↓ ou cliquez
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return <PokemonDetailSkeleton />
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="font-pixel text-red-400 text-sm mb-2">Erreur</div>
          <div className="font-pixel text-gameboy-lightest text-[8px]">
            {error}
          </div>
        </div>
      </div>
    )
  }

  if (!pokemon) {
    return null
  }

  const currentSprite = formData?.sprite || (isShiny ? pokemon.spriteShiny : pokemon.sprite)
  const currentTypes = formData?.types || pokemon.types
  const currentStats = formData?.stats || pokemon.stats

  return (
    <div className="h-full overflow-y-auto custom-scrollbar p-4 lg:p-6">
      <div
        key={animationKey}
        className="animate-pixel-fade max-w-lg mx-auto space-y-6"
      >
        {/* Header */}
        <div className="text-center">
          <div className="font-pixel text-gameboy-light text-[10px] mb-1">
            {formatPokemonId(pokemon.id)}
          </div>
          <h2 className="font-pixel text-white text-lg mb-1">
            {pokemon.nameFr}
          </h2>
          {pokemon.genusFr && (
            <div className="font-pixel text-gameboy-light/60 text-[8px]">
              {pokemon.genusFr}
            </div>
          )}
        </div>

        {/* Sprite */}
        <div className="flex flex-col items-center">
          <div
            key={`sprite-${animationKey}-${isShiny}-${selectedForm}`}
            className="relative w-48 h-48 animate-sprite-bounce"
          >
            {currentSprite ? (
              <Image
                src={currentSprite}
                alt={pokemon.nameFr}
                fill
                className="object-contain drop-shadow-[0_0_12px_rgba(59,130,246,0.5)]"
                priority
                unoptimized
              />
            ) : (
              <div className="w-full h-full bg-gameboy-dark rounded-lg flex items-center justify-center">
                <span className="font-pixel text-gameboy-lightest">?</span>
              </div>
            )}
          </div>

          {/* Shiny Toggle */}
          <div className="mt-4 flex gap-2">
            <PixelButton
              onClick={() => setIsShiny(!isShiny)}
              active={isShiny}
              size="sm"
            >
              ★ Shiny {isShiny ? 'ON' : 'OFF'}
            </PixelButton>
          </div>
        </div>

        {/* Form Selector */}
        {varieties.length > 1 && (
          <FormSelector
            varieties={varieties}
            selectedForm={selectedForm || pokemon.name}
            onSelect={handleFormSelect}
          />
        )}

        {/* Types */}
        <div className="flex justify-center gap-2">
          {currentTypes.map((type) => (
            <TypeBadge key={type} type={type} size="lg" />
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 border-b-2 border-gameboy-dark">
          {(['info', 'moves', 'more'] as const).map((tab) => (
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
              {tab === 'info' && 'Infos'}
              {tab === 'moves' && 'Attaques'}
              {tab === 'more' && 'Plus'}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'info' && (
          <div className="space-y-6">
            {/* Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gameboy-dark/50 border-2 border-gameboy-light/30 rounded-lg p-3 text-center">
                <div className="font-pixel text-[8px] text-gameboy-light mb-1">
                  Taille
                </div>
                <div className="font-pixel text-white text-sm">
                  {formatHeight(pokemon.height)}
                </div>
              </div>
              <div className="bg-gameboy-dark/50 border-2 border-gameboy-light/30 rounded-lg p-3 text-center">
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
            <div className="space-y-2">
              <h3 className="font-pixel text-gameboy-light text-[10px] mb-3">
                Statistiques
              </h3>
              {currentStats.map((stat) => (
                <StatBar
                  key={stat.name}
                  name={stat.nameFr}
                  value={stat.value}
                />
              ))}
            </div>

            {/* Type Effectiveness */}
            <TypeEffectivenessChart types={currentTypes} />

            {/* Evolution Chain */}
            <div>
              <h3 className="font-pixel text-gameboy-light text-[10px] mb-3">
                Évolutions
              </h3>
              <EvolutionChain stages={evolution} onSelect={onEvolutionSelect} />
            </div>
          </div>
        )}

        {activeTab === 'moves' && (
          <MoveList pokemonName={selectedForm || pokemon.name} />
        )}

        {activeTab === 'more' && (
          <div className="space-y-6">
            {/* Abilities */}
            <AbilityList pokemonName={selectedForm || pokemon.name} />
          </div>
        )}
      </div>
    </div>
  )
}
