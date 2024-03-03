import {Product} from "@/types/product";

export const getTotalPrice = (items: Product[] = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}
