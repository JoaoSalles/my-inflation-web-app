import { create } from 'zustand'

interface UIThemeState {
  isDark: boolean
  toggleDark: () => void
}

export const useUIThemeStore = create<UIThemeState>((set) => ({
  isDark: false,
  toggleDark: () => set((state) => ({ isDark: !state.isDark })),
}))
