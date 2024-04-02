'use client'
import cls from './SearchButton.module.css'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

export const SearchButton = () => {
    const searchParams = useSearchParams()
    const router = useRouter()

    const params = new URLSearchParams(searchParams)

    const handleSearch = () => {
        params.set('q', '')
        router.push(`/search?${params.toString()}`, { scroll: false })
    }
    return (
        <div>
            <button onClick={handleSearch} className={cls.searchMenuBtn}>
                <Image
                    src="/img/search.svg"
                    alt="Кнопка поиска"
                    width={24}
                    height={24}
                />
            </button>
        </div>
    )
}
