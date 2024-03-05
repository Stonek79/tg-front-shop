'use client'

import styles from './ProductsList.module.css';
import React, {useCallback, useEffect, useState} from "react";
import {useTgApp} from "@/lib/hooks/useTgApp";
import {useAddProduct} from "@/lib/hooks/useAddProduct";
import {ProductPreview} from "@/components/ProductItem/ProductPreview";
import {Product} from "@/types/product";
import {getProducts} from "@/lib/actions/products";
import {productsUrl} from "@/lib/consts/products";
import {useInView} from "react-intersection-observer";

interface ProductsListProps {
    products: Product[]
    search?: string | undefined
}

export const ProductsList = (props: ProductsListProps) => {
    const { products: initialProducts, search } = props
    const {tg, loaded} = useTgApp();
    const { onSendData } = useAddProduct();
    const [products, setProducts] = useState(initialProducts)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [ref, inView] = useInView()

    const loadMoreProducts = useCallback(async () => {
        const next = page + 1
        const prod = await getProducts(productsUrl, { search, page: next })

        setLoading(false)
        if (prod?.length) {
            setPage(next)
            setProducts((prev: Product[] | undefined) => [
                ...(prev?.length ? prev : []),
                ...prod
            ])
        }
    }, [page, search])

    useEffect(() => {
        loaded && tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            loaded && tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData, loaded])

    useEffect(() => {
        if (inView) {
            setLoading(true)
            loadMoreProducts().finally(() => setLoading(false))
        }
    }, [inView])


    return (
        <div className={styles.wrapper}>
            <div className={styles.list}>
                {products.map(item => (
                    <ProductPreview
                        key={item.id}
                        product={item}
                        className={styles.item}
                    />
                ))}
            </div>
            <div className={styles.trigger} ref={ref} >
                {loading && <span className='sr-only'>Loading...</span>}
            </div>
        </div>
    );
};
