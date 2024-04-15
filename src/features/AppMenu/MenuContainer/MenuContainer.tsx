'use client'

import cls from './MenuContainer.module.css'

import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { MenuContent } from '@/features/AppMenu/MenuContent/MenuContent'

export const MenuContainer = () => {
    const { t } = getTranslation()

    return (
        <div>
            <div className={cls.menuContainer}>
                <div className={cls.relativeFlex}>
                    <MenuContent />
                </div>
            </div>
        </div>
    )
}
