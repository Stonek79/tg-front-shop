import { getTranslation } from '@/shared/lib/hooks/getTranslation'

const { t } = getTranslation()
export const Genders = [
    { name: t('genders.male'), id: 'male' },
    { name: t('genders.female'), id: 'female' },
    { name: t('genders.unisex'), id: 'unisex' },
]
