import './MainPage.css'
import { User } from '@/features/User/User'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'

export default function Home() {
    const { t } = getTranslation('mainPage')

    return (
        <div className="main_page_description">
            <h1>{t('header')}</h1>
            <br />
            <User />
        </div>
    )
}
