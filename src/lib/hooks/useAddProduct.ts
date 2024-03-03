import {useCallback, useState} from "react";
import {Product} from "@/types/product";
import {useTgApp} from "@/lib/hooks/useTgApp";
import {getTotalPrice} from "@/lib/helpers/getTotalPrice";

export const useAddProduct = () => {
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

    return {
        addedItems,
        onAdd,
        onSendData
    }
}
