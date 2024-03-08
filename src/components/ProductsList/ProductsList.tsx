'use client'

import styles from './ProductsList.module.css';
import React, { Suspense, useCallback, useEffect, useState } from "react";
import {useTgApp} from "@/lib/hooks/useTgApp";
import {useAddProduct} from "@/lib/hooks/useAddProduct";
import {ProductPreview} from "@/components/ProductItem/ProductPreview";
import {Product} from "@/types/product";
import {productsUrl} from "@/lib/consts/products";
import {useInView} from "react-intersection-observer";
import { fetcher } from "@/lib/api/fetcher";
import useSWRInfinite from "swr/infinite";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import { getTotalPrice } from "@/lib/helpers/getTotalPrice";

interface ProductsListProps {
    products: Product[]
    search?: string | undefined
    limit?: number
}

export const ProductsList = (props: ProductsListProps) => {
    const { products: initialProducts, search = '', limit = 10 } = props
    const {tg, loaded} = useTgApp();
    const { onSendData } = useAddProduct();

    const [products, setProducts] = useState(initialProducts)
    const [canTrigger, setCanTrigger] = useState(true)
    const [ref, inView] = useInView()


    const {
        data,
        size,
        setSize,
        isLoading
    } = useSWRInfinite(
        (index) =>
            `${productsUrl}?search=${search}&limit=${limit}&skip=${
                index * limit
            }`,
        fetcher,
        { parallel: true, revalidateOnFocus: false, revalidateAll: false, revalidateOnMount: false }
    );


    useEffect(() => {
        if (!isLoading && data) {
            const newProducts = data.flatMap(({ products }: { products: Product[] }) => products)
            if (data[0].total === newProducts.length) {
                setCanTrigger(false)
            }
            setProducts(newProducts)
        }
    }, [data, isLoading])

    useEffect(() => {
        loaded && tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            loaded && tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData, loaded])

    useEffect( () => {
        if (inView) {
             setSize(size + 1)
        }
    }, [inView])

    return (
        <div className={styles.wrapper}>
            <div className={styles.list}>
                <ErrorBoundary>
                    <Suspense fallback={<h1>Загрузка...</h1>}>
                        {products.map(item => (
                            <ProductPreview
                                key={item.id}
                                product={item}
                                className={styles.item}
                            />
                        ))}
                    </Suspense>
                </ErrorBoundary>
            </div>
            {canTrigger && <div className={ styles.trigger } ref={ ref }/> }
        </div>
    );
};