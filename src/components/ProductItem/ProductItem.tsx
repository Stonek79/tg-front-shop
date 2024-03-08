'use client'
import styles from './ProductItem.module.css';
import {Product} from "@/types/product";
import {Button} from "@/components/Button/Button";
import {useAddProduct} from "@/lib/hooks/useAddProduct";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode, Zoom } from 'swiper/modules';
import SwiperCore from 'swiper/core';
import { useState } from 'react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';

SwiperCore.use([Navigation, Thumbs, FreeMode, Zoom]);

interface ProductItemProps {
    product: Product
    className?: string
}

export const ProductItem = ({product, className}: ProductItemProps) => {
    const router = useRouter()
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const {onAdd} = useAddProduct();

    const onAddHandler = () => {
        onAdd(product);
    }

    return (
        <div className={styles.productItem + ' ' + className}>
            <Button onClick={() => router.back()}>Назад</Button>
            <div className={styles.productWrapper}>
                {product.images && <>
                    <Swiper
                        spaceBetween={ 10 }
                        loop={ true }
                        zoom={ true }
                        navigation={ true }
                        thumbs={ { swiper: thumbsSwiper } }
                        modules={ [FreeMode, Navigation, Thumbs, Zoom] }
                        pagination={ {
                            clickable: true,
                        } }
                        className={ styles.itemImg + ' mySwiper2' }
                    >
                        { product.images?.map((image, index) => (
                            <SwiperSlide key={ index }>
                                    <img alt='Product image' src={ image }/>
                            </SwiperSlide>
                        )) }
                    </Swiper>
                    {product.images.length > 1 && <Swiper
                        // @ts-ignore
                        onSwiper={ setThumbsSwiper }
                        loop={ true }
                        spaceBetween={ 10 }
                        slidesPerView={ product?.images?.length > 4 ? 4 : product?.images?.length }
                        freeMode={ true }
                        watchSlidesProgress={ true }
                        modules={ [FreeMode, Navigation, Thumbs] }
                        className={ styles.itemImgThumbs + " mySwiper" }
                    >
                        { product.images?.map((image, index) => (
                            <SwiperSlide key={ index }>
                                <img alt='Product image' src={ image }/>
                            </SwiperSlide>
                        )) }
                    </Swiper> }
                </>
            }
                <div className={styles.productDescription}>
                    <div className={styles.title}><span>Название:</span> {product.title}</div>
                    <div className={styles.description}><span>Описание:</span> {product.description}</div>
                    <div className={styles.price}>
                        <span>Стоимость: <b>{product.price}</b></span>
                    </div>
                </div>
            </div>
            <Button className={styles.addBtn} onClick={onAddHandler}>
                Добавить в корзину
            </Button>
        </div>
    );
};
