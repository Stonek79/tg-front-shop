'use client'

import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import cls from './Breadcrumbs.module.scss'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'

export function Breadcrumbs({
    startSegment = 'products',
}: {
    startSegment?: string
}) {
    const segment = useSelectedLayoutSegment()
    const { t } = getTranslation()

    return (
        <nav className={cls.breadcrumbsContainer} aria-label="Breadcrumb">
            <ul className={cls.breadcrumbsList}>
                <li className={cls.breadcrumbsItem}>
                    <Link href={`/`}>{t('buttons.home')}</Link>
                </li>
                <li
                    className={cls.breadcrumbsItem}
                    aria-current={segment ? undefined : 'page'}
                >
                    <Link href={`/${startSegment}`}>
                        {t(`buttons.${startSegment}`)}
                    </Link>
                </li>
                {segment ? (
                    <li className={cls.breadcrumbsItem} aria-current="page">
                        {segment}
                    </li>
                ) : null}
            </ul>
        </nav>
    )
}
