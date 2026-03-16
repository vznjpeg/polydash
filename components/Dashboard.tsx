'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { Loader2, TrendingUp } from 'lucide-react'
import MarketCard from './MarketCard'
import FilterTabs from './FilterTabs'

interface Market {
  id: string
  slug?: string
  question: string
  lastPriceYes?: number
  lastPriceNo?: number
  volume24h?: number
  outcomes: string[]
  probability?: number
}

type FilterType = '90-99.9' | '80-90' | '70-80'

export default function Dashboard() {
  const [markets, setMarkets] = useState<Market[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeFilter, setActiveFilter] = useState<FilterType>('90-99.9')

  useEffect(() => {
    fetchMarkets()
  }, [])

  const fetchMarkets = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch from local API route (which proxies to Gamma API)
      const response = await axios.get('/api/markets')

      // Parse and filter markets by probability ranges
      const filteredMarkets = response.data
        .filter((market: any) => {
          // Skip closed markets and markets without questions
          if (!market.question || market.closed) return false

          try {
            // Parse outcomePrices - it's a JSON string like "[0.75, 0.25]"
            const prices = JSON.parse(market.outcomePrices || '[]')
            const yesPrice = parseFloat(prices[0]) || 0

            // Only include markets with:
            // 1. Valid prices (between 0 and 1)
            // 2. Probability in 70-100% range
            // 3. Some volume or activity (to avoid stale markets)
            if (yesPrice > 0 && yesPrice < 1) {
              const probability = yesPrice * 100
              const hasActivity = market.volume24hr > 0 || market.bestBid > 0 || market.bestAsk > 0

              return probability >= 70 && probability <= 100 && hasActivity
            }
            return false
          } catch (e) {
            return false
          }
        })
        .map((market: any) => {
          const prices = JSON.parse(market.outcomePrices || '[]')
          const yesPrice = parseFloat(prices[0]) || 0
          const outcomes = market.outcomes ? JSON.parse(market.outcomes) : ['Yes', 'No']

          return {
            id: market.id,
            slug: market.slug,
            question: market.question,
            lastPriceYes: yesPrice,
            lastPriceNo: parseFloat(prices[1]) || 0,
            volume24h: market.volume24hr || 0,
            outcomes,
            probability: yesPrice * 100,
          }
        })
        .sort((a: Market, b: Market) => (b.probability || 0) - (a.probability || 0))

      if (filteredMarkets.length === 0) {
        console.warn('No valid markets found, using mock data')
        setMarkets(generateMockMarkets())
        setError('Using demo data - live data unavailable')
      } else {
        setMarkets(filteredMarkets)
      }
    } catch (err) {
      console.error('Error fetching markets:', err)
      console.log('Using mock data due to API error')
      setMarkets(generateMockMarkets())
      setError('Using demo data - unable to fetch live markets')
    } finally {
      setLoading(false)
    }
  }

  const getFilteredMarkets = () => {
    return markets.filter((market) => {
      const prob = market.probability || 0

      switch (activeFilter) {
        case '90-99.9':
          return prob >= 90 && prob < 100
        case '80-90':
          return prob >= 80 && prob < 90
        case '70-80':
          return prob >= 70 && prob < 80
        default:
          return true
      }
    })
  }

  const filteredMarkets = getFilteredMarkets()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <div className="border-b border-gray-100 backdrop-blur-sm bg-white/80">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-cyan to-primary-orange flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-light text-gray-900">PolyDash</h1>
              <p className="text-sm text-gray-500">High Probability Markets</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Filter Tabs */}
        <FilterTabs activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

        {/* Status Bar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-light text-gray-900 mb-2">
              {activeFilter} Probability Markets
            </h2>
            <p className="text-gray-500">
              {filteredMarkets.length} market{filteredMarkets.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={fetchMarkets}
            className="btn-neumorphic-secondary text-sm flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Refreshing...
              </>
            ) : (
              <>
                <TrendingUp className="w-4 h-4" />
                Refresh
              </>
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="card-neumorphic bg-orange-50 border border-primary-orange mb-8 p-4">
            <p className="text-primary-orange font-medium">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && filteredMarkets.length === 0 && (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary-cyan" />
              <p className="text-gray-500">Loading markets...</p>
            </div>
          </div>
        )}

        {/* Markets Grid */}
        {!loading && filteredMarkets.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMarkets.map((market) => (
              <MarketCard key={market.id} market={market} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredMarkets.length === 0 && (
          <div className="card-neumorphic h-64 flex flex-col items-center justify-center text-center">
            <TrendingUp className="w-12 h-12 text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">No markets found in this range</p>
            <p className="text-gray-400 text-sm mt-2">
              Try selecting a different probability range
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function generateMockMarkets(): Market[] {
  const mockQuestions = [
    // 90-99.9% range
    'Will Bitcoin be above $40,000 at end of 2024?',
    'Will US inflation remain below 5% in Q2 2024?',
    'Will the Federal Reserve hold rates steady in March 2024?',

    // 80-90% range
    'Will Apple stock outperform the S&P 500 in Q1 2024?',
    'Will the S&P 500 close above 5000 by June 2024?',
    'Will tech stocks outperform energy in 2024?',

    // 70-80% range
    'Will gold prices remain above $1800/oz in 2024?',
    'Will US unemployment stay below 4.5% through 2024?',
    'Will the Euro strengthen against the Dollar in H1 2024?',
    'Will renewable energy investments increase in 2024?',
    'Will there be a recession in the US in 2024?',
    'Will productivity growth exceed 1% in 2024?',
  ]

  return mockQuestions.map((question, idx) => {
    let probability: number

    if (idx < 3) {
      // 90-99.9%
      probability = 92 + Math.random() * 7.5
    } else if (idx < 6) {
      // 80-90%
      probability = 82 + Math.random() * 8
    } else {
      // 70-80%
      probability = 72 + Math.random() * 8
    }

    const yesPrice = probability / 100
    return {
      id: `mock-${idx}`,
      question,
      lastPriceYes: yesPrice,
      lastPriceNo: 1 - yesPrice,
      volume24h: Math.floor(500000 + Math.random() * 1500000),
      outcomes: ['Yes', 'No'],
      probability,
    }
  })
}
