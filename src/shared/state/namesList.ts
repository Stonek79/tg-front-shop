'use client'

import { create } from 'zustand'
import { createSelectors } from '@/shared/lib/helpers/createSelectors'
import { createJSONStorage, persist } from 'zustand/middleware'
import { fetcher } from '@/shared/lib/api/fetcher'

interface NamesState {
    namesList: { [key: string]: string[] }
    error: null | undefined
    isLoading: boolean
    fetchNames: (url: string) => Promise<void>
    hasName: (name: string, key: string) => boolean
}

export const useNamesStore = createSelectors(
    create<NamesState>()(
        persist(
            (set, get) => ({
                namesList: {},
                error: null,
                isLoading: false,
                fetchNames: async (url: string) => {
                    set({ isLoading: true })
                    await fetcher(url)
                        .then((response) => {
                            set({
                                namesList: {
                                    ...get().namesList,
                                    [response.id]: response.names,
                                },
                                isLoading: false,
                                error: null,
                            })
                        })
                        .catch((err) => set({ error: err }))
                        .finally(() => set({ isLoading: false }))
                },
                hasName: (name: string, key: string) => {
                    const { namesList } = get()
                    if (!namesList[key]) {
                        return false
                    }
                    return namesList[key].includes(name.trim())
                },
            }),
            {
                name: 'namesList',
                storage: createJSONStorage(() => localStorage),
            },
        ),
    ),
)
