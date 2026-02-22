export default function PokemonListSkeleton() {
  return (
    <div className="grid grid-cols-6 gap-2 p-2">
      {Array.from({ length: 18 }).map((_, i) => (
        <div
          key={i}
          className="
            flex flex-col items-center justify-center p-2
            border-2 border-gameboy-dark rounded-lg
            bg-gameboy-dark
            aspect-square
            animate-pulse
          "
        >
          <div className="w-8 h-2 bg-gameboy-darkest rounded mb-2" />
          <div className="w-12 h-12 bg-gameboy-darkest rounded" />
        </div>
      ))}
    </div>
  )
}
