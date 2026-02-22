import { NextRequest, NextResponse } from 'next/server'
import { getPokemonByGeneration } from '@/lib/api'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params
  const generationId = parseInt(id, 10)

  if (isNaN(generationId) || generationId < 1 || generationId > 9) {
    return NextResponse.json(
      { error: 'Invalid generation ID' },
      { status: 400 }
    )
  }

  try {
    const pokemon = await getPokemonByGeneration(generationId)
    return NextResponse.json(pokemon)
  } catch (error) {
    console.error('Error fetching generation:', error)
    return NextResponse.json([], { status: 200 })
  }
}
