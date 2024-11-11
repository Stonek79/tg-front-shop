export const debounce = (func: (args: any) => void, delay: number) => {
    let timeoutId: number | null = null

    return (...args: any[]) => {
        if (timeoutId !== null) {
            clearTimeout(timeoutId)
        }

        timeoutId = setTimeout(() => {
            func(...args)
        }, delay)
    }
}
