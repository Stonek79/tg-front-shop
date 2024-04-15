import { SearchContainer, SearchInfoContainer } from '@/features/Search'
import { Suspense } from 'react'

export const Search = ({ query = '' }: { query?: string }) => (
    <div>
        <SearchContainer />
        <Suspense fallback={<div>Loading SearchInfo...</div>}>
            <SearchInfoContainer query={query} />
        </Suspense>
    </div>
)
