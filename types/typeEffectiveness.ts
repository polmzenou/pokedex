import { LocalizedName } from './pokemon'

export interface TypeResponse {
  id: number
  name: string
  names: LocalizedName[]
  damage_relations: {
    double_damage_from: { name: string; url: string }[]
    double_damage_to: { name: string; url: string }[]
    half_damage_from: { name: string; url: string }[]
    half_damage_to: { name: string; url: string }[]
    no_damage_from: { name: string; url: string }[]
    no_damage_to: { name: string; url: string }[]
  }
}

export interface TypeEffectiveness {
  weaknesses: { type: string; multiplier: number }[]
  resistances: { type: string; multiplier: number }[]
  immunities: string[]
}
