import { memo, ReactNode, SyntheticEvent, useEffect, useState } from 'react'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { Box, Tab, Tabs } from '@mui/material'
import { useTabState } from '@/shared/state/productTabState'
import { Orders } from '@/Admin/orders'
import { Reviews } from '@/Admin/reviews'

// eslint-disable-next-line react/display-name
export const OrdersTab = memo(() => <Orders />)

// eslint-disable-next-line react/display-name
export const ReviewsTab = memo(() => <Reviews />)

interface TabPanelProps {
    children?: ReactNode
    index: number
}

// eslint-disable-next-line react/display-name
export const CustomTabPanel = memo((props: TabPanelProps) => {
    const { children, index, ...other } = props
    const [isMounted, setIsMounted] = useState(false)
    const value = useTabState.use.value()

    useEffect(() => {
        setIsMounted(true)
    }, [])

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            style={{ width: '100%' }}
            {...other}
        >
            {isMounted && (
                <Box hidden={value !== index} sx={{ p: 3, width: '100%' }}>
                    {children}
                </Box>
            )}
        </div>
    )
})

// eslint-disable-next-line react/display-name
export const TabsList = memo(({ isCreate }: { isCreate?: boolean }) => {
    const { t } = getTranslation()
    const value = useTabState.use.value()
    const hasTitle = useTabState.use.title()
    const setValue = useTabState.use.setValue()

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    return (
        <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="tabs product"
        >
            <Tab
                label={t('product.mainInfo')}
                id="simple-tab-0"
                aria-controls="simple-tabpanel-0"
            />
            <Tab
                label={`${t('product.category')}/${t('product.color')}/${t('product.size')}`}
                id="simple-tab-1"
                aria-controls="simple-tabpanel-1"
                disabled={!hasTitle && isCreate}
            />
            <Tab
                label={`${t('product.price')}/${t('product.rating')}/${t('product.stock')}`}
                id="simple-tab-2"
                aria-controls="simple-tabpanel-2"
                disabled={!hasTitle && isCreate}
            />
            <Tab
                label={t('product.status')}
                id="simple-tab-3"
                aria-controls="simple-tabpanel-3"
                disabled={!hasTitle && isCreate}
            />
            <Tab
                label={t('product.images')}
                id="simple-tab-4"
                aria-controls="simple-tabpanel-4"
                disabled={!hasTitle && isCreate}
            />
            <Tab
                label={t('product.characteristics')}
                id="simple-tab-5"
                aria-controls="simple-tabpanel-5"
                disabled={!hasTitle && isCreate}
            />
            {!isCreate && (
                <Tab
                    label={t('product.orders')}
                    id="simple-tab-6"
                    aria-controls="simple-tabpanel-6"
                />
            )}
            {!isCreate && (
                <Tab
                    label={t('product.reviews')}
                    id="simple-tab-7"
                    aria-controls="simple-tabpanel-7"
                />
            )}
        </Tabs>
    )
})
