export default function PokemonDetailSkeleton() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 animate-pulse">
      {/* Sprite placeholder */}
      <div className="w-48 h-48 bg-gameboy-dark rounded-lg mb-4" />

      {/* Name placeholder */}
      <div className="w-32 h-6 bg-gameboy-dark rounded mb-2" />

      {/* ID placeholder */}
      <div className="w-16 h-4 bg-gameboy-dark rounded mb-4" />

      {/* Types placeholder */}
      <div className="flex gap-2 mb-6">
        <div className="w-16 h-6 bg-gameboy-dark rounded" />
        <div className="w-16 h-6 bg-gameboy-dark rounded" />
      </div>

      {/* Stats placeholder */}
      <div className="w-full max-w-md space-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-20 h-3 bg-gameboy-dark rounded" />
            <div className="flex-1 h-3 bg-gameboy-dark rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}
