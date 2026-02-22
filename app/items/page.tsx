import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getItems } from '@/lib/api'

export const metadata: Metadata = {
  title: 'Objets - Pokédex GameBoy',
  description: 'Liste des objets Pokémon',
}

export const revalidate = 86400

export default async function ItemsPage() {
  const items = await getItems(50)

  return (
    <div className="min-h-screen bg-gameboy-darkest">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gameboy-dark border-b-4 border-gameboy-darkest">
        <div className="flex items-center justify-between px-4 py-3">
          <Link
            href="/"
            className="font-pixel text-[10px] text-gameboy-lightest hover:text-gameboy-light transition-colors"
          >
            ← Pokédex
          </Link>
          <h1 className="font-pixel text-gameboy-lightest text-sm">OBJETS</h1>
          <Link
            href="/berries"
            className="font-pixel text-[10px] text-gameboy-light hover:text-gameboy-lightest transition-colors"
          >
            Baies →
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="
                bg-gameboy-darkest border-4 border-gameboy-dark p-4
                hover:border-gameboy-light transition-colors duration-100
              "
            >
              <div className="flex items-start gap-3">
                {/* Sprite */}
                <div className="relative w-12 h-12 flex-shrink-0 bg-gameboy-dark p-1">
                  {item.sprite ? (
                    <Image
                      src={item.sprite}
                      alt={item.nameFr}
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
                  <h3 className="font-pixel text-[10px] text-gameboy-lightest mb-1 truncate">
                    {item.nameFr}
                  </h3>
                  <div className="font-pixel text-[6px] text-gameboy-dark mb-2 capitalize">
                    {item.category.replace(/-/g, ' ')}
                  </div>
                  {item.effect && (
                    <p className="font-pixel text-[6px] text-gameboy-light leading-relaxed line-clamp-3">
                      {item.effect}
                    </p>
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
