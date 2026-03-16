import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch('https://gamma-api.polymarket.com/markets', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      // Cache the response for 3 minutes
      next: { revalidate: 180 },
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching markets from Polymarket API:', error)
    return NextResponse.json(
      { error: 'Failed to fetch markets' },
      { status: 500 }
    )
  }
}
