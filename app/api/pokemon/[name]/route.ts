import { NextRequest, NextResponse } from 'next/server'
import { getProcessedPokemon } from '@/lib/api'

interface RouteParams {
  params: Promise<{ name: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { name } = await params

  try {
    const pokemon = await getProcessedPokemon(name)
    return NextResponse.json(pokemon)
  } catch (error) {
    console.error('Error fetching pokemon:', error)
    return NextResponse.json(
      { error: 'Pokemon not found' },
      { status: 404 }
    )
  }
}
