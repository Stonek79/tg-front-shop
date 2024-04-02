import cls from './BackButton.module.css'
import { Button } from '@/shared/ui/Button'
import { useRouter } from 'next/navigation'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'

export const BackButton = () => {
    const router = useRouter()
    const { t } = getTranslation()
    return (
        <Button className={cls.backButton} onClick={() => router.back()}>
            <span>《</span>
            <span>{t('buttons.back')}</span>
        </Button>
    )
}
