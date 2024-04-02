import { ReactNode } from 'react'
import cls from './Button.module.css'
import { classNames } from '@/shared/lib/helpers/classNames'

interface ButtonProps {
    className?: string
    onClick?: () => void
    children?: ReactNode
    variant?: 'alert' | 'clear' | 'standart'
}

export const Button = (props: ButtonProps) => {
    const { className, variant, ...rest } = props
    const mods = {
        [cls.alert]: variant === 'alert',
        [cls.clear]: variant === 'clear',
        [cls.standart]: variant === 'standart',
    }
    const buttonClassName = classNames(cls.customButton, mods, [className])
    return <button {...rest} className={buttonClassName} />
}
