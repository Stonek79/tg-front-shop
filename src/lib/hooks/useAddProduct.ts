'use client'
import { useCallback, useEffect, useState } from "react";
import {Product} from "@/types/product";
import {useTgApp} from "@/lib/hooks/useTgApp";
import {getTotalPrice} from "@/lib/helpers/getTotalPrice";
import { useRouter } from "next/navigation";

export const useAddProduct = () => {
    const [addedItems, setAddedItems] = useState<Product[]>([]);
    const {tg, loaded, queryId} = useTgApp();
    const router = useRouter()

    const byProducts = useCallback(async () => {
        // const data = {
        //     products: addedItems,
        //     totalPrice: getTotalPrice(addedItems),
        //     queryId,
        // }
        //   const prods = await fetch('https://stonek79.site/web-data', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data)
        //   })
        // console.log(prods, 'PRODS')

        // if (prods.status === 200) {
            router.push('/cart')
        // }
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
