'use client'

interface FilterTabsProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const PROBABILITY_FILTERS = [
  { id: 'prob-90-99.9', label: '90-99.9%', description: 'Extreme Confidence' },
  { id: 'prob-80-90', label: '80-90%', description: 'Very High' },
  { id: 'prob-70-80', label: '70-80%', description: 'High' },
]

const OTHER_FILTERS = [
  { id: 'volume', label: '📊 Volume Leaders', description: 'Highest 24h volume' },
  { id: 'trending', label: '🔥 Trending', description: 'Most active now' },
  { id: 'new', label: '✨ New', description: 'Recently listed' },
]

export default function FilterTabs({ activeTab, setActiveTab }: FilterTabsProps) {
  const isProbabilityTab = activeTab.startsWith('prob-')

  return (
    <div className="mb-12">
      {/* Probability Range Tabs */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
          By Probability
        </h3>
        <div className="flex gap-3 flex-wrap">
          {PROBABILITY_FILTERS.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveTab(filter.id)}
              className={`group relative px-5 py-3 rounded-xl transition-all duration-300 ${
                activeTab === filter.id
                  ? 'card-neumorphic shadow-neumorphic-dark'
                  : 'card-neumorphic hover:shadow-neumorphic-dark'
              }`}
            >
              <div className="flex flex-col">
                <span
                  className={`text-sm font-semibold transition-colors ${
                    activeTab === filter.id
                      ? 'text-primary-cyan'
                      : 'text-gray-600 group-hover:text-primary-cyan'
                  }`}
                >
                  {filter.label}
                </span>
                <span
                  className={`text-xs transition-colors ${
                    activeTab === filter.id ? 'text-primary-cyan/60' : 'text-gray-400'
                  }`}
                >
                  {filter.description}
                </span>
              </div>

              {activeTab === filter.id && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-gradient-to-r from-primary-cyan to-primary-orange" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Other Filters */}
      <div>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Browse
        </h3>
        <div className="flex gap-3 flex-wrap">
          {OTHER_FILTERS.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveTab(filter.id)}
              className={`group relative px-5 py-3 rounded-xl transition-all duration-300 ${
                activeTab === filter.id
                  ? 'card-neumorphic shadow-neumorphic-dark'
                  : 'card-neumorphic hover:shadow-neumorphic-dark'
              }`}
            >
              <div className="flex flex-col">
                <span
                  className={`text-sm font-semibold transition-colors ${
                    activeTab === filter.id
                      ? 'text-primary-cyan'
                      : 'text-gray-600 group-hover:text-primary-cyan'
                  }`}
                >
                  {filter.label}
                </span>
                <span
                  className={`text-xs transition-colors ${
                    activeTab === filter.id ? 'text-primary-cyan/60' : 'text-gray-400'
                  }`}
                >
                  {filter.description}
                </span>
              </div>

              {activeTab === filter.id && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-gradient-to-r from-primary-cyan to-primary-orange" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
