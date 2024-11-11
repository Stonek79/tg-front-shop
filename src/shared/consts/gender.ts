import { getTranslation } from '@/shared/lib/hooks/getTranslation'

const { t } = getTranslation()
export const Genders = [
    { name: t('genders.male'), id: 'MALE' },
    { name: t('genders.female'), id: 'FEMALE' },
    { name: t('genders.unisex'), id: 'UNISEX' },
]
