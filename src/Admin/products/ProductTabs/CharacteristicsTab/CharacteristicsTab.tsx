import { memo } from 'react'
import { useRecordContext } from 'react-admin'
import { Characteristics } from '../../Characteristics/Characteristics'
import { Product } from '@/types/product'
import { characteristics } from '@/shared/consts/characteristics'
import type { Characteristics as CharacteristicsType } from '@/types/product'

// eslint-disable-next-line react/display-name
export const CharacteristicsTab = memo(() => {
    const record = useRecordContext<Product>()

    if (!record?.characteristics) {
        return <Characteristics record={characteristics} />
    }
    const { createdAt, updatedAt, id, productId, ...rest } = record
        ?.characteristics[0] as CharacteristicsType

    return <Characteristics record={rest} />
})
