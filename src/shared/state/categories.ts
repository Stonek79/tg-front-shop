import { createSelectors } from '@/shared/lib/helpers/createSelectors'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { Category } from '@/types/categories'
import { fetcher } from '@/shared/lib/api/fetcher'

interface CategoriesState {
    categories: Category[]
    categoriesList: Category[]
    error: null | undefined
    rootId: number | null
    isLoading: boolean
    fetchCategories: (url: string) => Promise<void>
}
export const useCategoriesStore = createSelectors(
    create<CategoriesState>()(
        persist(
            (set, get) => ({
                categories: [],
                categoriesList: [],
                error: null,
                rootId: null,
                isLoading: false,
                fetchCategories: async (url: string) => {
                    set({ isLoading: true })
                    await fetcher(url)
                        .then((response) => {
                            set({
                                categories: response,
                                isLoading: false,
                                error: null,
                                rootId: response[0].id,
                                categoriesList: [
                                    response[0],
                                    response[0].children,
                                ].flat(),
                            })
                        })
                        .catch((err) => set({ error: err }))
                        .finally(() => set({ isLoading: false }))
                },
            }),
            {
                name: 'categoriesList',
                storage: createJSONStorage(() => localStorage),
            },
        ),
    ),
)
