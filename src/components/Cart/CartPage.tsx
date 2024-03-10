'use client'
import { Product } from "@/types/product";
import { getTotalPrice } from "@/lib/helpers/getTotalPrice";
import { useAddProduct } from "@/lib/hooks/useAddProduct";

export const CartPage = () => {
    const { addedItems} = useAddProduct()
    const products: Product[] = addedItems
    const total = getTotalPrice(products)

    return addedItems.length ?
    <div>
        {
            products.map((prod) => {
                return <div>
                    <ul>
                        <li>{ prod.title }</li>
                        <li>{ prod.description }</li>
                        <li><img alt={ prod.title } src={ prod.thumbnail }/></li>
                        <li>{ prod.price }</li>
                    </ul>
                </div>
            })
        }
        <h3>Итого: ` ${ total }`</h3>
        <h3>Всего товаров: ` ${ products.length }`</h3>
    </div> : <h3>Товары не выбраны</h3>
}
