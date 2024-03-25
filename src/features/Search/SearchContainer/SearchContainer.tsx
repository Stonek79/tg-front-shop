'use client'

import './SearchContainer.css'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebounceCallback } from '@/shared/lib/hooks/useDebounceCallback'
import { memo, useEffect, useRef } from 'react'
import { Button } from '@/shared/ui/Button'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'

// eslint-disable-next-line react/display-name
export const SearchContainer = memo(
    ({ placeholder = '' }: { placeholder?: string }) => {
        const searchParams = useSearchParams()
        const pathname = usePathname()
        const { t } = getTranslation('buttons')
        const { replace, back } = useRouter()
        const inputRef = useRef<HTMLInputElement>(null)

        const handleSearch = useDebounceCallback((term) => {
            const params = new URLSearchParams(searchParams)
            if (term) {
                params.set('q', term)
            } else {
                params.delete('q')
            }
            replace(`${pathname}?${params.toString()}`)
        }, 300)

        const onClearInput = () => {
            if (inputRef.current) {
                inputRef.current.value = ''
                handleSearch('')
            }
        }

        const goBack = () => {
            back()
        }

        useEffect(() => {
            if (inputRef.current) {
                inputRef.current.focus()
            }
        })

        return (
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
                        defaultValue={searchParams.get('q')?.toString()}
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
                        <Button className="clear" onClick={goBack}>
                            {t('close')}
                        </Button>
                    </div>
                </div>
            </div>
        )
    },
)
