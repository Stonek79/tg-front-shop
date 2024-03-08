import {ProductItem} from "@/components/ProductItem/ProductItem";
import {Product} from "@/types/product";
import {getProduct, getProducts} from "@/lib/actions/products";
import {productsUrl} from "@/lib/consts/products";

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
    const products: Product[] = await getProducts(productsUrl);

    return products.map((product) => ({
        slug: `${product.id}`,
    }))
}

export default async function Product(
    {params: { slug } }: { params: { slug: string } }
) {
    const product = await getProduct(productsUrl, slug)

    return <ProductItem product={product} />
}