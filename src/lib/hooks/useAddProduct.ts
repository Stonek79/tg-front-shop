'use client'
import {useCallback, useState} from "react";
import {Product} from "@/types/product";
import {useTgApp} from "@/lib/hooks/useTgApp";
import {getTotalPrice} from "@/lib/helpers/getTotalPrice";

export const useAddProduct = () => {
    const [addedItems, setAddedItems] = useState<Product[]>([]);
    const {tg, loaded, queryId} = useTgApp();

    const byProducts = useCallback(async () => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        return await fetch('http://45.137.152.20:8000/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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

            if (newProducts.length === 0) {
                tg.MainButton.hide();
            } else {
                tg.MainButton.show();
                tg.MainButton.setParams({
                    text: `Купить ${ getTotalPrice(newProducts) }`
                })
            }

            setAddedItems(newProducts)
            console.log(newProducts)
        } else {
            localStorage.setItem('cart', JSON.stringify([product]));
            setAddedItems([product])
        }
    }

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
