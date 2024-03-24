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
    const { t } = getTranslation('products.productItem')

    return (
        <li className={`productPreview ${className}`}>
            <Link
                aria-label={product.title}
                className="productBtn"
                href={`/products/${product.id}`}
            >
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
                        {t('price')}: <b>{product.price}</b>
                    </div>
                </div>
            </Link>
        </li>
    )
}
