import './BackButton.css'
import { Button } from '@/shared/ui/Button'
import { useRouter } from 'next/navigation'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'

export const BackButton = () => {
    const router = useRouter()
    const { t } = getTranslation('products.productItem')
    return (
        <Button className="backButton" onClick={() => router.back()}>
            <span>《</span>
            <span>{t('backBtn')}</span>
        </Button>
    )
}
