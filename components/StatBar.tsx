import { getStatPercentage } from '@/lib/utils'

interface StatBarProps {
  name: string
  value: number
  maxValue?: number
}

export default function StatBar({ name, value, maxValue = 255 }: StatBarProps) {
  const percentage = getStatPercentage(value, maxValue)

  const getBarColor = (pct: number): string => {
    if (pct >= 75) return 'bg-green-500'
    if (pct >= 50) return 'bg-gameboy-light'
    if (pct >= 25) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="flex items-center gap-2">
      <span className="font-pixel text-[8px] text-gameboy-lightest w-20 truncate">
        {name}
      </span>
      <span className="font-pixel text-[8px] text-gameboy-light w-8 text-right">
        {value}
      </span>
      <div className="flex-1 h-3 bg-gameboy-darkest border-2 border-gameboy-dark rounded relative overflow-hidden">
        <div
          className={`h-full ${getBarColor(percentage)} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        >
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `repeating-linear-gradient(
                90deg,
                transparent,
                transparent 2px,
                rgba(0,0,0,0.3) 2px,
                rgba(0,0,0,0.3) 4px
              )`,
            }}
          />
        </div>
      </div>
    </div>
  )
}
