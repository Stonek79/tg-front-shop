'use client'
import { Product } from "@/types/product";
import { getTotalPrice } from "@/lib/helpers/getTotalPrice";
import { useEffect, useState } from "react";

export const CartPage = () => {
    const [products, setProducts] = useState<Product[]>([])
    const total = getTotalPrice(products)

    useEffect(() => {
        const prods: Product[] = JSON.parse(localStorage.getItem('cart')!)
        setProducts(prods)
    }, [])

    return products.length ?
    <div>
        {
            products.map((prod) => {
                return <div key={prod.id}>
                        <h2>{ prod.title }</h2>
                        <h4>{ prod.description }</h4>
                        <img alt={ prod.title } src={ prod.thumbnail }/>
                        <h3>Цена: { prod.price } рублей</h3>
                    <br/>
                </div>
            })
        }
        <br/>
        <h3>Итого: { total } рублей</h3>
        <br/>
        <h3>Всего товаров: { products.length }</h3>
    </div>
        : <h3>Товары не выбраны</h3>
}
