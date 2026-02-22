export default function Loading() {
  return (
    <div className="min-h-screen bg-gameboy-darkest">
      {/* Header Skeleton */}
      <header className="bg-gameboy-dark border-b-4 border-gameboy-darkest">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="w-16 h-4 bg-gameboy-darkest animate-pulse" />
          <div className="w-20 h-4 bg-gameboy-darkest animate-pulse" />
          <div className="w-16 h-4 bg-gameboy-darkest animate-pulse" />
        </div>
      </header>

      {/* Grid Skeleton */}
      <main className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="bg-gameboy-darkest border-4 border-gameboy-dark p-4 animate-pulse"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gameboy-dark flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="w-3/4 h-3 bg-gameboy-dark" />
                  <div className="w-1/2 h-2 bg-gameboy-dark" />
                  <div className="w-full h-8 bg-gameboy-dark" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
