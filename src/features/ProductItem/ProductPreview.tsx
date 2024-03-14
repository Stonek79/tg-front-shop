'use client'
import styles from './ProductItem.module.css'
import { Product } from '@/types/product'
import { Button } from '@/shared/ui/Button/Button'
import Image from 'next/image'
import { useAddProductToCart } from '@/shared/lib/hooks/useAddProductToCart'
import Link from 'next/link'
import { Suspense } from 'react'

interface ProductItemProps {
    product: Product
    className?: string
}
export const ProductPreview = ({ product, className }: ProductItemProps) => {
    const { onAdd } = useAddProductToCart()

    const onAddHandler = () => {
        onAdd(product)
    }

    return (
        <div className={styles.product + ' ' + className}>
            <Link
                className={styles.productBtn}
                href={`/products/${product.id}`}
            >
                <Suspense fallback={<h1>Загрузка...</h1>}>
                    <Image
                        alt={product.title}
                        src={product.thumbnail || ''}
                        width={100}
                        height={100}
                        className={styles.img}
                        priority
                    />
                    <div className={styles.productInfo}>
                        <div className={styles.title}>{product.title}</div>
                        <div className={styles.price}>
                            <span>
                                Цена: <b>{product.price}</b>
                            </span>
                        </div>
                    </div>
                </Suspense>
            </Link>
            <Button className={styles.addBtn} onClick={onAddHandler}>
                Добавить в корзину
            </Button>
        </div>
    )
}
