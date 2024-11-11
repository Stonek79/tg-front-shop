import { Box, IconButton, SxProps, Typography } from '@mui/material'
import { ReactElement, useEffect, useState } from 'react'
import { useNamesStore } from '@/shared/state/namesList'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { transliterate } from '@/shared/lib/helpers/transliterate'
import { Image } from '@/types/product'
import { DropdownImageInput } from '../DropdownImageInput/DropdownImageInput'
import { CustomImage } from './CustomImage'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import { ErrorsField } from './ErrorsField'
import { AdminDialog } from '../Dialog/Dialog'
import { Button } from '@/shared/ui/Button'
import * as React from 'react'
import { useDelete } from 'react-admin'

interface MultipleImageInputProps {
    source: string
    placeholder?: string
    style?: SxProps
    label?: string | ReactElement | undefined
    disabled?: boolean
    prefix?: string
}

export const MultipleImageInput = ({
    source,
    placeholder,
    style,
    label,
    disabled,
    prefix,
}: MultipleImageInputProps) => {
    const { hasName } = useNamesStore()
    const { t } = getTranslation()
    const [isOpenDialog, setIsOpenDialog] = useState(false)
    const [index, setIndex] = useState(0)
    const [deleteImage] = useDelete()

    const {
        setValue,
        control,
        setError,
        clearErrors,
        formState: { errors },
    } = useFormContext()

    const { fields, remove } = useFieldArray({
        control,
        name: source,
    })

    // TODO refactor with useFieldArray
    useEffect(() => {
        if (fields.length === 0) {
            setError(source, {
                type: 'required',
                message: t('errors.imageRequired'),
            })
        } else {
            clearErrors(source)
        }
    }, [fields.length])

    const handleAddImages = (event) => {
        const files = Array.from(event.target.files)
        const newImages = files.map((file, index) => {
            const imageName = file.name.split('.')[0]
            let title =
                `${prefix ? transliterate(prefix) : ''}${prefix ? '-' : ''}${transliterate(imageName)}` ||
                ''

            if (hasName(title, 'ImageList')) {
                title = title + `-${index}`
            }

            return {
                rawFile: file,
                src: URL.createObjectURL(file as File),
                title,
            }
        })

        setValue(source, [...fields, ...newImages])
    }

    const handleDelete = (index: number) => {
        const image = fields[index] as Image & Record<'id', string>
        const isJustAddedImage = !!image?.rawFile
        if (!isJustAddedImage) {
            deleteImage(
                'images/delete',
                {
                    id: image?.title,
                },
                {
                    onSuccess: () => {
                        remove(index)
                    },
                    onError: (error) => {
                        console.log(error, 'IMAGE DELETE ERROR')
                    },
                },
            )
        } else {
            remove(index)
        }
        clearErrors(`${source}.${index}`)
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
                onChangeEvent={handleAddImages}
                placeholder={placeholder}
                multiple={true}
                disabled={disabled}
            />
            {label && (
                <Typography sx={{ alignSelf: 'center' }}>{label}</Typography>
            )}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {fields?.map((image, index) => (
                    <Box
                        sx={{
                            position: 'relative',
                            width: 'max-content',
                        }}
                        key={image.id}
                    >
                        <CustomImage
                            index={index}
                            style={style}
                            record={image}
                            source={source}
                        />
                        <IconButton
                            onClick={() => {
                                setIsOpenDialog(true)
                                setIndex(index)
                            }}
                            style={{
                                position: 'absolute',
                                top: 5,
                                right: 5,
                                color: 'red',
                            }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                ))}
            </Box>
            {errors && <ErrorsField source={source} errors={errors} />}
            <AdminDialog
                isOpenDialog={isOpenDialog}
                setIsOpenDialog={setIsOpenDialog}
                content={
                    (fields[index] as Image) && (
                        <Typography
                            sx={{
                                color: 'red',
                                textAlign: 'center',
                                width: 250,
                            }}
                        >
                            {`${t('buttons.delete')} ${(fields[index] as Image).title}?`}
                        </Typography>
                    )
                }
                actions={
                    <Box sx={{ gap: '8px', display: 'flex' }}>
                        <Button
                            onClick={() => {
                                setIsOpenDialog(false)
                            }}
                        >
                            {t('buttons.cancel')}
                        </Button>
                        <Button
                            variant="alert"
                            onClick={() => {
                                handleDelete(index)
                                setIsOpenDialog(false)
                            }}
                        >
                            {t('buttons.delete')}
                        </Button>
                    </Box>
                }
            />
        </Box>
    )
}
