import './HeaderLogo.css'
import Link from 'next/link'

export const HeaderLogo = () => (
    <Link className="header_logo" href={'/'} aria-label="aria-to-main-link">
        <h4>RUS PLUS</h4>
    </Link>
)
