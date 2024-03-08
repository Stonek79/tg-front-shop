'use client'

import styles from "./Header.module.css";
import {useTgApp} from "@/lib/hooks/useTgApp";
import {Button} from "@/components/Button/Button";
import {useRouter} from "next/navigation";

export const Header = () => {
    const router = useRouter()
    const {tg} = useTgApp()

    const onToggle = () => {
        if (tg.MainButton.isVisible) {
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
        }
    }

    return (
        <nav className={styles.header}>
            <Button onClick={() => router.push('/')}>Главная</Button>
            <Button className={styles.button} onClick={onToggle}>Меню</Button>
            <Button onClick={() => router.push('/form')}>Зарегистрироваться</Button>
            <Button onClick={() => router.push('/products')}>Список товаров</Button>
        </nav>
    );
};
