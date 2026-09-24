/**
 * Client-side registry letting anchor navigation (see src/providers/SmoothScroll)
 * discover that a target id lives inside a currently-hidden Book page, so it can
 * activate that page before scrolling to it.
 */
export type BookRegistryEntry = {
  /** Anchor ids contained in each page, indexed by page. */
  pages: string[][]
  setActive: (index: number) => void
  getSectionElement: () => HTMLElement | null
}

const registry = new Map<string, BookRegistryEntry>()

export function registerBook(instanceId: string, entry: BookRegistryEntry) {
  registry.set(instanceId, entry)
}

export function unregisterBook(instanceId: string) {
  registry.delete(instanceId)
}

export function resolveAnchor(
  anchorId: string,
): (BookRegistryEntry & { pageIndex: number }) | null {
  for (const entry of registry.values()) {
    const pageIndex = entry.pages.findIndex((ids) => ids.includes(anchorId))
    if (pageIndex !== -1) {
      return { ...entry, pageIndex }
    }
  }
  return null
}
