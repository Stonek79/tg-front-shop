'use client'
import { useCallback, useEffect, useState } from "react";
import {Product} from "@/types/product";
import {useTgApp} from "@/lib/hooks/useTgApp";
import {getTotalPrice} from "@/lib/helpers/getTotalPrice";
import { fetcher } from "@/lib/api/fetcher";

export const useAddProduct = () => {
    const [addedItems, setAddedItems] = useState<Product[]>([]);
    const {tg, loaded, queryId} = useTgApp();

    const byProducts = useCallback(async () => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        // await fetcher('https://45.137.152.20:8000/web-data', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Access-Control-Allow-Origin': '*',
        //         'Access-Control-Allow-Methods': 'GET, POST'
        //     },
        //     body: JSON.stringify(data)
        // })
          await fetch('http://45.137.152.20:8008/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST'
            },
            body: JSON.stringify(data)
        })
    }, [addedItems])


    const onAdd = (product: Product) => {
        const cart = localStorage.getItem('cart');
        if (cart) {
            const addedProducts: Product[] = JSON.parse(cart);
            const alreadyAdded = addedProducts.find(item => item.id === product.id);

            if (alreadyAdded) {
                  return null
            }

            const newProducts: Product[] = [...addedProducts, product];
            localStorage.setItem('cart', JSON.stringify(newProducts));

            setAddedItems(newProducts)
            console.log(newProducts)
        } else {
            localStorage.setItem('cart', JSON.stringify([product]));
            setAddedItems([product])
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить 1 товар на сумму ${ getTotalPrice([product]) }`
            })
        }

    }

    useEffect(() => {
        if (!loaded) {
            return
        }
        const goods = addedItems.length === 1 ? 'товар' : (addedItems.length > 4 ? 'товаров' : 'товара');

        if(addedItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${addedItems.length} ${goods} на сумму ${ getTotalPrice(addedItems) }`
            })
        }
    }, [addedItems, loaded])

    const clearCart = () => {
        localStorage.removeItem('cart');
        setAddedItems([]);
        console.log('Корзина очищена')
    }

    return {
        addedItems,
        onAdd,
        byProducts,
        clearCart
    }
}
