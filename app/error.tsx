'use client'

import { useEffect } from 'react'
import PixelButton from '@/components/PixelButton'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-gameboy-darkest flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        {/* Error Icon */}
        <div className="mb-6">
          <span className="font-pixel text-6xl text-red-500">!</span>
        </div>

        {/* Title */}
        <h1 className="font-pixel text-gameboy-lightest text-lg mb-4">
          Erreur
        </h1>

        {/* Message */}
        <p className="font-pixel text-[10px] text-gameboy-light mb-6 leading-relaxed">
          Une erreur est survenue lors du chargement.
          <br />
          Veuillez réessayer.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <PixelButton onClick={reset}>Réessayer</PixelButton>
          <PixelButton
            variant="secondary"
            onClick={() => (window.location.href = '/')}
          >
            Accueil
          </PixelButton>
        </div>
      </div>
    </div>
  )
}
