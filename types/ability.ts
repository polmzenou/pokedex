import { LocalizedName } from './pokemon'

export interface AbilityResponse {
  id: number
  name: string
  names: LocalizedName[]
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
  is_main_series: boolean
}

export interface Ability {
  id: number
  name: string
  nameFr: string
  descriptionFr: string
  isHidden: boolean
}

export interface PokemonAbilityEntry {
  ability: {
    name: string
    url: string
  }
  is_hidden: boolean
  slot: number
}
