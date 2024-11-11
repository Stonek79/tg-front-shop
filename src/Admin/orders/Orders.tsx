import { memo } from 'react'
import { useRecordContext } from 'react-admin'
import { Product } from '@/types/product'
import { Box } from '@mui/material'

// eslint-disable-next-line react/display-name
export const Orders = memo(() => {
    const record = useRecordContext<Product>()
    return (
        <Box>
            <ul>
                Orders:{' '}
                {record?.orders.map((order) => (
                    <li key={order.orderId}>{order.orderId}</li>
                ))}
            </ul>
        </Box>
    )
})
