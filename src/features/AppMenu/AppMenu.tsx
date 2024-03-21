import './AppMenu.css'
import React from 'react'
import Image from 'next/image'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'

export const AppMenu = () => {
    const { t } = getTranslation()

    return (
        <div>
            <button className="app_menu_btn">
                <Image
                    src="/img/burger-menu.svg"
                    alt={t('imgAlt')}
                    width={24}
                    height={24}
                />
            </button>
        </div>
    )
}
