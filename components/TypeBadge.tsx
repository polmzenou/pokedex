import { TYPE_COLORS, TYPE_NAMES_FR } from '@/lib/utils'
import { PokemonType } from '@/types/pokemon'

interface TypeBadgeProps {
  type: string
  size?: 'sm' | 'md' | 'lg'
}

export default function TypeBadge({ type, size = 'md' }: TypeBadgeProps) {
  const color = TYPE_COLORS[type as PokemonType] || '#A8A878'
  const nameFr = TYPE_NAMES_FR[type] || type

  const sizeClasses = {
    sm: 'px-1.5 py-0.5 text-[6px]',
    md: 'px-2 py-1 text-[8px]',
    lg: 'px-3 py-1.5 text-[10px]',
  }

  return (
    <span
      className={`
        font-pixel uppercase tracking-wide
        border-2 border-white/20 rounded
        shadow-[2px_2px_0_rgba(0,0,0,0.3)]
        ${sizeClasses[size]}
      `}
      style={{ backgroundColor: color, color: '#fff' }}
    >
      {nameFr}
    </span>
  )
}
