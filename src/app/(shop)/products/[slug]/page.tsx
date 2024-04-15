import { Product } from '@/types/product'
import { getProduct, getProducts } from '@/shared/lib/actions/products'
import { productsUrl } from '@/shared/consts/products'
import { ProductPage } from '@/widgets/ProductPage'

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
    const products: Product[] = await getProducts(productsUrl)

    return products.map((product) => ({
        slug: `${product.id}`,
    }))
}

export default async function Product({
    params: { slug },
}: {
    params: { slug: string }
}) {
    const product = await getProduct(productsUrl, slug)

    return <ProductPage product={product} />
}
