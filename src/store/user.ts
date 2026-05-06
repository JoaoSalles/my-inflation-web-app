import { create } from 'zustand'
import type { User } from '../types/user'

interface UserState {
  user: User | null
  login: (user: User) => void
  logout: () => void
}

export const useUserStore = create<UserState>((set) => ({
  user: {
    id: "test",
    name: "test",
    email: "test"
  },
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}))
