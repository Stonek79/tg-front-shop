import React from 'react'
import Image from 'next/image'
import cls from './CarouselThumbsButton.module.css'
import { classNames } from '@/shared/lib/helpers/classNames'

type PropType = {
    selected: boolean
    onClick: () => void
    slide: string
}

export const ThumbButtons = (props: PropType) => {
    const { selected, slide, onClick } = props
    const cn = classNames(cls.thumbsSlide, { [cls.selected]: selected })

    return (
        <div className={cn}>
            <button
                onClick={onClick}
                type="button"
                className={cls.thumbsSlideItem}
            >
                <Image
                    className={cls.thumbsImg}
                    src={slide}
                    alt={slide}
                    width={60}
                    height={60}
                />
            </button>
        </div>
    )
}
