'use client'
import {useCallback, useState} from "react";
import {Product} from "@/types/product";
import {useTgApp} from "@/lib/hooks/useTgApp";
import {getTotalPrice} from "@/lib/helpers/getTotalPrice";

export const useAddProduct = () => {
    const [addedItems, setAddedItems] = useState<Product[]>([]);
    const {tg, loaded, queryId} = useTgApp();

    const onSendData = useCallback(async () => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        await fetch('http://85.119.146.179:8000/web-data', {
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
        } else {
            localStorage.setItem('cart', JSON.stringify([product]));
            setAddedItems([product])
        }

    }

    return {
        addedItems,
        onAdd,
        onSendData
    }
}
