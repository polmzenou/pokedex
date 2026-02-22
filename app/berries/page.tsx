import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getBerries } from '@/lib/api'

export const metadata: Metadata = {
  title: 'Baies - Pokédex GameBoy',
  description: 'Liste des baies Pokémon',
}

export const revalidate = 86400

const FLAVOR_COLORS: Record<string, string> = {
  spicy: '#F08030',
  dry: '#98D8D8',
  sweet: '#F85888',
  bitter: '#78C850',
  sour: '#F8D030',
}

const FLAVOR_FR: Record<string, string> = {
  spicy: 'Épicé',
  dry: 'Sec',
  sweet: 'Sucré',
  bitter: 'Amer',
  sour: 'Acide',
}

export default async function BerriesPage() {
  const berries = await getBerries(64)

  return (
    <div className="min-h-screen bg-gameboy-darkest">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gameboy-dark border-b-4 border-gameboy-darkest">
        <div className="flex items-center justify-between px-4 py-3">
          <Link
            href="/items"
            className="font-pixel text-[10px] text-gameboy-light hover:text-gameboy-lightest transition-colors"
          >
            ← Objets
          </Link>
          <h1 className="font-pixel text-gameboy-lightest text-sm">BAIES</h1>
          <Link
            href="/"
            className="font-pixel text-[10px] text-gameboy-lightest hover:text-gameboy-light transition-colors"
          >
            Pokédex →
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {berries.map((berry) => (
            <div
              key={berry.id}
              className="
                bg-gameboy-darkest border-4 border-gameboy-dark p-4
                hover:border-gameboy-light transition-colors duration-100
              "
            >
              <div className="flex items-start gap-3">
                {/* Sprite */}
                <div className="relative w-12 h-12 flex-shrink-0 bg-gameboy-dark p-1">
                  {berry.sprite ? (
                    <Image
                      src={berry.sprite}
                      alt={berry.nameFr}
                      fill
                      className="object-contain pixelated"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="font-pixel text-[8px] text-gameboy-light">
                        ?
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-pixel text-[10px] text-gameboy-lightest mb-1">
                    {berry.nameFr}
                  </h3>

                  <div className="flex gap-2 mb-2">
                    <span className="font-pixel text-[6px] text-gameboy-dark">
                      Taille: {berry.size}mm
                    </span>
                  </div>

                  {/* Flavors */}
                  {berry.flavors.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {berry.flavors.map((flavor) => (
                        <span
                          key={flavor.name}
                          className="font-pixel text-[6px] px-1.5 py-0.5 border border-gameboy-darkest"
                          style={{
                            backgroundColor:
                              FLAVOR_COLORS[flavor.name] || '#A8A878',
                            color: '#fff',
                          }}
                        >
                          {FLAVOR_FR[flavor.name] || flavor.name} {flavor.potency}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
