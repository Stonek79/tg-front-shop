'use client'

import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { memo, useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { Avatar, Box, Container, Tooltip, Typography } from '@mui/material'
import { Category } from '@/types/categories'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import Checkbox from '@mui/material/Checkbox'
import { useStore } from 'ra-core'
import { defaultImage, imagesUrl } from '@/shared/consts/urls'
import {
    Identifier,
    RaRecord,
    useRecordContext,
    useRedirect,
} from 'react-admin'

interface CategoriesSelectorListProps {
    categories: Category[]
    categoriesList: Category[]
    category: Category
    editable?: boolean
}
// eslint-disable-next-line react/display-name
export const CategoriesSelectorList = memo(
    ({
        category,
        categories = [],
        editable = false,
        categoriesList = [],
    }: CategoriesSelectorListProps) => {
        const record = useRecordContext()
        const redirect = useRedirect()
        const [isOpen, setIsOpen] = useState(editable)
        const [checked, setChecked] = useState(false)
        const [value, setValue] = useStore<Category[]>(
            'categories',
            record?.categories || [],
        )

        const handleImageClick = (
            id: Identifier,
            resource: string,
            record: RaRecord,
        ) => {
            redirect('show', resource, id, record)
        }

        useLayoutEffect(() => {
            setValue(record?.categories)
        }, [record])

        const transformPosition = isOpen ? 'rotate(90deg)' : 'rotate(0deg)'

        useEffect(() => {
            const checkedCategory = value?.find(
                (cat: Category) => category.id === +cat.id,
            )

            if (category?.childrenIds?.includes(value[0]?.id)) {
                setIsOpen(true)
            }

            if (checkedCategory) {
                setChecked(true)
            } else {
                setChecked(false)
            }
        }, [value, category.id, record?.categories])

        const toggleCheckbox = useCallback(
            (id: string, checked: boolean) => {
                const category = categoriesList.find(
                    (category: Category) => category.id === +id,
                )

                if (checked) {
                    setValue((v) => [...v, category])
                } else {
                    setValue((v) =>
                        v.filter((category: Category) => category.id !== +id),
                    )
                }
            },
            [categoriesList, setValue, value],
        )

        return (
            <li key={category.id}>
                <Container
                    sx={{
                        display: 'flex',
                        gap: 1.5,
                        pt: 1,
                        pb: 1,
                        alignItems: 'center',
                    }}
                >
                    <button
                        type="button"
                        hidden={Boolean(!category?.children?.length)}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <ChevronRightIcon
                            sx={{
                                color: 'grey',
                                transform: transformPosition,
                                width: 24,
                                height: 24,
                            }}
                        />
                    </button>
                    <Checkbox
                        icon={
                            <CheckBoxOutlineBlankIcon
                                sx={{ display: 'none' }}
                            />
                        }
                        sx={{
                            position: 'absolute',
                            zIndex: 1000000,
                            border: 'none',
                            width: 32,
                            height: 32,
                            borderRadius: '3px',
                            padding: 0,
                            ml:
                                category?.children &&
                                category?.children?.length > 0
                                    ? '36px'
                                    : '',
                            cursor: !editable ? 'pointer' : 'auto',
                        }}
                        checked={checked}
                        value={category.id}
                        inputProps={{
                            'aria-label': category.id.toString(),
                        }}
                        onChange={(item) =>
                            !editable &&
                            toggleCheckbox(
                                item.target.value,
                                item.target.checked,
                            )
                        }
                    />
                    <Avatar
                        alt="Category image"
                        src={
                            category.image
                                ? `${imagesUrl}${category.image}`
                                : `${defaultImage}`
                        }
                        sx={{
                            width: 32,
                            height: 32,
                            borderRadius: '3px',
                        }}
                    />
                    <Tooltip
                        title={
                            editable &&
                            'Кликни на название для просмотра содержания категории'
                        }
                        placement="right-start"
                        arrow
                        disableHoverListener={!editable}
                    >
                        <Typography
                            sx={{
                                cursor: editable ? 'pointer' : 'default',
                                padding: '5px 30px 5px 5px',
                            }}
                            onClick={() => {
                                editable &&
                                    handleImageClick(
                                        category.id,
                                        'categories',
                                        category,
                                    )
                            }}
                        >
                            {category.name}
                        </Typography>
                    </Tooltip>
                </Container>
                <Box hidden={!isOpen} sx={{ pl: 9 }}>
                    {category?.children &&
                        category?.children?.map((category, index) => (
                            <ul key={index}>
                                <CategoriesSelectorList
                                    categories={
                                        category?.children as Category[]
                                    }
                                    category={category}
                                    editable={editable}
                                    categoriesList={categoriesList}
                                />
                            </ul>
                        ))}
                </Box>
            </li>
        )
    },
)
