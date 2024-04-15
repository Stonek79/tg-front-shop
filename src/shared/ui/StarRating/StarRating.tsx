'use client'

import { memo, useState } from 'react'
import cls from './StarRating.module.scss'
import { classNames } from '@/shared/lib/helpers/classNames'

interface StarRatingProps {
    className?: string
    onSelect?: (starsCount: number) => void
    rating?: number
}

const stars = [1, 2, 3, 4, 5]

const getPercentage = (rating: number) => {
    if (!rating) {
        return { selectedStars: 0, fillPercentage: 0 }
    }

    const percentPart = rating.toString().split('.')
    const fillPart = percentPart[1]
    const fillPartTransformed =
        fillPart.length === 1 ? fillPart + '0' : fillPart

    const decimalPercent = fillPart === '0' ? '0' : fillPartTransformed
    return {
        selectedStars: Number(percentPart[0]),
        fillPercentage: Number(decimalPercent),
    }
}
// eslint-disable-next-line react/display-name
export const StarRating = memo((props: StarRatingProps) => {
    const { className, onSelect, rating = 0 } = props
    const { selectedStars, fillPercentage } = getPercentage(rating)
    const [hoveredStar, setHoveredStar] = useState(selectedStars)
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars))

    const onHover = (star: number) => () => {
        if (!isSelected) {
            setHoveredStar(star)
        }
    }

    const onLeave = () => {
        if (!isSelected) {
            setHoveredStar(0)
        }
    }

    const onSelectStar = (star: number) => () => {
        if (!isSelected) {
            setHoveredStar(star)
            setIsSelected(true)
            onSelect?.(star)
        }
    }

    const cn = classNames(cls.StarRating, {}, [className])

    return (
        <div className={cn}>
            {stars.map((star) => {
                const fillId = `fill-${Math.random().toString(16).slice(2)}` // Уникальный ID для градиента
                const strokeColorWithRating = rating
                    ? '#ff3b30'
                    : 'currentColor'
                const strokeColor =
                    star <= selectedStars || (!rating && hoveredStar)
                        ? 'currentColor'
                        : strokeColorWithRating

                return (
                    <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        key={star}
                        onMouseLeave={onLeave}
                        onMouseEnter={onHover(star)}
                        onClick={onSelectStar(star)}
                        data-selected={hoveredStar >= star}
                        className={classNames(
                            cls.normal,
                            {
                                [cls.starIcon]: !isSelected,
                                [cls.hovered]: Boolean(hoveredStar >= star),
                            },
                            [],
                        )}
                    >
                        <defs>
                            <linearGradient
                                id={fillId}
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="0%"
                            >
                                <stop
                                    offset={
                                        star <= selectedStars ||
                                        (!rating && star <= hoveredStar)
                                            ? '100%'
                                            : `${fillPercentage}%`
                                    }
                                    stopColor={
                                        star <= selectedStars ||
                                        (!rating && hoveredStar)
                                            ? 'currentColor'
                                            : '#ff3b30'
                                    }
                                />
                                <stop
                                    offset={
                                        star <= selectedStars ||
                                        (!rating && hoveredStar)
                                            ? '0%'
                                            : `${fillPercentage}%`
                                    }
                                    stopColor={'transparent'}
                                />
                            </linearGradient>
                        </defs>
                        <path
                            d="M6.0879 5.61739C6.01801 5.82697 5.8207 5.96848 5.59834 5.96848H1.01667C0.514776 5.96848 0.308628 6.60806 0.717269 6.89737L4.40697 9.50964C4.59112 9.64002 4.66822 9.87432 4.59711 10.0875L3.18369 14.3247C3.0269 14.7947 3.56652 15.19 3.97258 14.9026L7.70066 12.2636C7.87982 12.1368 8.12028 12.1368 8.29942 12.2637L12.0265 14.9025C12.4326 15.19 12.9722 14.7948 12.8155 14.3248L11.4029 10.0874C11.3318 9.87429 11.4089 9.64004 11.5931 9.50968L15.2827 6.89737C15.6914 6.60805 15.4852 5.96848 14.9833 5.96848H10.4018C10.1794 5.96848 9.98209 5.82697 9.91221 5.61739L8.4896 1.35109C8.33351 0.882972 7.6666 0.88297 7.5105 1.35109L6.0879 5.61739Z"
                            fill={`url(#${fillId})`}
                            stroke={strokeColor}
                            strokeWidth="1"
                        />
                    </svg>
                )
            })}
        </div>
    )
})
