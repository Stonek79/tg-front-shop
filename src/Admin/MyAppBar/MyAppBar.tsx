import { AppBar, Button, TitlePortal } from 'react-admin'
import { useRouter } from 'next/navigation'

export const MyAppBar = () => {
    const router = useRouter()

    return (
        <AppBar color="primary">
            <TitlePortal />
            <Button
                size="medium"
                label="В магазин"
                color="secondary"
                variant="text"
                onClick={() => router.push('/', { scroll: false })}
            />
        </AppBar>
    )
}
