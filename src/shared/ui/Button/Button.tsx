import { ReactNode } from 'react'
import './Button.css'

interface ButtonProps {
    className?: string
    onClick?: () => void
    children?: ReactNode
}
export const Button = (props: ButtonProps) => {
    return <button {...props} className="customButton" />
}
