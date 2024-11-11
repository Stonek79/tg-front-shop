import { FieldValues } from 'react-hook-form'
import { ColorAndSizeStock, Image, Product } from '@/types/product'
import {
    CreateParams,
    MutationMode,
    UpdateParams,
    UseCreateMutateParams,
    UseGetOneHookValue,
    UseUpdateMutateParams,
} from 'react-admin'
import { MutateOptions } from '@tanstack/query-core'
import { NavigateFunction } from 'react-router'

type CreateFunction = (
    resource?: string,
    params?: Partial<CreateParams<Partial<Product>>>,
    options?: MutateOptions<
        any,
        unknown,
        Partial<UseCreateMutateParams<Product>>,
        unknown
    > & { returnPromise?: boolean },
) => boolean extends true ? Promise<Product> : void

type EditFunction = (
    resource?: string,
    params?: Partial<UpdateParams<Product>>,
    options?: MutateOptions<
        any,
        Error,
        Partial<UseUpdateMutateParams<Product>>,
        unknown
    > & {
        mutationMode?: MutationMode
        returnPromise?: boolean
    },
) => Promise<boolean extends true ? Product : void>
export const productSave = async (
    data: FieldValues,
    type: string,
    actions: {
        create?: CreateFunction
        edit?: EditFunction
        navigate?: NavigateFunction
        refetch?: UseGetOneHookValue<Product>['refetch']
    },
) => {
    const { create, edit, navigate, refetch } = actions
    const formData = new FormData()
    console.log(data, 'DATA')
    const {
        thumbnail,
        images,
        characteristics,
        colorAndSizeStock,
        orders,
        reviews,
        ...rest
    } = data

    if (colorAndSizeStock) {
        colorAndSizeStock.forEach((stock) => {
            if (typeof stock.image !== 'string') {
                const newImage = new File(
                    [stock.image.rawFile],
                    stock.image.title,
                    {
                        type: stock.image.rawFile.type,
                    },
                )
                formData.append(
                    `colorImages[${stock.color}${stock.size}]`,
                    newImage,
                )
            }
        })
    }

    if (thumbnail && typeof thumbnail !== 'string') {
        const newThumbnail = new File(
            [(data.thumbnail as Image).rawFile],
            thumbnail.title,
            { type: (data.thumbnail as Image).rawFile.type },
        )
        thumbnail && formData.append('thumbnail', newThumbnail)
    }

    if (images) {
        images.forEach((image, index) => {
            if (typeof image !== 'string') {
                const newImage = new File([image.rawFile], image.title, {
                    type: image.rawFile.type,
                })
                formData.append(`images[${index}]`, newImage)
            }
        })
    }

    colorAndSizeStock?.forEach(
        (colorAndSize: ColorAndSizeStock, index: number) => {
            if (colorAndSize.image !== typeof 'string') {
                formData.append(
                    `colorImages[${index}]`,
                    (colorAndSize.image as unknown as Image).rawFile,
                )
            }
        },
    )

    formData.append(
        'data',
        JSON.stringify({
            ...rest,
            thumbnail,
            characteristics: characteristics[0],
            images: images.filter((image) => typeof image === 'string'),
            colorAndSizeStock: colorAndSizeStock.map((stock) => {
                if (stock?.fieldsId) {
                    const { fieldsId, ...rest } = stock

                    return rest
                }
                return stock
            }),
        }),
    )

    if (type === 'create' && create) {
        await create(
            'products/create',
            {
                data: formData,
            } as Partial<CreateParams<Partial<Product>>>,
            {
                onSuccess: () => {
                    navigate && navigate('/products')
                },
                onError: (error) => {
                    console.log(error)
                },
            },
        )
    }

    if (type === 'edit' && edit) {
        await edit(
            'products/edit',
            {
                data: formData as FormData,
                id: data.id as string,
            } as Partial<UpdateParams<Product>>,
            {
                onSuccess: (res) => {
                    console.log(res, 'result')
                    navigate && navigate('/products')
                    refetch && refetch()
                },
                onError: (error) => {
                    console.log(error, 'EDIT ERROR')
                },
            },
        )
    }
}
