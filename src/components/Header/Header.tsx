'use client'

import styles from "./Header.module.css";
import {Button} from "@/components/Button/Button";
import {useRouter} from "next/navigation";
import { useAddProduct } from "@/lib/hooks/useAddProduct";

export const Header = () => {
    const router = useRouter()
    const {clearCart} = useAddProduct();

    return (
        <nav className={styles.header}>
            <Button onClick={() => router.push('/')}>Главная</Button>
            <Button onClick={() => router.push('/form')}>Зарегистрироваться</Button>
            <Button onClick={() => router.push('/products')}>Товары</Button>
            <Button onClick={clearCart}>Очистить</Button>
        </nav>
    );
};
