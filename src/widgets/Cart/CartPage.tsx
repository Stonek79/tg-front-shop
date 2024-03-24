'use client'
import { getTotalPrice } from '@/shared/lib/helpers/getTotalPrice'
import { useRouter } from 'next/navigation'
import { Button } from '@/shared/ui/Button/Button'
import Image from 'next/image'
import { useCartStore } from '@/entities/Cart'
import { Product } from '@/types/product'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'

export const CartPage = () => {
    const router = useRouter()
    const { t } = getTranslation('products.productItem')
    const products = useCartStore.use.cart()
    const total = getTotalPrice(products)
    const emptyCart = useCartStore.use.clearCart()
    const removeProductFromCart = useCartStore.use.removeProductFromCart()

    const clearCart = () => {
        emptyCart()
        router.replace('/products')
        console.log('Корзина очищена')
    }

    const removeFromCart = (product: Product) => {
        removeProductFromCart(product)
    }

    return products.length ? (
        <div>
            <div>
                <Button onClick={clearCart}>Очистить корзину</Button>
                <br />
                <Button onClick={() => router.back()}>Назад</Button>
            </div>
            {products.map((prod) => (
                <div style={{ maxWidth: '97vw' }} key={prod.id}>
                    <h2>{prod.title}</h2>
                    <p style={{ padding: '8px' }}>{prod.description}</p>
                    <Image
                        style={{ maxWidth: '100%' }}
                        alt={prod.title}
                        src={prod.thumbnail as string}
                        width={300}
                        height={300}
                    />
                    <h3>Цена: {prod.price} рублей</h3>
                    <br />
                    <Button
                        className="alert"
                        onClick={() => removeFromCart(prod)}
                    >
                        {t('removeFromCartBtn')}
                    </Button>
                </div>
            ))}
            <br />
            <h3>Итого: {total} рублей</h3>
            <br />
            <h3>Всего товаров: {products.length}</h3>
        </div>
    ) : (
        <div>
            <h3>Товары не выбраны</h3>
            <br />
            <Button onClick={() => router.replace('/products')}>
                К товарам
            </Button>
        </div>
    )
}
