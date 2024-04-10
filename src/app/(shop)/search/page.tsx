import { SearchContainer, SearchInfoContainer } from '@/features/Search'
import { Suspense } from 'react'

export const dynamic = 'force-dynamic'

export default function SearchPage({
    searchParams,
}: {
    searchParams: { q: string }
}) {
    const query = searchParams.q

    return (
        <div>
            <SearchContainer />
            <Suspense fallback={<div>Loading SearchInfoContainer...</div>}>
                <SearchInfoContainer query={query} />
            </Suspense>
        </div>
    )
}
