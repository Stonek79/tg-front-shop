import { Category } from '@/types/categories'

interface CategoryWithChildren extends Category {
    children: CategoryWithChildren[]
}

export const buildCategoriesTree = (
    items: Category[],
): CategoryWithChildren[] => {
    const map: { [key: number]: number } = {}
    let node: CategoryWithChildren
    const roots: CategoryWithChildren[] = []
    for (let i = 0; i < items.length; i += 1) {
        map[items[i].id] = i // initialize the map
        items[i].children = [] // initialize the children
    }
    for (let i = 0; i < items.length; i += 1) {
        node = items[i] as CategoryWithChildren
        if (node.parentId !== null) {
            // if you have dangling branches check that map[node.parentId] exists
            items[map[node?.parentId]]?.children?.push(node)
        } else {
            roots.push(node)
        }
    }
    return roots
}
