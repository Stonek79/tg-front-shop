import {ProductsList} from "@/components/ProductsList/ProductsList";
import {Product} from "@/types/product";
import {getProducts} from "@/lib/actions/products";
import {productsUrl} from "@/lib/consts/products";

export default async function Products() {
    const products: Product[] = await getProducts(productsUrl);

    return (
        <ProductsList products={products}/>
    )
}
