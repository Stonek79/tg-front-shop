import { Product } from '@/types/product'

export const getTotalPrice = (items: Product[] = []) =>
    items.reduce((acc, item) => (acc += item.price), 0)
