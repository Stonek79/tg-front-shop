import React, { useCallback, useEffect, useState } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import {
    DotButton,
    useDotButton,
} from '../CarouselDotButtons/CarouselDotButtons'
import {
    PrevButton,
    NextButton,
    usePrevNextButtons,
} from '../CarouselArrowButtons/CarouselArrowButtons'
import useEmblaCarousel from 'embla-carousel-react'
import { ThumbButtons } from '../CarouselThumbsButton/CarouselThumbsButton'
import Image from 'next/image'
import cls from './CarouselComponent.module.css'
import { Dialog } from '@/shared/ui/Dialog'
import { Button } from '@/shared/ui/Button'

type ViewportSize = 100 | 200 | 300 | 400 | 500 | 600 | 700
type Direction = 'left' | 'right' | 'top' | 'bottom'
type BorderRadius = 8 | 16 | 24 | 32
type DotButtonSize = 8 | 16 | 24

type PropType = {
    slides: string[]
    options?: EmblaOptionsType
    hasThumbs?: boolean
    hasDots?: boolean
    hasButtons?: boolean
    hasImageDialog?: boolean
    viewportSize?: ViewportSize
    direction?: Direction
    borderRadius?: BorderRadius
    dotButtonSize?: DotButtonSize
    className?: string
}

export const CarouselComponent = (props: PropType) => {
    const {
        className,
        slides,
        hasThumbs = true,
        hasDots = true,
        hasButtons = true,
        hasImageDialog = false,
        viewportSize = 600,
        direction = 'bottom',
        borderRadius = 16,
        dotButtonSize = 16,
        options,
    } = props
    const [isOpenDialog, setIsOpenDialog] = useState(false)
    const [selectedThumbIndex, setSelectedThumbIndex] = useState(0)
    const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options)
    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
        containScroll: 'keepSnaps',
        dragFree: true,
        axis: direction === 'left' || direction === 'right' ? 'y' : 'x',
        loop: true,
    })

    const { selectedIndex, scrollSnaps, onDotButtonClick } =
        useDotButton(emblaMainApi)

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick,
    } = usePrevNextButtons(emblaMainApi)

    const onThumbClick = useCallback(
        (index: number) => {
            if (!emblaMainApi || !emblaThumbsApi) return
            emblaMainApi.scrollTo(index)
        },
        [emblaMainApi, emblaThumbsApi],
    )

    const onSelect = useCallback(() => {
        if (!emblaMainApi || !emblaThumbsApi) return
        setSelectedThumbIndex(emblaMainApi.selectedScrollSnap())
        emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
    }, [emblaMainApi, emblaThumbsApi, setSelectedThumbIndex])

    useEffect(() => {
        if (!emblaMainApi) return
        onSelect()
        emblaMainApi.on('select', onSelect)
        emblaMainApi.on('reInit', onSelect)
    }, [emblaMainApi, onSelect])

    return (
        <>
            {hasImageDialog && (
                <Dialog
                    onOpenToggle={() => setIsOpenDialog((prev) => !prev)}
                    isOpen={isOpenDialog}
                    isModal
                >
                    <Image
                        src={slides[selectedIndex]}
                        alt={slides[selectedIndex]}
                        width={viewportSize}
                        height={viewportSize}
                        className={cls.dialogImage}
                    />
                </Dialog>
            )}
            <section
                className={`${cls.carouselContainer} ${cls[direction]} ${className}`}
            >
                <div
                    className={`${cls.viewport} ${cls[`s${viewportSize}`]} ${cls[`br${borderRadius}`]}`}
                    ref={emblaMainRef}
                >
                    <div className={cls.slideContainer}>
                        {slides.map((slide, index) => (
                            <Button
                                key={index}
                                variant="clear"
                                onClick={() => setIsOpenDialog((prev) => !prev)}
                            >
                                <div className={cls.slideItem}>
                                    <img
                                        src={slide}
                                        alt={slide}
                                        className={cls.slideImage}
                                    />
                                </div>
                            </Button>
                        ))}
                    </div>
                    {hasButtons && (
                        <PrevButton
                            className={cls.arrowButtonsPrev}
                            onClick={onPrevButtonClick}
                            disabled={prevBtnDisabled}
                        />
                    )}
                    {hasButtons && (
                        <NextButton
                            className={cls.arrowButtonsNext}
                            onClick={onNextButtonClick}
                            disabled={nextBtnDisabled}
                        />
                    )}
                    {hasDots && (
                        <div className={cls.dotsWrapper}>
                            <div className={cls.dotsContainer}>
                                {scrollSnaps.map((_, index) => (
                                    <DotButton
                                        key={index}
                                        onClick={() => onDotButtonClick(index)}
                                        className={`${cls.dotButton} ${cls[`dbs${dotButtonSize}`]} ${index === selectedIndex ? cls.selected : ''}`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className={cls.carouselControls}>
                    {hasThumbs && (
                        <div
                            className={cls.thumbsViewport}
                            ref={emblaThumbsRef}
                        >
                            <div
                                className={`${cls.thumbsContainer} ${cls[direction]}`}
                            >
                                {slides.map((slide, index) => (
                                    <ThumbButtons
                                        slide={slide}
                                        key={index}
                                        onClick={() => onThumbClick(index)}
                                        selected={index === selectedThumbIndex}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}
