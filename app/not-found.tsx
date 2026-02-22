import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gameboy-darkest flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        {/* 404 */}
        <div className="mb-6">
          <span className="font-pixel text-6xl text-gameboy-light">404</span>
        </div>

        {/* Title */}
        <h1 className="font-pixel text-gameboy-lightest text-lg mb-4">
          Page introuvable
        </h1>

        {/* Message */}
        <p className="font-pixel text-[10px] text-gameboy-light mb-6 leading-relaxed">
          Ce Pokémon sauvage s&apos;est enfui !
          <br />
          La page que vous cherchez n&apos;existe pas.
        </p>

        {/* Action */}
        <Link
          href="/"
          className="
            inline-block font-pixel text-[10px]
            text-gameboy-darkest bg-gameboy-light
            px-6 py-3 border-4 border-gameboy-darkest
            shadow-[4px_4px_0_#0f380f]
            hover:bg-gameboy-lightest transition-colors
            active:translate-y-1 active:shadow-none
          "
        >
          ← Retour au Pokédex
        </Link>
      </div>
    </div>
  )
}
