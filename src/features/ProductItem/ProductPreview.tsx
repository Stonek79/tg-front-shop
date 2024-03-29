'use client'
import './ProductItem.css'
import { Product } from '@/types/product'
import Image from 'next/image'
import Link from 'next/link'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'

interface ProductItemProps {
    product: Product
    className?: string
}

export const ProductPreview = ({ product, className }: ProductItemProps) => {
    const { t } = getTranslation()
    const { rating, discountPercentage } = product

    return (
        <li className={`productPreview ${className}`}>
            <Link
                aria-label={product.title}
                className="productBtn"
                href={`/products/${product.id}`}
            >
                {rating! >= 4.5 && (
                    <span className="rating">{t('products.bestseller')}</span>
                )}
                {discountPercentage! >= 12 && (
                    <span className="sale">{t('products.sale')}</span>
                )}
                <div className="imageContainer">
                    <Image
                        alt={product.title}
                        src={product.thumbnail || ''}
                        width={200}
                        height={200}
                        className={'img'}
                        priority
                    />
                </div>
                <div className={'productInfo'}>
                    <div className={'title'}>{product.title}</div>
                    <div className={'price'}>
                        {t('products.price')}: <b>{product.price}</b>
                    </div>
                </div>
            </Link>
        </li>
    )
}
