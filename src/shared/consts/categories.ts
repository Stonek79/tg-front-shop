type Category = {
    name: string
    url: string
    icon: string
    subcategories?: string[]
}

type NamedCategory = {
    [key: string]: Category
}

export const categoriesList: NamedCategory = {
    all: {
        name: 'All categories',
        url: 'all',
        icon: 'all.webp',
    },

    inStock: {
        name: 'In stock',
        url: 'inStock',
        icon: 'inStock.webp',
    },

    top: {
        name: 'Top',
        url: 'top',
        icon: 'top.webp',
        subcategories: [
            'tShirts',
            'blouses',
            'sweatshirts',
            'longsleeves',
            'sweaters',
            'cardigans',
            'jackets',
            'zippedSweaters',
            'hoodies',
            'turtlenecks',
        ],
    },

    bottom: {
        name: 'Bottom',
        url: 'bottom',
        icon: 'bottom.webp',
        subcategories: [
            'pants',
            'skirts',
            'trousers',
            'shorts',
            'leggings',
            'breeches',
        ],
    },

    outwears: {
        name: 'Outwears',
        url: 'outwears',
        icon: 'outwears.webp',
        subcategories: [
            'bombers',
            'midSeasonJackets',
            'winterJackets',
            'coats',
            'vests',
        ],
    },

    jeans: {
        name: 'Jeans',
        url: 'jeans',
        icon: 'jeans.webp',
        subcategories: [
            'breeches',
            'skirts',
            'shorts',
            'dresses',
            'jackets',
            'blouses',
        ],
    },

    suits: {
        name: 'Suits',
        url: 'suits',
        icon: 'suits.webp',
    },

    dresses: {
        name: 'Dresses',
        url: 'dresses',
        icon: 'dresses.webp',
    },

    oversize: {
        name: 'Oversize',
        url: 'oversize',
        icon: 'oversize.webp',
    },

    skirts: {
        name: 'Skirts',
        url: 'skirts',
        icon: 'skirts.webp',
    },
}

export const allCategories: NamedCategory = {
    inStock: {
        name: 'In stock',
        url: 'inStock',
        icon: 'inStock.webp',
    },
    tShirts: {
        name: 'T-Shirts',
        url: 'tShirts',
        icon: 't-shirts.webp',
    },
    blouses: {
        name: 'Blouses',
        url: 'blouses',
        icon: 'blouses.webp',
    },
    sweatshirts: {
        name: 'Sweatshirts',
        url: 'sweatshirts',
        icon: 'sweatshirts.webp',
    },
    longsleeves: {
        name: 'Longsleeves',
        url: 'longsleeves',
        icon: 'longsleeves.webp',
    },
    sweaters: {
        name: 'Sweaters',
        url: 'sweaters',
        icon: 'sweaters.webp',
    },
    cardigans: {
        name: 'Cardigans',
        url: 'cardigans',
        icon: 'cardigans.webp',
    },
    jackets: {
        name: 'Jackets',
        url: 'jackets',
        icon: 'jacket.webp',
    },
    suitJackets: {
        name: 'Suit Jackets',
        url: 'suitJackets',
        icon: 'suit-jackets.webp',
    },
    zippedSweaters: {
        name: 'Zipped Sweaters',
        url: 'zippedSweaters',
        icon: 'zippedSweaters.webp',
    },
    hoodies: {
        name: 'Hoodies',
        url: 'hoodies',
        icon: 'hoodies.webp',
    },
    turtlenecks: {
        name: 'Turtlenecks',
        url: 'turtlenecks',
        icon: 'turtlenecks.webp',
    },
    pants: {
        name: 'Pants',
        url: 'pants',
        icon: 'pants.webp',
    },
    trousers: {
        name: 'Trousers',
        url: 'trousers',
        icon: 'trousers.webp',
    },
    skirts: {
        name: 'Skirts',
        url: 'skirts',
        icon: 'skirts.webp',
    },
    shorts: {
        name: 'Shorts',
        url: 'shorts',
        icon: 'shorts.webp',
    },
    leggings: {
        name: 'Leggings',
        url: 'leggings',
        icon: 'leggings.webp',
    },
    breeches: {
        name: 'Breeches',
        url: 'breeches',
        icon: 'breeches.webp',
    },
    suits: {
        name: 'Suits',
        url: 'suits',
        icon: 'suits.webp',
    },
    dresses: {
        name: 'Dresses',
        url: 'dresses',
        icon: 'dresses.webp',
    },
    oversize: {
        name: 'Oversize',
        url: 'oversize',
        icon: 'oversize.webp',
    },
    midSeasonJackets: {
        name: 'Mid season jackets',
        url: 'midSeasonJackets',
        icon: 'mid-season-jackets.webp',
    },
    bombers: {
        name: 'Bombers',
        url: 'bombers',
        icon: 'bombers.webp',
    },
    winterJackets: {
        name: 'Winter jackets',
        url: 'winterJackets',
        icon: 'winter-jackets.webp',
    },
    coats: {
        name: 'Coats',
        url: 'coats',
        icon: 'coats.webp',
    },
    vests: {
        name: 'Vests',
        url: 'vests',
        icon: 'vests.webp',
    },
}
