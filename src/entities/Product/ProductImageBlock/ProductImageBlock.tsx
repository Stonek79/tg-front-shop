'use client'

import './ProductImageBlock.css'
import SwiperCore from 'swiper/core'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs, FreeMode, Zoom } from 'swiper/modules'
import Image from 'next/image'
import { useState } from 'react'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import 'swiper/css/zoom'

SwiperCore.use([Navigation, Thumbs, FreeMode, Zoom])

export const ProductImageBlock = (images: string[] = []) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null)

    return (
        <div>
            <Swiper
                spaceBetween={10}
                loop={true}
                zoom={true}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs, Zoom]}
                pagination={{
                    clickable: true,
                }}
                className={`itemImg mySwiper2`}
            >
                {images?.map((image, index) => (
                    <SwiperSlide className="swiper-wrapper" key={index}>
                        <div className="swiper-zoom-container">
                            <Image
                                alt={'Product image' + image}
                                src={image}
                                width={850}
                                height={850}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            {images.length > 1 && (
                <Swiper
                    // @ts-ignore
                    onSwiper={setThumbsSwiper}
                    loop={true}
                    spaceBetween={10}
                    slidesPerView={images?.length > 4 ? 4 : images?.length}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className={'itemImgThumbs mySwiper'}
                >
                    {images?.map((image, index) => (
                        <SwiperSlide key={index}>
                            <Image
                                alt={'Product image' + image + index}
                                src={image}
                                width={200}
                                height={200}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    )
}
