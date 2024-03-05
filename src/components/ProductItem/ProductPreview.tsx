'use client'
import styles from './ProductItem.module.css';
import {Product} from "@/types/product";
import {Button} from "@/components/Button/Button";
import Image from "next/image";
import {useAddProduct} from "@/lib/hooks/useAddProduct";
import {useRouter} from "next/navigation";

interface ProductItemProps {
    product: Product
    className?: string
    // onAdd: (product: Product) => void
}
export const ProductPreview = ({product, className}: ProductItemProps) => {
    const {onAdd} = useAddProduct();
    const router = useRouter()

    const onAddHandler = () => {
        onAdd(product);
    }

    return (
        <div className={styles.product + ' ' + className}>
            <div className={styles.productBtn} onClick={() => router.push(`/products/${product.id}`)} >
                <Image alt={product.title} src={product.thumbnail || ''} width={100} height={100} className={styles.img} priority/>
                <div className={styles.productInfo}>
                    <div className={styles.title}>{product.title}</div>
                    <div className={styles.price}>
                        <span>Цена: <b>{product.price}</b></span>
                    </div>
                </div>
            </div>
            <Button className={styles.addBtn} onClick={onAddHandler}>
                Добавить в корзину
            </Button>
        </div>
    );
};
