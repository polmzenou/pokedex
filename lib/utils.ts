import { PokemonType } from '@/types/pokemon'

export const TYPE_COLORS: Record<PokemonType, string> = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
}

export const TYPE_NAMES_FR: Record<string, string> = {
  normal: 'Normal',
  fire: 'Feu',
  water: 'Eau',
  electric: 'Électrik',
  grass: 'Plante',
  ice: 'Glace',
  fighting: 'Combat',
  poison: 'Poison',
  ground: 'Sol',
  flying: 'Vol',
  psychic: 'Psy',
  bug: 'Insecte',
  rock: 'Roche',
  ghost: 'Spectre',
  dragon: 'Dragon',
  dark: 'Ténèbres',
  steel: 'Acier',
  fairy: 'Fée',
}

export const STAT_NAMES_FR: Record<string, string> = {
  hp: 'PV',
  attack: 'Attaque',
  defense: 'Défense',
  'special-attack': 'Atq. Spé.',
  'special-defense': 'Déf. Spé.',
  speed: 'Vitesse',
}

export function formatPokemonId(id: number): string {
  return `#${id.toString().padStart(3, '0')}`
}

export function formatHeight(height: number): string {
  const meters = height / 10
  return `${meters.toFixed(1)} m`
}

export function formatWeight(weight: number): string {
  const kg = weight / 10
  return `${kg.toFixed(1)} kg`
}

export function extractIdFromUrl(url: string): number {
  const matches = url.match(/\/(\d+)\/?$/)
  return matches ? parseInt(matches[1], 10) : 0
}

export function getStatPercentage(value: number, maxValue: number = 255): number {
  return Math.min((value / maxValue) * 100, 100)
}

export function cleanFlavorText(text: string): string {
  return text
    .replace(/\f/g, ' ')
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
