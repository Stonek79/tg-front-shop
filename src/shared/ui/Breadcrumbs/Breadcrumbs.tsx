'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import cls from './Breadcrumbs.module.css'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'

type BreadcrumbsProps = {
    lastItemLabel?: string
}

export function Breadcrumbs({ lastItemLabel }: BreadcrumbsProps) {
    const pathname = usePathname()
    const { t } = getTranslation()

    console.log(pathname, 'pathname')
    // Разбиваем путь на части и создаем массив объектов
    const paths = pathname
        .split('/')
        .filter(Boolean)
        .map((part, index, array) => {
            const href = '/' + array.slice(0, index + 1).join('/')
            return { label: part, href }
        })

    // Если путей больше двух, скрываем начальные, оставляя последние два
    const visiblePaths = paths.length > 2 ? paths.slice(-2) : paths

    return (
        <nav aria-label="breadcrumb" className={cls.breadcrumbs}>
            <ol className={cls.breadcrumbList}>
                {paths.length > 2 && (
                    <li className={cls.breadcrumbEllipsis}>...</li>
                )}
                {visiblePaths.map((path, index) => (
                    <li key={index} className={cls.breadcrumbItem}>
                        {index > 0 && <span className={cls.separator}>•</span>}
                        {index < visiblePaths.length - 1 ? (
                            <Link
                                className={cls.breadcrumbLink}
                                href={path.href}
                            >
                                {t(path.label)}
                            </Link>
                        ) : (
                            <span className={cls.breadcrumbCurrent}>
                                {t(lastItemLabel || path.label)}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    )
}
