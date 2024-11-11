import { ImageListItem, ImageListItemBar } from '@mui/material'
import { imagesUrl } from '@/shared/consts/urls'
import { ListButton, Show, SimpleShowLayout, TopToolbar } from 'react-admin'
import { useParams } from 'react-router'

export const ShowImage = () => {
    const { id } = useParams()
    const Actions = () => (
        <TopToolbar>
            {/*<EditButton />*/}
            <ListButton />
        </TopToolbar>
    )

    return (
        <Show
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                '& .MuiPaper-root': {
                    maxWidth: 'calc(100vmin - 8em)',
                    maxHeight: 'calc(100vmin - 6.5em)',
                },
                '& .RaShow-main': {
                    justifyContent: 'center',
                },
            }}
            actions={<Actions />}
        >
            <SimpleShowLayout
                sx={{
                    height: 'calc(100vh - 6em)',
                    maxWidth: '100vmin',
                }}
            >
                <ImageListItem
                    cols={1}
                    sx={{
                        aspectRatio: '1',
                    }}
                >
                    <img
                        srcSet={`${imagesUrl}${id}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        src={`${imagesUrl}${id}?w=164&h=164&fit=crop&auto=format`}
                        alt={id}
                        loading="lazy"
                        title={id}
                        style={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                            width: '100%',
                            height: '100%',
                        }}
                    />
                    <ImageListItemBar
                        title={id}
                        sx={{ width: 'auto', flex: '1 1 auto' }}
                        position="below"
                    />
                </ImageListItem>
            </SimpleShowLayout>
        </Show>
    )
}
