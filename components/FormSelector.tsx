'use client'

import Image from 'next/image'
import { VarietyInfo, FORM_TYPE_LABELS } from '@/types/form'

interface FormSelectorProps {
  varieties: VarietyInfo[]
  selectedForm: string
  onSelect: (formName: string) => void
}

export default function FormSelector({
  varieties,
  selectedForm,
  onSelect,
}: FormSelectorProps) {
  if (varieties.length <= 1) {
    return null
  }

  return (
    <div className="space-y-2">
      <h4 className="font-pixel text-[8px] text-gameboy-light">
        Formes alternatives
      </h4>

      <div className="flex flex-wrap gap-2 justify-center">
        {varieties.map((variety) => {
          const isSelected = variety.name === selectedForm
          const label =
            variety.isDefault
              ? 'Normal'
              : FORM_TYPE_LABELS[variety.formType] || 'Forme'

          return (
            <button
              key={variety.name}
              onClick={() => onSelect(variety.name)}
              className={`
                flex flex-col items-center gap-1 p-2
                border-2 rounded-lg
                transition-all duration-100
                ${
                  isSelected
                    ? 'bg-gameboy-light border-gameboy-lightest shadow-[0_0_8px_rgba(59,130,246,0.4)]'
                    : 'bg-gameboy-darkest border-gameboy-dark hover:border-gameboy-light hover:bg-gameboy-dark'
                }
              `}
            >
              <div className="relative w-10 h-10">
                {variety.sprite ? (
                  <Image
                    src={variety.sprite}
                    alt={variety.name}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full bg-gameboy-dark rounded flex items-center justify-center">
                    <span className="font-pixel text-[6px] text-gameboy-light">?</span>
                  </div>
                )}
              </div>
              <span
                className={`font-pixel text-[6px] ${isSelected ? 'text-white' : 'text-gameboy-lightest'}`}
              >
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
