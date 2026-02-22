import { Move, DAMAGE_CLASS_FR, DAMAGE_CLASS_ICONS } from '@/types/move'
import { TYPE_COLORS, TYPE_NAMES_FR } from '@/lib/utils'
import { PokemonType } from '@/types/pokemon'

interface MoveCardProps {
  move: Move
  expanded?: boolean
  onToggle?: () => void
}

export default function MoveCard({ move, expanded = false, onToggle }: MoveCardProps) {
  const typeColor = TYPE_COLORS[move.type as PokemonType] || '#A8A878'

  return (
    <div
      className={`
        bg-gameboy-darkest border-2 border-gameboy-dark rounded
        transition-all duration-100
        ${expanded ? 'border-gameboy-light' : 'hover:border-gameboy-light/50'}
      `}
    >
      <button
        onClick={onToggle}
        className="w-full p-2 flex items-center gap-2 text-left"
      >
        {/* Type Badge */}
        <span
          className="font-pixel text-[6px] px-1.5 py-0.5 rounded border border-white/20"
          style={{ backgroundColor: typeColor, color: '#fff' }}
        >
          {TYPE_NAMES_FR[move.type] || move.type}
        </span>

        {/* Move Name */}
        <span className="font-pixel text-[8px] text-gameboy-lightest flex-1 truncate">
          {move.nameFr}
        </span>

        {/* Damage Class Icon */}
        <span className="font-pixel text-[8px]" title={DAMAGE_CLASS_FR[move.damageClass]}>
          {DAMAGE_CLASS_ICONS[move.damageClass]}
        </span>

        {/* Power */}
        {move.power && (
          <span className="font-pixel text-[6px] text-gameboy-light w-8 text-right">
            {move.power}
          </span>
        )}

        {/* Expand indicator */}
        <span className="font-pixel text-[8px] text-gameboy-light">
          {expanded ? '▲' : '▼'}
        </span>
      </button>

      {expanded && (
        <div className="px-2 pb-2 space-y-2 border-t border-gameboy-dark pt-2">
          {/* Stats Row */}
          <div className="flex gap-3 text-[6px] font-pixel">
            <div className="flex items-center gap-1">
              <span className="text-gameboy-light/60">Puissance:</span>
              <span className="text-gameboy-lightest">{move.power ?? '—'}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-gameboy-light/60">Précision:</span>
              <span className="text-gameboy-lightest">
                {move.accuracy ? `${move.accuracy}%` : '—'}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-gameboy-light/60">PP:</span>
              <span className="text-gameboy-lightest">{move.pp}</span>
            </div>
          </div>

          {/* Category */}
          <div className="flex items-center gap-1 text-[6px] font-pixel">
            <span className="text-gameboy-light/60">Catégorie:</span>
            <span className="text-gameboy-lightest">
              {DAMAGE_CLASS_ICONS[move.damageClass]} {DAMAGE_CLASS_FR[move.damageClass]}
            </span>
          </div>

          {/* Effect */}
          {move.effectFr && (
            <p className="font-pixel text-[6px] text-gameboy-light leading-relaxed">
              {move.effectFr}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
