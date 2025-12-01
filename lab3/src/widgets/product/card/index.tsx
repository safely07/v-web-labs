import { Image, Price} from '../../../entities/product';
import { type TProduct } from '../../../entities/product';
import { useStore } from '../../../shared/lib/zustand/store-context';

type TCardProps = {
  product: TProduct;
}

export const Card = ({ product }: TCardProps) => {
  const addProductInCart = useStore((state)=>state.addProductInCart);
  const isInCart = useStore((state) => 
    state.productsInCart.some(p => p.id === product.id)
  );

  const handleButtonClick = () => {
    if (!isInCart) {
      addProductInCart(product); 
    };
  };

  return (
    <div className='bg-[#B365D4] rounded-lg overflow-hidden shadow-md border-4 border-[#7908AA] flex flex-col w-full max-w-[280px] h-[350px] transition-all duration-300 hover:transform hover:-translate-y-1 hover:border-8 hover:border-[#7908AA]'>
      <div className='relative w-full h-[200px] overflow-hidden'>
        <Image 
          url={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="font-bold text-white text-base mb-2 text-center">{product.title}</h3>
        
        <div className="mt-auto space-y-3">
          <Price 
            price={product.price} 
            discountPrice={product.discountPrice} 
          />
          <button 
            type="button" 
            name="buyButton"
            className="px-6 py-3 font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-violet-500 to-violet-600 text-white hover:from-violet-600 hover:to-violet-700 active:scale-95 shadow-lg hover:shadow-xl"
            onClick={handleButtonClick}>
            {isInCart ? "Добавлено" : "В корзину"}
          </button>
        </div>
      </div>
    </div>
  );
};
