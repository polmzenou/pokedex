import { NextRequest, NextResponse } from 'next/server'
import { getEvolutionStages } from '@/lib/api'

interface RouteParams {
  params: Promise<{ name: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { name } = await params

  try {
    const evolution = await getEvolutionStages(name)
    return NextResponse.json(evolution)
  } catch (error) {
    console.error('Error fetching evolution:', error)
    return NextResponse.json([], { status: 200 })
  }
}
