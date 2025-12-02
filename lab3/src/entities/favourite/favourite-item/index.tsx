// entities/favourite/ui/FavouriteItem/FavouriteItem.tsx
import { Image } from '../../product';
import { Price } from '../../product';
import { type TProduct } from '../../product';

type TFavouriteItemProps = {
  product: TProduct;
  onRemove?: (productId: number) => void;
}

export const FavouriteItem = ({
  product,
  onRemove,
}: TFavouriteItemProps) => {
  return (
    <div className='max-w-5xl mx-auto w-full mb-4'>
      <div className="bg-gradient-to-r from-[#B365D4] to-[#7908AA] 
                     rounded-lg shadow-lg flex flex-col md:flex-row w-full 
                     transition-all duration-300 hover:shadow-xl min-h-[120px]">
        
        {/* Изображение товара */}
        <div className="w-full md:w-1/5 h-40 md:h-auto relative overflow-hidden">
          <Image 
            url={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Информация о товаре */}
        <div className="flex-1 p-4 flex flex-col">
          <h3 className="font-bold text-white text-lg mb-2">{product.title}</h3>
          
          <div className="mb-4">
            <Price 
              price={product.price}
              discountPrice={product.discountPrice}
            />
            {product.discountPrice && (
              <div className="text-white/60 text-sm mt-1 line-through">
                {product.price.toLocaleString()} ₽
              </div>
            )}
          </div>

          <div className="mt-auto">
            <p className="text-white/70 text-sm">
              ID: {product.id}
            </p>
          </div>
        </div>

        {/* Кнопка удаления */}
        <div className="md:w-20 flex items-center justify-center p-4 
                       border-t md:border-t-0 md:border-l border-white/25">
          <button
            onClick={() => onRemove?.(product.id)}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-red-600 
                     text-white flex items-center justify-center hover:from-red-600 
                     hover:to-red-700 active:scale-95 shadow-lg hover:shadow-xl 
                     transition-all duration-300 text-xl font-bold"
            title="Удалить из избранного"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};