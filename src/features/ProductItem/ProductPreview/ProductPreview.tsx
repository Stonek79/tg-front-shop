'use client'
import cls from './ProductPreview.module.css'
import { Product } from '@/types/product'
import Image from 'next/image'
import Link from 'next/link'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { classNames } from '@/shared/lib/helpers/classNames'
import { CarouselComponent } from '@/features/Carousel'

interface ProductItemProps {
    product: Product
    className?: string
    isNew?: boolean
    isHit?: boolean
    isSale?: boolean
}

export const ProductPreview = ({
    product,
    className,
    isNew = false,
    isHit = false,
    isSale = false,
}: ProductItemProps) => {
    const { t } = getTranslation()
    const {
        id,
        title,
        description,
        rating,
        price,
        currency = '₽',
        discountPercentage,
        images = [],
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
                    {isHit && (
                        <span className={cls.bestseller}>
                            {t('products.bestseller')}
                        </span>
                    )}
                    {isNew && (!isSale || !isHit) && (
                        <span className={cls.new}>{t('products.new')}</span>
                    )}
                    {isSale && (
                        <span className={cls.sale}>{t('products.sale')}</span>
                    )}
                    <div className={cls.imageContainer}>
                        <CarouselComponent
                            slides={images}
                            viewportSize={200}
                            hasThumbs={false}
                            hasButtons={false}
                            borderRadius={8}
                            dotButtonSize={8}
                            className={cls.img}
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
                            {!isNew && discountPrice && (
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
