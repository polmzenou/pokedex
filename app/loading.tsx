export default function Loading() {
  return (
    <div className="h-screen flex flex-col bg-gameboy-darkest">
      {/* Header Skeleton */}
      <header className="flex-shrink-0 bg-gradient-to-r from-gameboy-dark to-gameboy-darkest border-b-4 border-gameboy-light/30">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-gameboy-dark animate-pulse" />
            <div className="w-24 h-4 bg-gameboy-dark rounded animate-pulse" />
          </div>
          <div className="flex gap-2">
            <div className="w-16 h-6 bg-gameboy-dark rounded animate-pulse" />
            <div className="w-16 h-6 bg-gameboy-dark rounded animate-pulse" />
            <div className="w-16 h-6 bg-gameboy-dark rounded animate-pulse" />
          </div>
        </div>
      </header>

      {/* Main Content Skeleton */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Panel - Grid */}
        <aside className="w-full lg:w-[480px] flex-shrink-0 border-r-4 border-gameboy-dark">
          <div className="p-3 border-b-4 border-gameboy-dark space-y-2">
            <div className="w-full h-10 bg-gameboy-dark rounded animate-pulse" />
            <div className="w-20 h-6 bg-gameboy-dark rounded animate-pulse" />
          </div>
          <div className="px-3 py-2 bg-gameboy-dark border-b-2 border-gameboy-darkest">
            <div className="w-24 h-3 bg-gameboy-darkest rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-6 gap-2 p-2">
            {Array.from({ length: 18 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-gameboy-dark rounded-lg animate-pulse"
              />
            ))}
          </div>
        </aside>

        {/* Right Panel */}
        <section className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-gameboy-darkest to-gameboy-dark">
          <div className="text-center space-y-4 animate-pulse">
            <div className="w-48 h-48 bg-gameboy-dark rounded-lg mx-auto" />
            <div className="w-32 h-6 bg-gameboy-dark rounded mx-auto" />
            <div className="flex gap-2 justify-center">
              <div className="w-16 h-6 bg-gameboy-dark rounded" />
              <div className="w-16 h-6 bg-gameboy-dark rounded" />
            </div>
          </div>
        </section>
      </main>

      {/* Footer Skeleton */}
      <footer className="flex-shrink-0 bg-gameboy-dark border-t-4 border-gameboy-light/30 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="w-40 h-2 bg-gameboy-darkest rounded animate-pulse" />
          <div className="w-24 h-2 bg-gameboy-darkest rounded animate-pulse" />
        </div>
      </footer>
    </div>
  )
}
