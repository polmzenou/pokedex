import { LocalizedName } from './pokemon'

export interface GenerationResponse {
  id: number
  name: string
  names: LocalizedName[]
  main_region: {
    name: string
    url: string
  }
  pokemon_species: {
    name: string
    url: string
  }[]
}

export interface Generation {
  id: number
  name: string
  nameFr: string
  region: string
  pokemonCount: number
}

export const GENERATION_RANGES: Record<number, { start: number; end: number; name: string }> = {
  1: { start: 1, end: 151, name: 'Kanto' },
  2: { start: 152, end: 251, name: 'Johto' },
  3: { start: 252, end: 386, name: 'Hoenn' },
  4: { start: 387, end: 493, name: 'Sinnoh' },
  5: { start: 494, end: 649, name: 'Unova' },
  6: { start: 650, end: 721, name: 'Kalos' },
  7: { start: 722, end: 809, name: 'Alola' },
  8: { start: 810, end: 905, name: 'Galar' },
  9: { start: 906, end: 1025, name: 'Paldea' },
}
