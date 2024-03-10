'use client'
import { Product } from "@/types/product";
import { getTotalPrice } from "@/lib/helpers/getTotalPrice";

export const CartPage = () => {
    const products: Product[] = JSON.parse(localStorage.getItem('cart') || '[]')
    const total = getTotalPrice(products)
    return <div>
        {
        products.map((prod) => {
            return <div>
                <ul>
                    <li>{prod.title}</li>
                    <li>{prod.description}</li>
                    <li><img alt={prod.title} src={prod.thumbnail} /> </li>
                    <li>{prod.price}</li>
                </ul>
            </div>
        })
    }
        <h3>Итого: ` ${total}`</h3>
        <h3>Всего товаров: ` ${products.length}`</h3>
    </div>

}
