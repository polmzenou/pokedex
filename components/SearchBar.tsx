'use client'

import { useState, useEffect, useRef } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
}

export default function SearchBar({
  onSearch,
  placeholder = 'Rechercher...',
}: SearchBarProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const debounce = setTimeout(() => {
      onSearch(query)
    }, 200)

    return () => clearTimeout(debounce)
  }, [query, onSearch])

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="
          w-full px-3 py-2
          font-pixel text-[10px] text-white
          bg-gameboy-dark
          border-2 border-gameboy-light rounded
          shadow-[3px_3px_0_#0a1628]
          placeholder:text-gameboy-light/50
          focus:outline-none focus:border-gameboy-lightest focus:bg-gameboy-dark/80
          transition-colors duration-100
        "
      />
      {query && (
        <button
          onClick={() => {
            setQuery('')
            inputRef.current?.focus()
          }}
          className="
            absolute right-2 top-1/2 -translate-y-1/2
            font-pixel text-[10px] text-gameboy-light
            hover:text-gameboy-lightest
            px-1
          "
        >
          ✕
        </button>
      )}
    </div>
  )
}
