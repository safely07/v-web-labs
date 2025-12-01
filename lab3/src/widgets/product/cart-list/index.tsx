import { CartItem } from "../../../entities/cart/ui/cart-item";
import type { TProduct } from "../../../entities/product"
import { useStore } from "../../../shared/lib/zustand/store-context";

export const CartList = () => {
    const productsInCart = useStore((state) => state.productsInCart)
    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productsInCart.map( (product: TProduct) => (
                <CartItem product={product}/>
            ))}
        </div>
    );
};