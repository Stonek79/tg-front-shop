'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import cls from './Breadcrumbs.module.scss'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'

export function Breadcrumbs({
    startSegment = 'products',
}: {
    startSegment?: string
}) {
    const pathname = usePathname()
    const segments = pathname.replace('/', '').split('/').slice(1)
    const { t } = getTranslation()

    return (
        <nav className={cls.breadcrumbsContainer} aria-label="Breadcrumb">
            <ul className={cls.breadcrumbsList}>
                <li className={cls.breadcrumbsItem}>
                    <Link href={`/`}>{t('buttons.home')}</Link>
                </li>
                <li
                    className={cls.breadcrumbsItem}
                    aria-current={segments.length ? undefined : 'page'}
                >
                    <Link href={`/${startSegment}`}>
                        {t(`buttons.${startSegment}`)}
                    </Link>
                </li>
                {segments.length <= 0
                    ? null
                    : segments.map((segment) => (
                          <li
                              key={segment}
                              className={cls.breadcrumbsItem}
                              aria-current="page"
                          >
                              {t(`buttons.${segment}`) ?? segment}
                          </li>
                      ))}
            </ul>
        </nav>
    )
}
