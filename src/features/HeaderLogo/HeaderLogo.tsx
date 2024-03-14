import './HeaderLogo.css'
import Link from 'next/link'

export const HeaderLogo = () => {
    return (
        <Link className="header_logo" href={'/'} aria-label={'Главная'}>
            <h2>RUS PLUS</h2>
        </Link>
    )
}
