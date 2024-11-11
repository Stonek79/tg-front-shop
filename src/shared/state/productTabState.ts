import { createSelectors } from '@/shared/lib/helpers/createSelectors'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface TabState {
    value: number
    title: string
    setTitle: (title: string) => void
    setValue: (newValue: number) => void
}

export const useTabState = createSelectors(
    create<TabState>(
        persist(
            (set) => ({
                value: 0,
                title: '',
                setTitle: (title) => set({ title }),
                setValue: (newValue) => set({ value: newValue }),
            }),
            {
                name: 'tab-storage',
                storage: createJSONStorage(() => localStorage),
            },
        ),
    ),
)
