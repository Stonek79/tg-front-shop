import { Box, SxProps, TextField } from '@mui/material'
import { memo, useCallback, useEffect, useState } from 'react'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { useFormContext } from 'react-hook-form'
import { debounce } from '@/shared/lib/helpers/debaunce'
import type { Image as RecordImage } from '@/types/product'
import { useNotify } from 'react-admin'
import { transliterate } from '@/shared/lib/helpers/transliterate'
import { useNamesStore } from '@/shared/state/namesList'

interface CustomTextFieldProps {
    isNew: boolean
    name: string
    handleAddFieldValue: (value: string) => void
    style?: SxProps
}
// eslint-disable-next-line react/display-name
const CustomTextField = memo((props: CustomTextFieldProps) => {
    const { isNew, handleAddFieldValue, name, style } = props
    const { t } = getTranslation()

    const { notify } = useNotify()
    const [title, setTitle] = useState('')
    const debouncedHandleAddFieldValue = useCallback(
        debounce(handleAddFieldValue, 1000),
        [handleAddFieldValue],
    )

    const handleChange = (event) => {
        if (!isNew) return
        const value = transliterate(event?.target?.value)
        setTitle(value)
        debouncedHandleAddFieldValue(value)
    }

    const handleClickTextField = () => {
        !isNew &&
            notify(`${t('warnings.copied')}: ${title}`, {
                type: 'warning',
                autoHideDuration: 2000,
                anchorOrigin: { vertical: 'top', horizontal: 'center' },
            })
        !isNew && navigator.clipboard.writeText(title)
    }

    useEffect(() => {
        setTitle(name)
    }, [name])

    return (
        <TextField
            sx={{
                caretColor: !isNew ? 'transparent' : undefined,
                outline: !isNew ? 'none' : undefined,
                opacity: !isNew ? 0.5 : 1,
                width: '100%',
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        border: !isNew ? 'none' : undefined,
                    },
                    '& .MuiInputBase-input': {
                        p: !isNew ? 0 : undefined,
                        cursor: !isNew ? 'pointer' : undefined,
                        pointerEvents: !isNew ? 'none' : 'auto',
                        textAlign: !isNew ? 'center' : undefined,
                    },
                },
            }}
            onClick={() => handleClickTextField()}
            variant="outlined"
            size="small"
            value={title}
            title={title}
            onChange={handleChange}
            placeholder="Enter image title"
        />
    )
})
interface CustomImageProps {
    source: string
    style?: SxProps
    index?: number
    record: RecordImage & Record<'id', string>
}

// eslint-disable-next-line react/display-name
export const CustomImage = memo(
    ({ record, style, index, source }: CustomImageProps) => {
        const { namesList } = useNamesStore()
        const { t } = getTranslation()
        const { setError, clearErrors, setValue } = useFormContext()
        const isNew = !!record?.rawFile

        const handleAddFieldValue = (value: string) => {
            const name =
                index && !isNaN(index)
                    ? `${source}.${index}.title`
                    : `${source}.title`

            const errorName =
                index && !isNaN(index) ? `${source}.${index}` : source

            if (value.trim().length < 5) {
                setError(
                    errorName,
                    {
                        message: t('errors.imageTitleMinLength'),
                        type: 'min length',
                    },
                    { shouldFocus: true },
                )
            } else if (value.trim().length > 25) {
                setError(
                    errorName,
                    {
                        message: t('errors.imageTitleMaxLength'),
                        type: 'max length',
                    },
                    { shouldFocus: true },
                )
            } else if (
                namesList['ImageList']?.includes(value.trim() as string)
            ) {
                setError(
                    errorName,
                    {
                        message: `${value} - ${t('errors.imageTitleExists')}`,
                        type: 'same image name',
                    },
                    { shouldFocus: true },
                )
            } else {
                clearErrors(errorName)

                setValue(name, value.trim(), { shouldDirty: true })
            }
        }

        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <img
                    src={record?.src || ''}
                    alt={record?.title || ''}
                    title={record?.title || ''}
                    style={{ ...style }}
                />
                <CustomTextField
                    style={style}
                    handleAddFieldValue={handleAddFieldValue}
                    name={record.title || ''}
                    isNew={isNew}
                />
            </Box>
        )
    },
)
