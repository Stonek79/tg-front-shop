'use client'

import { useRouter } from 'next/navigation'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { Button } from '@/shared/ui/Button'
import Image from 'next/image'
import { useFavoritesStore } from '@/entities/FavoritesProducts'
import { AddToCartButton, AddFavoriteButton } from '@/features/ProductItem'

export function FavoritesPage() {
    const router = useRouter()
    const { t } = getTranslation('products.productItem')
    const products = useFavoritesStore.use.favorites()
    const clearFavorites = useFavoritesStore.use.clearFavorites()

    const emptyFavorites = () => {
        clearFavorites()
        router.replace('/products')
    }

    return products.length ? (
        <div>
            <div>
                <Button onClick={emptyFavorites}>Очистить избранное</Button>
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
                    <div>
                        <AddToCartButton product={prod} />
                        <AddFavoriteButton product={prod} />
                    </div>
                </div>
            ))}
            <br />
            <h3>Всего отмечено товаров: {products.length}</h3>
        </div>
    ) : (
        <div>
            <h3>Нет любимых товаров</h3>
            <br />
            <Button onClick={() => router.replace('/products')}>
                Выбрать товары
            </Button>
        </div>
    )
}
