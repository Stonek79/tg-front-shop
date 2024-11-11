import { Product } from '@/types/product'

export type Category = {
    id: number
    name: string
    childrenIds: number[]
    children?: Category[]
    parentIds: number[]
    parents?: Category[]
    image?: string
    products: Product[]
}
