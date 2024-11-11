'use client'
import cls from './ProductPreview.module.css'
import { CurrencyRate, Product } from '@/types/product'
import Image from 'next/image'
import Link from 'next/link'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { classNames } from '@/shared/lib/helpers/classNames'
import { CarouselComponent } from '@/features/Carousel'
import { formatPrice } from '@/shared/lib/helpers/formatPrice'
import { useRateState } from '@/shared/state/currencyRate'
import React from 'react'

const PriceComponent = ({
    isNew,
    product,
    currencyRate,
}: {
    isNew: boolean
    product: Product
    currencyRate: CurrencyRate
}) => {
    const { price, discountPercentage, priceWithDiscount = 0 } = product

    const renderDiscountedPrice = () => (
        <div className={cls.discountPrice}>
            <span className={cls.discountedPrice}>
                {formatPrice(priceWithDiscount! * currencyRate.rate, 'RUB')}
            </span>
            <span className={cls.firstPrice}>
                {formatPrice(price * currencyRate.rate, 'RUB')}
            </span>
            <span className={cls.discountPercent}>-{discountPercentage}%</span>
        </div>
    )

    const renderRegularPrice = () => (
        <span className={cls.discountPrice}>
            {formatPrice(price * currencyRate.rate, 'RUB')}
        </span>
    )

    return (
        <div className={cls.price}>
            {isNew || !discountPercentage
                ? renderRegularPrice()
                : renderDiscountedPrice()}
        </div>
    )
}

interface ProductItemProps {
    product: Product
    className?: string
    isNew?: boolean
    isHit?: boolean
    isSale?: boolean
    key: string
}

export const ProductPreview = ({
    product,
    className,
    isNew = false,
    isHit = false,
    isSale = false,
    key,
}: ProductItemProps) => {
    const { t } = getTranslation()
    const { id, title, description, rating, images = [] } = product

    const {
        currencyRate,
        isLoading: isLoadingRate,
        error: rateError,
    } = useRateState()

    // TODO: add good loader
    if (isLoadingRate) {
        return <p>Loading...</p>
    }

    // TODO: add error handler
    if (rateError) {
        return <p>Error: {rateError.message}</p>
    }

    const cn = classNames(cls.productPreview, {}, [className])

    return (
        <li key={key} className={cn}>
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
                            slides={images as string[]}
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
                        <PriceComponent
                            currencyRate={currencyRate}
                            isNew={isNew}
                            product={product}
                        />
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
                                priority
                            />
                            {rating?.toFixed(1)}
                        </div>
                    </div>
                </section>
            </Link>
        </li>
    )
}
