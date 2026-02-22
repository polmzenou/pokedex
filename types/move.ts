import { LocalizedName } from './pokemon'

export interface MoveResponse {
  id: number
  name: string
  names: LocalizedName[]
  accuracy: number | null
  power: number | null
  pp: number
  priority: number
  damage_class: {
    name: 'physical' | 'special' | 'status'
    url: string
  }
  type: {
    name: string
    url: string
  }
  effect_entries: {
    effect: string
    short_effect: string
    language: {
      name: string
      url: string
    }
  }[]
  flavor_text_entries: {
    flavor_text: string
    language: {
      name: string
      url: string
    }
    version_group: {
      name: string
      url: string
    }
  }[]
}

export interface Move {
  id: number
  name: string
  nameFr: string
  type: string
  damageClass: 'physical' | 'special' | 'status'
  power: number | null
  accuracy: number | null
  pp: number
  effectFr: string
}

export interface PokemonMoveEntry {
  move: {
    name: string
    url: string
  }
  version_group_details: {
    level_learned_at: number
    move_learn_method: {
      name: string
      url: string
    }
    version_group: {
      name: string
      url: string
    }
  }[]
}

export const DAMAGE_CLASS_FR: Record<string, string> = {
  physical: 'Physique',
  special: 'Spécial',
  status: 'Statut',
}

export const DAMAGE_CLASS_ICONS: Record<string, string> = {
  physical: '💥',
  special: '✨',
  status: '◈',
}
