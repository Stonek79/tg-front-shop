import './MainPage.css'
import { User } from '@/features/User/User'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import Link from 'next/link'
import { Button } from '@/shared/ui/Button'

export default function Home() {
    const { t } = getTranslation('mainPage')

    return (
        <div className="main-page-description">
            <h1>{t('header')}</h1>
            <br />
            <Button>
                <Link href={'/products'}>Смотреть товары</Link>
            </Button>
            <br />
            <User />
        </div>
    )
}
