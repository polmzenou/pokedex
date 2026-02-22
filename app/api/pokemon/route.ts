import { NextRequest, NextResponse } from 'next/server'
import { getPokemonListWithDetails } from '@/lib/api'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const offset = parseInt(searchParams.get('offset') || '0', 10)
  const limit = parseInt(searchParams.get('limit') || '50', 10)

  try {
    const pokemon = await getPokemonListWithDetails(offset, limit)
    return NextResponse.json(pokemon)
  } catch (error) {
    console.error('Error fetching pokemon list:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pokemon' },
      { status: 500 }
    )
  }
}
