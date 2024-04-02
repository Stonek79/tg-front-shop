'use client'

import cls from './SearchContainer.module.css'
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
        const { t } = getTranslation()
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
            <div className={cls.searchContainer}>
                <div className={cls.relativeFlex}>
                    <Image
                        className={cls.magnifyingGlassIcon}
                        src={'/img/search.svg'}
                        alt={'search'}
                        width={24}
                        height={24}
                    />
                    <input
                        ref={inputRef}
                        className={cls.inputBlock}
                        placeholder={placeholder}
                        onChange={(e) => {
                            handleSearch(e.target.value.toString())
                        }}
                        defaultValue={searchParams.get('q')?.toString()}
                    />
                    <div className={cls.buttonsWrapper}>
                        <button
                            onClick={onClearInput}
                            className={cls.clearInput}
                        >
                            <Image
                                src={'/img/close-small.svg'}
                                alt={'clear input'}
                                height={18}
                                width={18}
                            />
                        </button>
                        <Button variant="standart">
                            {t('buttons.search')}
                        </Button>
                        <Button variant="clear" onClick={goBack}>
                            {t('buttons.close')}
                        </Button>
                    </div>
                </div>
            </div>
        )
    },
)
