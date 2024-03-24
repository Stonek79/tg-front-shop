'use client'

import './SearchContainer.css'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebounceCallback } from '@/shared/lib/hooks/useDebounceCallback'
import { Suspense, useEffect, useRef, useState } from 'react'
import { SearchButton } from '../SearchButton/SearchButton'
import { SearchInfoContainer } from '../SearchInfoContainer/SearchInfoContainer'
import { Button } from '@/shared/ui/Button'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'

export const SearchContainer = ({
    placeholder = '',
}: {
    placeholder?: string
}) => {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { t } = getTranslation('buttons')
    const { replace } = useRouter()
    const [searchOpened, setSearchOpened] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleSearch = useDebounceCallback((term) => {
        const params = new URLSearchParams(searchParams)
        if (term) {
            params.set('search', term)
        } else {
            params.delete('search')
        }
        replace(`${pathname}?${params.toString()}`)
    }, 300)

    const onClearInput = () => {
        if (inputRef.current) {
            inputRef.current.value = ''
            handleSearch('')
        }
    }

    useEffect(() => {
        if (searchOpened) {
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
    }, [searchOpened])

    return !searchOpened ? (
        <SearchButton setSearchOpened={setSearchOpened} />
    ) : (
        <div className="search-container">
            <div className="relative-flex">
                <Image
                    className="magnifying-glass-icon"
                    src={'/img/search.svg'}
                    alt={'search'}
                    width={24}
                    height={24}
                />
                <input
                    ref={inputRef}
                    className="input-block"
                    placeholder={placeholder}
                    onChange={(e) => {
                        handleSearch(e.target.value.toString())
                    }}
                    defaultValue={searchParams.get('search')?.toString()}
                />
                <div className="buttons-wrapper">
                    <button onClick={onClearInput} className="clear-input">
                        <Image
                            src={'/img/close-small.svg'}
                            alt={'clear input'}
                            height={18}
                            width={18}
                        />
                    </button>
                    <Button className="standart">{t('search')}</Button>
                    <Button
                        className="clear"
                        onClick={() => setSearchOpened(false)}
                    >
                        {t('close')}
                    </Button>
                </div>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <SearchInfoContainer />
            </Suspense>
        </div>
    )
}
