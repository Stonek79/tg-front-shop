import {ReactNode} from 'react';
import styles from './Button.module.css';

interface ButtonProps {
    className?: string
    onClick?: () => void
    children?: ReactNode
}
export const Button = (props: ButtonProps) => {
    return (
        <button {...props} className={styles.button + ' ' + props.className}/>
    );
};
