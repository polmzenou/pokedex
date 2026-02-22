import { LocalizedName, PokemonSprites, PokemonTypeSlot } from './pokemon'

export interface PokemonFormResponse {
  id: number
  name: string
  form_name: string
  form_names: LocalizedName[]
  is_battle_only: boolean
  is_default: boolean
  is_mega: boolean
  sprites: PokemonSprites
  types: PokemonTypeSlot[]
  pokemon: {
    name: string
    url: string
  }
}

export interface PokemonForm {
  id: number
  name: string
  formName: string
  formNameFr: string
  isMega: boolean
  isDefault: boolean
  sprite: string
  types: string[]
}

export interface VarietyInfo {
  name: string
  isDefault: boolean
  formType: 'mega' | 'alola' | 'galar' | 'hisui' | 'gmax' | 'other'
  formLabel: string
  sprite: string
  types: string[]
  stats: { name: string; nameFr: string; value: number }[]
}

export const FORM_TYPE_LABELS: Record<string, string> = {
  mega: 'Méga',
  alola: 'Alola',
  galar: 'Galar',
  hisui: 'Hisui',
  gmax: 'Gigamax',
  other: 'Forme',
}
