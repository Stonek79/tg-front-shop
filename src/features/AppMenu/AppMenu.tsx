'use client'

import Image from 'next/image'

export const AppMenu = () => {
    // TODO fix styles
    const styles = {
        width: 50,
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--tg-theme-text-color)',
    }
    return (
        <div>
            <button style={styles}>
                <Image
                    src="/img/burger-menu.svg"
                    alt="header-menu-button"
                    width={24}
                    height={24}
                />
            </button>
        </div>
    )
}
