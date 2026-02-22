import { getPokemonListWithDetails } from '@/lib/api'
import PokedexLayout from '@/components/PokedexLayout'

export const revalidate = 86400

export default async function Home() {
  const pokemon = await getPokemonListWithDetails(0, 151)

  return <PokedexLayout initialPokemon={pokemon} />
}
