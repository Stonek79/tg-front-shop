'use client'

import './SearchInfoContainer.css'
import { useSearchParams } from 'next/navigation'
import { ProductsList } from '@/widgets/ProductsList'
import { useEffect } from 'react'

export const SearchInfoContainer = () => {
    const searchParams = useSearchParams()
    const query = searchParams.get('search') || ''

    useEffect(() => {
        if (query) {
            document.documentElement.style.setProperty(
                '--main-overflow',
                'hidden',
            )
        } else {
            document.documentElement.style.setProperty(
                '--main-overflow',
                'auto',
            )
        }
    }, [query])

    return (
        <div className="search-info-container">
            <div>{query && <ProductsList search={query} />}</div>
        </div>
    )
}
