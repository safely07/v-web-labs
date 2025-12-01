import { useState } from 'react';
import { Image } from '../../../entities/product';
import { Price } from '../../../entities/product';
import { type TProduct } from '../../../entities/product';
import { useStore } from '../../../shared/lib/zustand/store-context';

type TCartItemProps = {
  product: TProduct;
  quantity?: number;
  isSelected?: boolean;
  onToggleSelect?: (productId: number) => void;
  onUpdateQuantity?: (productId: number, quantity: number) => void;
  onRemove?: (productId: number) => void;
}

export const CartItem = ({
  product,
  quantity = 1,
  isSelected = false,
  onToggleSelect,
  onUpdateQuantity,
}: TCartItemProps) => {
  const [localQuantity, setLocalQuantity] = useState(quantity);
  const delProductFromCart = useStore((state) => state.delProductFromCart)

  const handleQuantityChange = (value: number) => {
    const newQuantity = Math.max(1, value);
    setLocalQuantity(newQuantity);
    //onUpdateQuantity(product.id, newQuantity);
  };

  return (
    <div className={`
      bg-[#B365D4] rounded-lg overflow-hidden shadow-md border-4 border-[#7908AA] 
      flex flex-col md:flex-row w-full transition-all duration-300 
      hover:transform hover:-translate-y-1 hover:border-[#7908AA] hover:shadow-xl
      ${isSelected ? 'ring-4 ring-yellow-400 ring-opacity-50 border-yellow-400' : ''}
      relative
    `}>
      <div className="absolute top-3 left-3 z-10">
        <button
          //onClick={() => onToggleSelect(product.id)}
          className={`
            w-6 h-6 rounded-full border-2 flex items-center justify-center
            transition-all duration-200
            ${isSelected 
              ? 'bg-yellow-400 border-yellow-500' 
              : 'bg-white/20 border-white/40 hover:bg-white/30'
            }
          `}
        >
          {isSelected && '✓'}
        </button>
      </div>

      <div className="w-full md:w-1/4 h-48 md:h-auto relative overflow-hidden">
        <Image 
          url={product.image}
          alt={product.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-[#7908AA] text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center">
          {quantity}
        </div>
      </div>

      <div className="flex-1 p-4 flex flex-col">
        <div className="mb-4">
          <h3 className="font-bold text-white text-lg mb-2">{product.title}</h3>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between">
            <span className="text-white/80">Цена:</span>
            <Price 
              price={product.price}
              discountPrice={product.discountPrice} 
            />
          </div>
          {product.discountPrice && (
            <div className="text-white/60 text-sm mt-1 line-through text-right">
              {product.price.toLocaleString()} ₽
            </div>
          )}
        </div>

        <div className="mt-auto">
          <div className="flex items-center justify-between">
            <span className="text-white font-medium">Количество:</span>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleQuantityChange(localQuantity - 1)}
                disabled={localQuantity <= 1}
                className="w-10 h-10 rounded-lg bg-white/20 text-white flex items-center justify-center hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg"
              >
                −
              </button>
              
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  value={localQuantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  className="w-20 h-10 bg-white/10 border-2 border-white/30 rounded-lg text-white text-center font-bold text-lg [appearance:textfield]"
                />
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-white/60 text-xs whitespace-nowrap">
                  шт.
                </span>
              </div>
              
              <button
                onClick={() => handleQuantityChange(localQuantity + 1)}
                className="w-10 h-10 rounded-lg bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors text-lg"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="md:w-20 flex md:flex-col items-center justify-center p-4 border-t md:border-t-0 md:border-l border-white/20">
        <button
          onClick={() => delProductFromCart(product.id)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white flex items-center justify-center hover:from-red-600 hover:to-red-700 active:scale-95 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          ×
        </button>
      </div>
    </div>
  );
};