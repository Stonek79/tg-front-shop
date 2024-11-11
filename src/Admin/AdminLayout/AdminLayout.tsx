import { Layout, LayoutProps } from 'react-admin'
import { AdminMenu } from '../AdminMenu/AdminMenu'
import { MyAppBar } from '@/Admin/MyAppBar/MyAppBar'

export const AdminLayout = (props: LayoutProps) => (
    <Layout
        sx={{ width: '100vw', '.RaLayout-appFrame': { width: '100vw' } }}
        {...props}
        menu={AdminMenu}
        appBar={MyAppBar}
    />
)
