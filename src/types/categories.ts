type Category = {
    name: string
    url: string
    icon: string
    subcategories?: string[]
}

type NamedCategory = {
    [key: string]: Category
}
