import { NextRequest, NextResponse } from 'next/server'
import { getPokemonMoves } from '@/lib/api'

interface RouteParams {
  params: Promise<{ name: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { name } = await params
  const searchParams = request.nextUrl.searchParams
  const method = searchParams.get('method') || 'level-up'
  const limit = parseInt(searchParams.get('limit') || '20', 10)

  try {
    const moves = await getPokemonMoves(name, method, limit)
    return NextResponse.json(moves)
  } catch (error) {
    console.error('Error fetching moves:', error)
    return NextResponse.json([], { status: 200 })
  }
}
