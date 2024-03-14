'use client'
import { Product } from '@/types/product'
import { getTotalPrice } from '@/shared/lib/helpers/getTotalPrice'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/shared/ui/Button/Button'

export const CartPage = () => {
    const router = useRouter()
    const [products, setProducts] = useState<Product[]>([])
    const total = getTotalPrice(products)

    useEffect(() => {
        const prods: Product[] = JSON.parse(localStorage.getItem('cart')!)
        setProducts(prods)
    }, [])

    return products.length ? (
        <div>
            <Button onClick={() => router.back()}>Назад</Button>
            {products.map((prod) => {
                return (
                    <div style={{ maxWidth: '97vw' }} key={prod.id}>
                        <h2>{prod.title}</h2>
                        <p style={{ padding: '8px' }}>{prod.description}</p>
                        <img
                            style={{ maxWidth: '100%' }}
                            alt={prod.title}
                            src={prod.thumbnail}
                        />
                        <h3>Цена: {prod.price} рублей</h3>
                        <br />
                    </div>
                )
            })}
            <br />
            <h3>Итого: {total} рублей</h3>
            <br />
            <h3>Всего товаров: {products.length}</h3>
        </div>
    ) : (
        <h3>Товары не выбраны</h3>
    )
}
