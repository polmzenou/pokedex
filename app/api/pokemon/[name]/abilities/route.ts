import { NextRequest, NextResponse } from 'next/server'
import { getPokemonAbilities } from '@/lib/api'

interface RouteParams {
  params: Promise<{ name: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { name } = await params

  try {
    const abilities = await getPokemonAbilities(name)
    return NextResponse.json(abilities)
  } catch (error) {
    console.error('Error fetching abilities:', error)
    return NextResponse.json([], { status: 200 })
  }
}
