import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material'
import { imagesUrl } from '@/shared/consts/urls'
import {
    Identifier,
    List,
    Pagination,
    RaRecord,
    useListContext,
    useRedirect,
} from 'react-admin'
import { Picture } from '@/types/product'
import { useEffect } from 'react'

const ImagesListContext = () => {
    const { data, isPending, setPerPage } = useListContext<Picture>()
    const redirect = useRedirect()
    useEffect(() => {
        setPerPage(10)
    }, [])

    if (isPending || !data) return null

    const handleImageClick = (
        id: Identifier,
        resource: string,
        record: RaRecord,
    ) => {
        redirect('show', resource, id, record)
    }

    return (
        <ImageList
            sx={{ width: '100%', height: '100%', p: 2 }}
            cols={5}
            rowHeight={'auto'}
        >
            {data.map((item) => (
                <ImageListItem
                    onClick={() =>
                        handleImageClick(item.filename, 'images', item)
                    }
                    key={item.id}
                >
                    <img
                        srcSet={`${imagesUrl}${item.filename}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        src={`${imagesUrl}${item.filename}?w=164&h=164&fit=crop&auto=format`}
                        alt={item.filename}
                        loading="lazy"
                        title={item?.filename}
                        style={{
                            objectFit: 'cover',
                            width: 200,
                            height: 200,
                            borderRadius: 4,
                        }}
                    />
                    <ImageListItemBar
                        title={item?.filename}
                        sx={{ maxWidth: 200 }}
                        position="below"
                    />
                </ImageListItem>
            ))}
        </ImageList>
    )
}

export const ImagesList = () => {
    const PostPagination = () => (
        <Pagination rowsPerPageOptions={[10, 25, 50, 100]} />
    )

    return (
        <List
            pagination={<PostPagination />}
            sx={{
                mt: 3,
            }}
        >
            <ImagesListContext />
        </List>
    )
}
