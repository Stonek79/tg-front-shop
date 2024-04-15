import { Search } from '@/widgets/Search'

export const dynamic = 'force-dynamic'

export default function SearchPage({
    searchParams,
}: {
    searchParams: { q: string }
}) {
    const query = searchParams.q

    return <Search query={query} />
}
