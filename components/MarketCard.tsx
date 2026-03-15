'use client'

import { ExternalLink } from 'lucide-react'

interface Market {
  id: string
  question: string
  lastPriceYes?: number
  lastPriceNo?: number
  volume24h?: number
  outcomes: string[]
  probability?: number
}

interface MarketCardProps {
  market: Market
}

export default function MarketCard({ market }: MarketCardProps) {
  const probability = (market.probability || 0).toFixed(1)
  const yesPrice = ((market.lastPriceYes || 0) * 100).toFixed(1)
  const volume = market.volume24h ? formatVolume(market.volume24h) : '$0'

  const getColorClass = (prob: number) => {
    if (prob >= 90) return 'from-primary-cyan to-blue-400'
    if (prob >= 80) return 'from-primary-orange to-orange-300'
    return 'from-purple-400 to-pink-400'
  }

  const getBackgroundClass = (prob: number) => {
    if (prob >= 90) return 'bg-cyan-50'
    if (prob >= 80) return 'bg-orange-50'
    return 'bg-purple-50'
  }

  return (
    <div
      className={`card-neumorphic group cursor-pointer overflow-hidden ${getBackgroundClass(
        market.probability || 0
      )}`}
    >
      {/* Top Section - Probability Badge */}
      <div className="mb-4 flex items-start justify-between">
        <div>
          <div
            className={`inline-block bg-gradient-to-r ${getColorClass(
              market.probability || 0
            )} rounded-full px-4 py-2 text-white font-semibold text-lg`}
          >
            {probability}%
          </div>
        </div>
        <ExternalLink className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Question */}
      <h3 className="text-lg font-medium text-gray-900 mb-4 line-clamp-3 group-hover:text-primary-cyan transition-colors">
        {market.question}
      </h3>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-xl p-3 shadow-neumorphic-inset">
          <p className="text-xs text-gray-500 mb-1">Yes Price</p>
          <p className="text-lg font-semibold text-primary-cyan">{yesPrice}¢</p>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-neumorphic-inset">
          <p className="text-xs text-gray-500 mb-1">Volume 24h</p>
          <p className="text-lg font-semibold text-primary-orange">{volume}</p>
        </div>
      </div>

      {/* Outcomes */}
      <div className="mb-6">
        <p className="text-xs text-gray-500 mb-2">Outcomes</p>
        <div className="flex gap-2">
          {market.outcomes.map((outcome) => (
            <span
              key={outcome}
              className="px-3 py-1 rounded-full text-xs font-medium bg-white text-gray-700 shadow-neumorphic-inset"
            >
              {outcome}
            </span>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={() =>
          window.open(`https://polymarket.com/market/${market.id}`, '_blank')
        }
        className="btn-neumorphic-primary w-full text-sm"
      >
        View on Polymarket
      </button>
    </div>
  )
}

function formatVolume(volume: number): string {
  if (volume >= 1000000) {
    return `$${(volume / 1000000).toFixed(1)}M`
  }
  if (volume >= 1000) {
    return `$${(volume / 1000).toFixed(1)}K`
  }
  return `$${volume}`
}
