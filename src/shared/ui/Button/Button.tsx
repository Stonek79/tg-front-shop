import { ReactNode } from 'react'
import cls from './Button.module.css'
import { classNames } from '@/shared/lib/helpers/classNames'

type Variant = 'alert' | 'clear' | 'standard' | 'transparent'

interface ButtonProps {
    className?: string
    onClick?: () => void
    children?: ReactNode
    variant?: Variant
}

export const Button = (props: ButtonProps) => {
    const { className, variant, ...rest } = props
    const mods = {
        [cls.alert]: variant === 'alert',
        [cls.clear]: variant === 'clear',
        [cls.standart]: variant === 'standard',
        [cls.transparent]: variant === 'transparent',
    }

    const buttonClassName = classNames(cls.customButton, mods, [className])
    return <button {...rest} className={buttonClassName} />
}
