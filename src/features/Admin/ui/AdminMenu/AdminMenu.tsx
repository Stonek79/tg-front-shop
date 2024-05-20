'use client'
import { Menu } from 'react-admin'
import ShoppingBag from '@mui/icons-material/ShoppingBag'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble'
import PeopleIcon from '@mui/icons-material/People'
import ShoppingCart from '@mui/icons-material/ShoppingCart'
import CategoryIcon from '@mui/icons-material/Category'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'

export const AdminMenu = () => {
    const { t } = getTranslation()
    return (
        <Menu sx={{ width: 200 }}>
            <Menu.Item
                to="/product"
                primaryText={t('adminPanelLinks.goods')}
                leftIcon={<ShoppingBag />}
            />
            <Menu.Item
                to="/category"
                primaryText={t('adminPanelLinks.categories')}
                leftIcon={<CategoryIcon />}
            />
            <Menu.Item
                to="/comments"
                primaryText={t('adminPanelLinks.comments')}
                leftIcon={<ChatBubbleIcon />}
            />
            <Menu.Item
                to="/users"
                primaryText={t('adminPanelLinks.users')}
                leftIcon={<PeopleIcon />}
            />
            <Menu.Item
                to="/oders"
                primaryText={t('adminPanelLinks.orders')}
                leftIcon={<ShoppingCart />}
            />
        </Menu>
    )
}
