import { Category } from '@/types/categories'

export interface CategoryWithChildren extends Category {
    children: CategoryWithChildren[] // Каждый элемент также содержит children
}

export const buildCategoriesTree = (
    items: Category[],
): CategoryWithChildren[] => {
    const map: { [key: number]: number } = {}
    const roots: CategoryWithChildren[] = []

    // Шаг 1: Инициализация карты и детей
    items.forEach((item, index) => {
        map[item.id] = index // сохраняем индекс для быстрого доступа
        item.children = [] // инициализируем пустой массив для детей
    })

    console.log(map, 'MAP')
    const withNodes = items.map((item) => ({
        ...item,
        children:
            item.childrenIds.map((child) =>
                items.find(({ id }) => id === child),
            ) || [],
        parents:
            item.parentIds.map((parent) =>
                items.find(({ id }) => id === parent),
            ) || [],
    }))

    // Шаг 2: Заполнение детей для каждой категории
    items.forEach((node: Category) => {
        if (node.parentIds && node.parentIds.length > 0) {
            node.parentIds.forEach((parentId) => {
                if (map[parentId] !== undefined) {
                    // Добавляем текущую категорию в детей всех ее родителей
                    items[map[parentId]].children?.push(node)
                }
            })
        } else {
            // Если нет родителей, добавляем в корни
            roots.push(node as CategoryWithChildren)
        }
    })

    return roots
}

export const createCategoriesTree = (items: Category[]): Category[] => {
    const root: Category = items.find(
        (item) => item.parentIds.length === 0,
    ) as Category

    const withNodes = items
        .filter((category) => category.id !== root.id)
        .map((category) => ({
            ...category,
            children:
                category.childrenIds.map((child) =>
                    items.find(({ id }) => id === child),
                ) || [],
            parents:
                category.parentIds.map((parent) =>
                    items.find(({ id }) => id === parent),
                ) || [],
        })) as Category[]

    return [{ ...root, children: withNodes }]
}
