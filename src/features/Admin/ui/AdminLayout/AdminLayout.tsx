import { Layout, LayoutProps } from 'react-admin'
import { AdminMenu } from '../AdminMenu/AdminMenu'

export const AdminLayout = (props: LayoutProps) => (
    <Layout sx={{ width: '100vw' }} {...props} menu={AdminMenu} />
)
