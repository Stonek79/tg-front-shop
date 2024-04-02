import cls from './HeaderLogo.module.css'
import Link from 'next/link'

export const HeaderLogo = () => (
    <Link className={cls.headerLogo} href={'/'} aria-label="aria-to-main-link">
        <h4>RUS PLUS</h4>
    </Link>
)
