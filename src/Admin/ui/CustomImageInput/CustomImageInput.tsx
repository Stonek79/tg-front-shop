import { ImageInputProps, RaRecord, useRecordContext } from 'react-admin'
import { SxProps } from '@mui/material'
import { ReactElement } from 'react'
import { Product } from '@/types/product'
import { SingleImageInput } from './SingleImageInput'
import { MultipleImageInput } from './MultipleImageInput'

interface CustomImageInputProps extends Omit<ImageInputProps, 'children'> {
    source: string
    multiple?: boolean
    style?: SxProps
    label?: string | ReactElement | undefined
    placeholder?: string
    imageNames?: string[]
    prefix?: string
    postfix?: string
    disabled?: boolean
    record?: RaRecord
}

export const CustomImageInput = ({
    prefix,
    postfix,
    source,
    multiple = false,
    style = {},
    label = false,
    placeholder = '',
    disabled = false,
    record,
}: CustomImageInputProps) => {
    const currentRecord = useRecordContext<Product>()
    const usedRecord = record ?? currentRecord
    // TODO fix prefix and postfix for multiple
    if (multiple) {
        return (
            <MultipleImageInput
                label={label}
                source={source}
                prefix={prefix}
                style={style}
                placeholder={placeholder}
                disabled={disabled}
            />
        )
    }
    return (
        <SingleImageInput
            label={label}
            source={source}
            style={style}
            record={usedRecord}
            placeholder={placeholder}
            prefix={prefix}
            postfix={postfix}
            disabled={disabled}
        />
    )
}
