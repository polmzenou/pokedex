'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import PokemonListItem from './PokemonListItem'
import PokemonListSkeleton from './PokemonListSkeleton'
import SearchBar from './SearchBar'
import PixelButton from './PixelButton'
import GenerationFilter from './GenerationFilter'
import { TYPE_NAMES_FR } from '@/lib/utils'

interface PokemonBasic {
  id: number
  name: string
  nameFr: string
  sprite: string
  types: string[]
}

interface PokemonListProps {
  initialPokemon: PokemonBasic[]
  selectedName: string | null
  onSelect: (name: string) => void
}

const ALL_TYPES = Object.keys(TYPE_NAMES_FR)

export default function PokemonList({
  initialPokemon,
  selectedName,
  onSelect,
}: PokemonListProps) {
  const [pokemon, setPokemon] = useState<PokemonBasic[]>(initialPokemon)
  const [filteredPokemon, setFilteredPokemon] = useState<PokemonBasic[]>(initialPokemon)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedGeneration, setSelectedGeneration] = useState<number | null>(null)
  const [offset, setOffset] = useState(151)
  const [loading, setLoading] = useState(false)
  const [generationLoading, setGenerationLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [showTypeFilter, setShowTypeFilter] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let filtered = pokemon

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.nameFr.toLowerCase().includes(query) ||
          p.name.toLowerCase().includes(query) ||
          p.id.toString().includes(query)
      )
    }

    if (selectedType) {
      filtered = filtered.filter((p) => p.types.includes(selectedType))
    }

    setFilteredPokemon(filtered)
  }, [pokemon, searchQuery, selectedType])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault()
        const currentIndex = filteredPokemon.findIndex(
          (p) => p.name === selectedName
        )
        let newIndex: number
        const cols = 6

        if (e.key === 'ArrowDown') {
          newIndex = currentIndex + cols
          if (newIndex >= filteredPokemon.length) newIndex = currentIndex % cols
        } else if (e.key === 'ArrowUp') {
          newIndex = currentIndex - cols
          if (newIndex < 0) newIndex = filteredPokemon.length - (cols - (currentIndex % cols))
        } else if (e.key === 'ArrowRight') {
          newIndex = currentIndex < filteredPokemon.length - 1 ? currentIndex + 1 : 0
        } else {
          newIndex = currentIndex > 0 ? currentIndex - 1 : filteredPokemon.length - 1
        }

        if (newIndex >= 0 && newIndex < filteredPokemon.length) {
          onSelect(filteredPokemon[newIndex].name)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [filteredPokemon, selectedName, onSelect])

  const loadMore = useCallback(async () => {
    if (loading || !hasMore || selectedGeneration) return

    setLoading(true)
    try {
      const res = await fetch(`/api/pokemon?offset=${offset}&limit=50`)
      if (res.ok) {
        const newPokemon = await res.json()
        if (newPokemon.length === 0) {
          setHasMore(false)
        } else {
          setPokemon((prev) => [...prev, ...newPokemon])
          setOffset((prev) => prev + 50)
        }
      }
    } catch (error) {
      console.error('Error loading more Pokemon:', error)
    } finally {
      setLoading(false)
    }
  }, [offset, loading, hasMore, selectedGeneration])

  const handleGenerationSelect = useCallback(async (generation: number | null) => {
    setSelectedGeneration(generation)
    setSearchQuery('')
    setSelectedType(null)

    if (generation === null) {
      setPokemon(initialPokemon)
      setOffset(151)
      setHasMore(true)
      return
    }

    setGenerationLoading(true)
    try {
      const res = await fetch(`/api/generation/${generation}`)
      if (res.ok) {
        const genPokemon = await res.json()
        setPokemon(genPokemon)
        setHasMore(false)
      }
    } catch (error) {
      console.error('Error loading generation:', error)
    } finally {
      setGenerationLoading(false)
    }
  }, [initialPokemon])

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
      if (scrollHeight - scrollTop - clientHeight < 200) {
        loadMore()
      }
    },
    [loadMore]
  )

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
  }, [])

  return (
    <div className="h-full flex flex-col">
      {/* Search & Filter Header */}
      <div className="p-3 border-b-4 border-gameboy-dark bg-gameboy-darkest space-y-2">
        <SearchBar
          onSearch={handleSearch}
          placeholder="Rechercher..."
        />

        <div className="flex gap-2 flex-wrap">
          <PixelButton
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            active={showFilters || selectedGeneration !== null || selectedType !== null}
          >
            Filtres {(selectedGeneration || selectedType) ? '●' : '▼'}
          </PixelButton>

          {(selectedGeneration || selectedType) && (
            <PixelButton
              size="sm"
              variant="secondary"
              onClick={() => {
                setSelectedGeneration(null)
                setSelectedType(null)
                setPokemon(initialPokemon)
                setOffset(151)
                setHasMore(true)
              }}
            >
              Reset ✕
            </PixelButton>
          )}
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="space-y-3 p-2 bg-gameboy-dark/50 border-2 border-gameboy-dark rounded">
            {/* Generation Filter */}
            <GenerationFilter
              selectedGeneration={selectedGeneration}
              onSelect={handleGenerationSelect}
              loading={generationLoading}
            />

            {/* Type Filter */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-pixel text-[8px] text-gameboy-lightest">
                  Type
                </span>
                {selectedType && (
                  <button
                    onClick={() => setSelectedType(null)}
                    className="font-pixel text-[6px] text-gameboy-light hover:text-gameboy-lightest transition-colors"
                  >
                    Tous ✕
                  </button>
                )}
              </div>

              <button
                onClick={() => setShowTypeFilter(!showTypeFilter)}
                className={`
                  font-pixel text-[8px] px-2 py-1
                  border-2 rounded
                  transition-colors duration-100
                  ${
                    selectedType
                      ? 'bg-gameboy-light text-white border-gameboy-lightest'
                      : 'bg-gameboy-darkest text-gameboy-lightest border-gameboy-dark hover:border-gameboy-light'
                  }
                `}
              >
                {selectedType ? TYPE_NAMES_FR[selectedType] : 'Tous les types ▼'}
              </button>

              {showTypeFilter && (
                <div className="flex flex-wrap gap-1 p-2 bg-gameboy-darkest border border-gameboy-dark rounded">
                  {ALL_TYPES.map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setSelectedType(type)
                        setShowTypeFilter(false)
                      }}
                      className={`
                        font-pixel text-[6px] px-2 py-1
                        border border-gameboy-darkest rounded
                        transition-colors duration-100
                        ${
                          selectedType === type
                            ? 'bg-gameboy-light text-white'
                            : 'bg-gameboy-dark text-gameboy-lightest hover:bg-gameboy-light/50'
                        }
                      `}
                    >
                      {TYPE_NAMES_FR[type]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Pokemon Count */}
      <div className="px-3 py-2 bg-gameboy-dark border-b-2 border-gameboy-darkest">
        <span className="font-pixel text-[8px] text-gameboy-lightest">
          {filteredPokemon.length} Pokémon
          {selectedGeneration && ` • Gen ${selectedGeneration}`}
        </span>
      </div>

      {/* Grid List */}
      <div
        ref={listRef}
        className="flex-1 overflow-y-auto custom-scrollbar p-2"
        onScroll={handleScroll}
      >
        {generationLoading ? (
          <PokemonListSkeleton />
        ) : filteredPokemon.length === 0 ? (
          <div className="p-6 text-center">
            <div className="font-pixel text-gameboy-light text-[10px]">
              Aucun Pokémon trouvé
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-6 gap-2">
              {filteredPokemon.map((p) => (
                <PokemonListItem
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  nameFr={p.nameFr}
                  sprite={p.sprite}
                  isSelected={p.name === selectedName}
                  onClick={() => onSelect(p.name)}
                />
              ))}
            </div>

            {loading && <PokemonListSkeleton />}

            {hasMore && !loading && !searchQuery && !selectedType && !selectedGeneration && (
              <div className="p-4 text-center">
                <PixelButton size="sm" onClick={loadMore}>
                  Charger plus
                </PixelButton>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
