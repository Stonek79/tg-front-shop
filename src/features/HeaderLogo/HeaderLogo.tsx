import './HeaderLogo.css'
import Link from 'next/link'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { memo } from 'react'

// eslint-disable-next-line react/display-name
export const HeaderLogo = memo(() => {
    const { t } = getTranslation('header')

    return (
        <Link className="header_logo" href={'/'} aria-label={t('toMain')}>
            <h4>RUS PLUS</h4>
        </Link>
    )
})
