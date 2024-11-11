import type { Product } from '@/types/product'

const transformedThumbnailPath = <T extends { thumbnail: string }>(
    data: string | File,
    path: string = '',
    record: T,
) => {
    if (!data && !record?.thumbnail) return ''
    if (typeof data === 'string') {
        return {
            src: `${path}${record.thumbnail}`,
            title: record.thumbnail,
        }
    }

    return data
}

const transformInputImagesPath = (data = [], path = '') =>
    data.map((image) => {
        if (typeof image !== 'string') return image
        return { src: `${path}${image}`, title: image }
    })

const transformOutputImagesPath = (data: Product) => {
    const { thumbnail, images } = data
    const transformedThumbnail =
        typeof thumbnail !== 'string' && !thumbnail?.rawFile && thumbnail?.src
            ? thumbnail.src.split('/').pop()
            : thumbnail

    const transformedImages = images.map((image) => {
        if (typeof image !== 'string' && image?.src && !image?.rawFile) {
            return image?.src.split('/').pop()
        }
        return image
    })

    return {
        ...data,
        thumbnail: transformedThumbnail,
        images: transformedImages,
    }
}

export {
    transformedThumbnailPath,
    transformInputImagesPath,
    transformOutputImagesPath,
}
