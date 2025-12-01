import { Card } from "../card";
import type { TProduct } from "../../../entities/product"
import { useStore } from "../../../shared/lib/zustand/store-context";

export const CardList = () => {
    const products = useStore((state)=>state.products);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map( (product: TProduct) => (
                <Card product={product}/>
            ))}
        </div>
    );
};