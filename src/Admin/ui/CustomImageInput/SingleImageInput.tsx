import { Box, SxProps, Typography } from '@mui/material'
import { ReactElement, useEffect, useState } from 'react'
import { useNamesStore } from '@/shared/state/namesList'
import { useController, useFormContext } from 'react-hook-form'
import { transliterate } from '@/shared/lib/helpers/transliterate'
import { DropdownImageInput } from '../DropdownImageInput/DropdownImageInput'
import { CustomImage } from './CustomImage'
import { ErrorsField } from './ErrorsField'
import { RaRecord } from 'react-admin'

interface SingleImageInputProps {
    record?: RaRecord
    source: string
    placeholder?: string
    style?: SxProps
    label?: string | ReactElement | undefined
    prefix?: string
    postfix?: string
    disabled?: boolean
}

export const SingleImageInput = ({
    record,
    source,
    placeholder,
    style,
    label,
    prefix,
    disabled,
    postfix,
}: SingleImageInputProps) => {
    const { hasName } = useNamesStore()

    const { setValue, control, getValues } = useFormContext()
    const {
        field,
        fieldState: { error },
    } = useController({
        control,
        defaultValue: record?.[source] || '',
        name: source,
        rules: { required: true },
    })

    const [originalTitle, setOriginalTitle] = useState('')

    useEffect(() => {
        const value = getValues()[source]
        if (value) {
            setOriginalTitle(value.title)
        }
    }, [])

    const isNew = !!field?.value?.rawFile

    useEffect(() => {
        if (!isNew) return
        const value = getValues()[source]

        const withPrefix = prefix ? `${transliterate(prefix)}-` : ''
        const withPostfix = postfix ? `-${transliterate(postfix)}` : ''
        const title = `${withPrefix}${transliterate(originalTitle)}${withPostfix}`

        setValue(source, {
            ...value,
            title,
        })
    }, [postfix, prefix])

    const handleOneImage = (event) => {
        const image = Array.from(event.target.files)[0]
        const imageName = image.name.split('.')[0]
        console.log(imageName, prefix, postfix, 'IMAGE')
        const withPrefix = prefix ? `${transliterate(prefix)}-` : ''
        const withPostfix = postfix ? `-${transliterate(postfix)}` : ''
        let title = `${withPrefix}${transliterate(imageName)}${withPostfix}`

        if (hasName(title, 'ImageList')) {
            title = title + '-1'
        }

        setValue(source, {
            rawFile: image,
            src: URL.createObjectURL(image as File),
            title,
        })
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                gap: 2,
            }}
        >
            <DropdownImageInput
                source={source}
                onChangeEvent={handleOneImage}
                placeholder={placeholder}
                disabled={disabled}
            />
            {label && (
                <Typography sx={{ alignSelf: 'center' }}>{label}</Typography>
            )}
            <Box>
                {field?.value?.src && (
                    <CustomImage
                        style={style}
                        record={field?.value}
                        source={source}
                    />
                )}
                {error && <ErrorsField source={source} errors={error} />}
            </Box>
        </Box>
    )
}
