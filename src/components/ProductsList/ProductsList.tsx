'use client'
import React, {useState} from 'react';
import styles from './ProductsList.module.css';
import {useCallback, useEffect} from "react";
import {useTgApp} from "@/lib/hooks/useTgApp";
import {Product} from "@/types/product";
import {ProductItem} from "@/components/ProductItem/ProductItem";
import {products} from "@/lib/consts/products";

const getTotalPrice = (items: Product[] = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

export const ProductsList = () => {
    const [addedItems, setAddedItems] = useState<Product[]>([]);
    const {tg, loaded, queryId} = useTgApp();

    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        fetch('http://85.119.146.179:8000/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [addedItems])

    useEffect(() => {
        loaded && tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            loaded && tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData, loaded])

    const onAdd = (product: Product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`
            })
        }
    }

    return (
        <div className={styles.list}>
            {products.map(item => (
                <ProductItem
                    key={item.id}
                    product={item}
                    onAdd={onAdd}
                    className={styles.item}
                />
            ))}
        </div>
    );
};
