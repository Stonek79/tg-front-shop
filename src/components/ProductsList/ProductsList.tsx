'use client'
import styles from './ProductsList.module.css';
import React, { useEffect} from "react";
import {useTgApp} from "@/lib/hooks/useTgApp";
import {products} from "@/lib/consts/products";
import {useAddProduct} from "@/lib/hooks/useAddProduct";
import {ProductPreview} from "@/components/ProductItem/ProductPreview";

export const ProductsList = () => {
    const {tg, loaded, queryId} = useTgApp();
    const { onSendData } = useAddProduct();

    useEffect(() => {
        loaded && tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            loaded && tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData, loaded])

    return (
        <div className={styles.list}>
            {products.map(item => (
                <ProductPreview
                    key={item.id}
                    product={item}
                    className={styles.item}
                />
            ))}
        </div>
    );
};
