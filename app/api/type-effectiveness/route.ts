import { NextRequest, NextResponse } from 'next/server'
import { calculateTypeEffectiveness } from '@/lib/api'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const types = searchParams.getAll('types')

  if (types.length === 0) {
    return NextResponse.json(
      { error: 'No types provided' },
      { status: 400 }
    )
  }

  try {
    const effectiveness = await calculateTypeEffectiveness(types)
    return NextResponse.json(effectiveness)
  } catch (error) {
    console.error('Error calculating type effectiveness:', error)
    return NextResponse.json(
      { weaknesses: [], resistances: [], immunities: [] },
      { status: 200 }
    )
  }
}
