import { Ability } from '@/types/ability'

interface AbilityCardProps {
  ability: Ability
}

export default function AbilityCard({ ability }: AbilityCardProps) {
  return (
    <div
      className={`
        bg-gameboy-darkest border-2 rounded p-2
        ${ability.isHidden ? 'border-purple-500/50' : 'border-gameboy-dark'}
      `}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="font-pixel text-[8px] text-gameboy-lightest">
          {ability.nameFr}
        </span>
        {ability.isHidden && (
          <span className="font-pixel text-[5px] px-1 py-0.5 bg-purple-500/30 text-purple-300 rounded border border-purple-500/50">
            CACHÉ
          </span>
        )}
      </div>
      {ability.descriptionFr && (
        <p className="font-pixel text-[6px] text-gameboy-light leading-relaxed">
          {ability.descriptionFr}
        </p>
      )}
    </div>
  )
}
