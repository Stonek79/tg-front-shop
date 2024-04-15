import cls from './ProductDescription.module.css'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { Product } from '@/types/product'

export const ProductDescription = ({ product }: { product: Product }) => {
    const { t } = getTranslation()
    return (
        <div className={cls.productDescription}>
            <div className={cls.title}>
                <span>{t('products.title')}:</span> {product.title}
            </div>
            <div className={cls.description}>
                <span>{t('products.description')}:</span> {product.description}
            </div>
        </div>
    )
}
