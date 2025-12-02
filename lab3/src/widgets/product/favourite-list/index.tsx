// widgets/favourite/ui/FavouriteList/FavouriteList.tsx
import { FavouriteItem } from "../../../entities/favourite/favourite-item";
import type { TProduct } from "../../../entities/product"
import { useStore } from "../../../shared/lib/zustand/store-context";

export const FavouriteList = () => {
  const productsInFavourite = useStore((state) => state.productsInFavourite);
  const delProductFromFavourite = useStore((state) => state.delProductFromFavourite);

  if (productsInFavourite.length === 0) {
    return (
      <div className="max-w-5xl mx-auto text-center py-20">
        <div className="text-8xl mb-6 opacity-30">❤️</div>
        <h3 className="text-3xl font-bold text-gray-800 mb-4">Избранное пусто</h3>
        <p className="text-gray-600 text-lg mb-8">Добавьте товары в избранное из каталога</p>
        <a 
          href="/"
          className="inline-block px-10 py-4 font-semibold rounded-xl transition-all duration-300 
                   bg-gradient-to-r from-[#B365D4] to-[#7908AA] text-white 
                   hover:from-[#7908AA] hover:to-[#B365D4] active:scale-95 
                   shadow-xl hover:shadow-2xl text-lg"
        >
          Перейти к покупкам
        </a>
      </div>
    );
  }
  
  return (
    <div className="max-w-5xl mx-auto space-y-4">
      {productsInFavourite.map((product: TProduct) => (
        <FavouriteItem 
          key={product.id}
          product={product}
          onRemove={delProductFromFavourite}
        />
      ))}
      
      <div className="text-center mt-8">
        <p className="text-gray-600">
          Всего товаров в избранном: {productsInFavourite.length}
        </p>
      </div>
    </div>
  );
};