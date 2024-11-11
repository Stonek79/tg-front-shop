import { useRecordContext } from 'react-admin'
import { Avatar } from '@mui/material'
import { apiUrl } from '@/shared/lib/actions/dataProviders'

export const CustomImageField = ({
    source,
    size = 'normal',
    sx = {},
}: {
    source: string
    size?: 'small' | 'normal'
    sx?: React.CSSProperties
}) => {
    const record = useRecordContext()
    const s = size === 'small' ? { width: 24, height: 24 } : {}
    if (!record) return null
    return (
        <Avatar
            src={`${apiUrl}/images/${record[source]}`}
            sx={{ ...s, ...sx }}
        />
    )
}
