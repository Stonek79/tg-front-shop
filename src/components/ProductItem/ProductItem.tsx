'use client'
import styles from './ProductItem.module.css';
import {Product} from "@/types/product";
import {Button} from "@/components/Button/Button";
import {useAddProduct} from "@/lib/hooks/useAddProduct";
import { Carousel } from "@/components/Carousel/Carousel";
import { useRouter, useSearchParams } from "next/navigation";

interface ProductItemProps {
    product: Product
    className?: string
    // onAdd: (product: Product) => void
}
export const ProductItem = ({product, className}: ProductItemProps) => {
    const router = useRouter()
    const {onAdd} = useAddProduct();

    const onAddHandler = () => {
        onAdd(product);
    }

    return (
        <div className={styles.productItem + ' ' + className}>
            <Button onClick={() => router.back()}>Назад</Button>
            <div className={styles.productWrapper}>
                {/*<Image alt='Product image' src={product.thumbnail || ''} width={100} height={100} className={styles.itemImg} priority/>*/}
                <Carousel slides={product.images || []} height={200} width={200} options={{ loop: true }} />
                <div className={styles.productDescription}>
                    <div className={styles.title}><span>Название:</span> {product.title}</div>
                    <div className={styles.description}><span>Описание:</span> {product.description}</div>
                    <div className={styles.price}>
                        <span>Стоимость: <b>{product.price}</b></span>
                    </div>
                </div>
            </div>
            <Button className={styles.addBtn} onClick={onAddHandler}>
                Добавить в корзину
            </Button>
        </div>
    );
};
