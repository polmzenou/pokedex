import { NextRequest, NextResponse } from 'next/server'
import { getPokemonVarieties } from '@/lib/api'

interface RouteParams {
  params: Promise<{ name: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { name } = await params

  try {
    const varieties = await getPokemonVarieties(name)
    return NextResponse.json(varieties)
  } catch (error) {
    console.error('Error fetching varieties:', error)
    return NextResponse.json([], { status: 200 })
  }
}
