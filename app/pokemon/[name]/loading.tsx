export default function Loading() {
  return (
    <div className="min-h-screen bg-gameboy-darkest">
      {/* Header Skeleton */}
      <header className="bg-gameboy-dark border-b-4 border-gameboy-darkest">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="w-16 h-4 bg-gameboy-darkest animate-pulse" />
          <div className="w-24 h-4 bg-gameboy-darkest animate-pulse" />
          <div className="w-16" />
        </div>
      </header>

      {/* Content Skeleton */}
      <main className="p-4 pb-8 max-w-lg mx-auto space-y-6 animate-pulse">
        {/* Title */}
        <div className="text-center space-y-2">
          <div className="w-16 h-3 bg-gameboy-dark mx-auto" />
          <div className="w-32 h-6 bg-gameboy-dark mx-auto" />
          <div className="w-24 h-3 bg-gameboy-dark mx-auto" />
        </div>

        {/* Sprite */}
        <div className="flex justify-center">
          <div className="w-56 h-56 bg-gameboy-dark" />
        </div>

        {/* Button */}
        <div className="flex justify-center">
          <div className="w-24 h-8 bg-gameboy-dark" />
        </div>

        {/* Types */}
        <div className="flex justify-center gap-2">
          <div className="w-16 h-6 bg-gameboy-dark" />
          <div className="w-16 h-6 bg-gameboy-dark" />
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="h-20 bg-gameboy-dark border-4 border-gameboy-dark" />
          <div className="h-20 bg-gameboy-dark border-4 border-gameboy-dark" />
        </div>

        {/* Description */}
        <div className="h-24 bg-gameboy-dark border-4 border-gameboy-dark" />

        {/* Stats */}
        <div className="h-48 bg-gameboy-dark border-4 border-gameboy-dark" />

        {/* Evolution */}
        <div className="h-24 bg-gameboy-dark border-4 border-gameboy-dark" />
      </main>
    </div>
  )
}
