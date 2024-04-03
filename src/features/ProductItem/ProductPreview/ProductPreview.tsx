'use client'
import cls from './ProductPreview.module.css'
import { Product } from '@/types/product'
import Image from 'next/image'
import Link from 'next/link'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { classNames } from '@/shared/lib/helpers/classNames'

interface ProductItemProps {
    product: Product
    className?: string
}

export const ProductPreview = ({ product, className }: ProductItemProps) => {
    const { t } = getTranslation()
    const {
        id,
        title,
        description,
        rating,
        price,
        currency = '₽',
        thumbnail,
        discountPercentage,
    } = product

    const salePercent = discountPercentage
        ? Math.floor(discountPercentage)
        : null
    const discountPrice = salePercent
        ? Math.ceil(price * (1 - salePercent / 100)).toFixed(2)
        : null
    const cn = classNames(cls.productPreview, {}, [className])

    return (
        <li className={cn}>
            <Link
                aria-label={title}
                className={cls.productBtn}
                href={`/products/${id}`}
            >
                <section className={cls.imageSection}>
                    {rating! >= 4.5 && (
                        <span className={cls.bestseller}>
                            {t('products.bestseller')}
                        </span>
                    )}
                    {discountPercentage! >= 12 && (
                        <span className={cls.sale}>{t('products.sale')}</span>
                    )}
                    <div className={cls.imageContainer}>
                        <Image
                            alt={title}
                            src={thumbnail || ''}
                            width={200}
                            height={200}
                            className={cls.img}
                            priority
                        />
                    </div>
                </section>
                <section>
                    <div className={cls.productInfo}>
                        <div className={cls.title}>
                            <span>{title}</span>
                            <span className={cls.viewDescription}>
                                {description}
                            </span>
                        </div>
                        <div className={cls.stars}>
                            <Image
                                src={'/img/star.webp'}
                                alt={'star rating'}
                                width={16}
                                height={16}
                            />
                            {rating}
                        </div>
                        <div className={cls.price}>
                            {discountPrice && (
                                <div className={cls.discountPrice}>
                                    <span>
                                        {discountPrice}
                                        {currency}
                                    </span>
                                    <span>-{salePercent}%</span>
                                </div>
                            )}
                            <span>
                                {t('products.price')}:{' '}
                                <b>
                                    {price}
                                    {currency}
                                </b>
                            </span>
                        </div>
                    </div>
                </section>
            </Link>
        </li>
    )
}
