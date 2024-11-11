import { createSelectors } from '@/shared/lib/helpers/createSelectors'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { fetcher } from '@/shared/lib/api/fetcher'
import { CurrencyRate } from '@/types/product'
import { apiUrl } from '@/shared/consts/urls'

interface RateState {
    currencyRate: CurrencyRate
    error: Error | null | undefined
    isLoading: boolean
    getRate: (url: string) => Promise<void>
}

export const useRateState = createSelectors(
    create<RateState>(
        persist(
            (set) => ({
                currencyRate: {},
                error: null,
                isLoading: false,
                getRate: async (url: string) => {
                    set({ isLoading: true })
                    await fetcher(url)
                        .then((response) => {
                            console.log(response, 'RESPONSE')
                            set({
                                currencyRate: {
                                    ...response,
                                    rate: Number(response.rate),
                                },
                                isLoading: false,
                                error: null,
                            })
                        })
                        .catch((err) => set({ error: err }))
                        .finally(set({ isLoading: false }))
                },
            }),
            {
                name: 'currency-rate',
                storage: createJSONStorage(() => localStorage),
                onRehydrateStorage: () => (state) => {
                    if (state) {
                        const url = `${apiUrl}/currency/CNY`
                        state.getRate(url).then(() => {
                            console.log('Rate updated after rehydration')
                        })
                    }
                },
            },
        ),
    ),
)
