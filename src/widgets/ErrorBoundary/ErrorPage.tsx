import { Button } from '@/shared/ui/Button/Button'

export const ErrorPage = () => {
    const reloadPage = () => {
        location.reload()
    }

    return (
        <div>
            <p>{'Unexpected error'}</p>
            <Button onClick={reloadPage}>{'Reload page'}</Button>
        </div>
    )
}
