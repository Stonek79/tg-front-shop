'use client'

import React, { useRef, useState, useEffect, useCallback, memo } from 'react'
import Link from 'next/link'
import cls from './CategoriesSlider.module.css'
import { useMatchMedia } from '@/shared/lib/hooks/useMatchMedia'

type CategoriesSliderProps = {
    categories: string[]
}

// eslint-disable-next-line react/display-name
// export const CategoriesSlider = memo(
//     ({ categories }: CategoriesSliderProps) => {
//         const sliderRef = useRef<HTMLDivElement>(null)
//         const [items, setItems] = useState<string[]>([])
//         const itemsCount = categories.length
//         const { isMobile } = useMatchMedia()
//         const initializeItems = () => {
//             // Добавляем начальные и конечные элементы для плавной прокрутки
//             setItems([
//                 ...categories.slice(-itemsCount),
//                 ...categories,
//                 ...categories.slice(0, itemsCount),
//             ])
//         }
//
//         const resetScrollPosition = useCallback(() => {
//             const slider = sliderRef.current
//             if (slider) {
//                 const singleBatchWidth = slider.scrollWidth / 3
//                 slider.scrollLeft = singleBatchWidth
//             }
//         }, [])
//
//         const handleScroll = useCallback(() => {
//             const slider = sliderRef.current
//             if (slider) {
//                 const singleBatchWidth = slider.scrollWidth / 3
//                 const threshold = isMobile ? 100 : 200
//
//                 if (slider.scrollLeft + threshold >= 2 * singleBatchWidth) {
//                     // Перемещаемся к начальным элементам
//                     slider.scrollLeft -= singleBatchWidth
//                 } else if (slider.scrollLeft <= threshold) {
//                     // Перемещаемся к конечным элементам
//                     slider.scrollLeft += singleBatchWidth
//                 }
//             }
//         }, [])
//
//         useEffect(() => {
//             initializeItems()
//             const slider = sliderRef.current
//             slider?.addEventListener('scroll', handleScroll)
//
//             // Сбрасываем позицию прокрутки, чтобы начать с центра
//             resetScrollPosition()
//
//             return () => {
//                 slider?.removeEventListener('scroll', handleScroll)
//             }
//         }, [categories])
//
//         return (
//             <div ref={sliderRef} className={cls.horizontalMediaScroller}>
//                 {items.map((category, index) => (
//                     <Link href={`/products/category/${category}`} key={index}>
//                         <figure>
//                             <picture>
//                                 <div className={cls.categoryItem}>
//                                     {category}
//                                 </div>
//                             </picture>
//                         </figure>
//                     </Link>
//                 ))}
//             </div>
//         )
//     },
// )

export const CategoriesSlider = ({ categories }: CategoriesSliderProps) => (
    <div className={cls.container}>
        <div className={cls.horizontalScrollingItems}>
            {categories.map((category, index) => (
                <Link href={`/products/category/${category}`} key={index}>
                    <div className={cls.horizontalScrollingItem}>
                        {category}
                    </div>
                </Link>
            ))}
        </div>
    </div>
)
