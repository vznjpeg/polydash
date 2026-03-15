'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { Loader2, TrendingUp } from 'lucide-react'
import MarketCard from './MarketCard'
import FilterTabs from './FilterTabs'

interface Market {
  id: string
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

      // Fetch from Gamma API
      const response = await axios.get('https://gamma-api.polymarket.com/markets', {
        params: {
          limit: 200,
        },
      })

      // Filter markets by probability ranges
      const filteredMarkets = response.data
        .filter((market: any) => {
          const yesPrice = market.lastPriceYes || 0
          const probability = yesPrice * 100

          // Calculate which filter range this market belongs to
          if (probability >= 70) {
            return true
          }
          return false
        })
        .map((market: any) => ({
          id: market.id,
          question: market.question,
          lastPriceYes: market.lastPriceYes,
          lastPriceNo: market.lastPriceNo,
          volume24h: market.volume24h,
          outcomes: market.outcomes,
          probability: (market.lastPriceYes || 0) * 100,
        }))

      setMarkets(filteredMarkets)
    } catch (err) {
      console.error('Error fetching markets:', err)
      setError('Failed to fetch markets. Please try again.')
      // Set mock data for development
      setMarkets(generateMockMarkets())
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
    'Will BTC reach $100k by end of 2024?',
    'Will Trump win the 2024 election?',
    'Will the Federal Reserve cut rates in Q2 2024?',
    'Will Ethereum 2.0 be fully completed by 2024?',
    'Will the S&P 500 hit a new all-time high in 2024?',
    'Will inflation fall below 3% by Q4 2024?',
    'Will Apple stock outperform the S&P 500 in 2024?',
    'Will AGI be achieved by 2025?',
    'Will Tesla deliver 2M vehicles in 2024?',
    'Will US GDP growth exceed 2.5% in 2024?',
  ]

  return mockQuestions.map((question, idx) => ({
    id: `mock-${idx}`,
    question,
    lastPriceYes: 0.85 + Math.random() * 0.14,
    lastPriceNo: 0.01 + Math.random() * 0.15,
    volume24h: Math.floor(Math.random() * 1000000),
    outcomes: ['Yes', 'No'],
    probability: 85 + Math.random() * 14,
  }))
}
