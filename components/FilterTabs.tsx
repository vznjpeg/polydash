'use client'

interface FilterTabsProps {
  activeFilter: string
  setActiveFilter: (filter: any) => void
}

const FILTERS = [
  { id: '90-99.9', label: '90-99.9%', description: 'Extreme Confidence' },
  { id: '80-90', label: '80-90%', description: 'Very High' },
  { id: '70-80', label: '70-80%', description: 'High' },
]

export default function FilterTabs({ activeFilter, setActiveFilter }: FilterTabsProps) {
  return (
    <div className="mb-12">
      <div className="flex gap-4 flex-wrap">
        {FILTERS.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`group relative px-6 py-4 rounded-2xl transition-all duration-300 ${
              activeFilter === filter.id
                ? 'card-neumorphic shadow-neumorphic-dark'
                : 'card-neumorphic hover:shadow-neumorphic-dark'
            }`}
          >
            <div className={`flex flex-col ${activeFilter === filter.id ? 'items-start' : ''}`}>
              <span
                className={`text-lg font-semibold transition-colors ${
                  activeFilter === filter.id
                    ? 'text-primary-cyan'
                    : 'text-gray-600 group-hover:text-primary-cyan'
                }`}
              >
                {filter.label}
              </span>
              <span
                className={`text-xs transition-colors ${
                  activeFilter === filter.id ? 'text-primary-cyan/60' : 'text-gray-400'
                }`}
              >
                {filter.description}
              </span>
            </div>

            {/* Active indicator */}
            {activeFilter === filter.id && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-gradient-to-r from-primary-cyan to-primary-orange" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
