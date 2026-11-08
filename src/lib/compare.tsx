import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

export const MAX_COMPARE = 3

interface CompareState {
  selected: string[]
  isSelected: (slug: string) => boolean
  isFull: boolean
  toggle: (slug: string) => void
  clear: () => void
}

const CompareContext = createContext<CompareState | null>(null)

export function CompareProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<string[]>([])

  const toggle = useCallback((slug: string) => {
    setSelected((cur) => {
      if (cur.includes(slug)) return cur.filter((s) => s !== slug)
      if (cur.length >= MAX_COMPARE) return cur
      return [...cur, slug]
    })
  }, [])

  const value = useMemo<CompareState>(
    () => ({
      selected,
      isSelected: (slug) => selected.includes(slug),
      isFull: selected.length >= MAX_COMPARE,
      toggle,
      clear: () => setSelected([]),
    }),
    [selected, toggle],
  )

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
}

export function useCompare() {
  const ctx = useContext(CompareContext)
  if (!ctx) throw new Error('useCompare must be used inside CompareProvider')
  return ctx
}
