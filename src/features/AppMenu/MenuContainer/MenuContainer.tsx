'use client'

import cls from './MenuContainer.module.css'
import { MenuContent } from '@/features/AppMenu'

export const MenuContainer = () => (
    <div>
        <div className={cls.menuContainer}>
            <div className={cls.relativeFlex}>
                <MenuContent />
            </div>
        </div>
    </div>
)
