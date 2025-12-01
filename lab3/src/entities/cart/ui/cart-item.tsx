import { useState } from 'react';
import { Image } from '../../../entities/product';
import { Price } from '../../../entities/product';
import { type TProduct } from '../../../entities/product';

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
  onRemove,
}: TCartItemProps) => {
  const [localQuantity, setLocalQuantity] = useState(quantity);
  
  const totalPrice = (product.discountPrice || product.price) * localQuantity;

  const handleQuantityChange = (value: number) => {
    const newQuantity = Math.max(1, Math.min(10, value));
    setLocalQuantity(newQuantity);
    onUpdateQuantity?.(product.id, newQuantity);
  };

  return (
    <div className='max-w-5xl mx-auto w-full mb-4'>
      <div className={`
        bg-gradient-to-r from-[#B365D4] to-[#7908AA] 
        rounded-lg shadow-lg
        flex flex-col md:flex-row w-full transition-all duration-300 
        hover:shadow-xl
        ${isSelected ? 'ring-2 ring-yellow-300' : ''}
        min-h-[120px]
        overflow-hidden
      `}>
        {/* Изображение */}
        <div className="w-full md:w-1/6 h-32 md:h-auto relative overflow-hidden">
          <Image 
            url={product.image}
            alt={product.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 bg-[#7908AA]/90 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-sm">
            {localQuantity}
          </div>
        </div>

        {/* Контент */}
        <div className="flex-1 p-3 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1 mr-4">
              <h3 className="font-bold text-white text-base mb-1">{product.title}</h3>
              <p className="text-white/70 text-xs">ID: {product.id}</p>
            </div>
            <div className="text-right">
              <Price 
                price={product.price}
                discountPrice={product.discountPrice}
              />
            </div>
          </div>

          <div className="mb-3">
            <div className="flex justify-between items-center">
              <span className="text-white/80 text-sm">Стоимость:</span>
              <span className="text-white font-bold text-lg">
                {totalPrice.toLocaleString()} ₽
              </span>
            </div>
            <div className="text-white/60 text-xs text-right mt-0.5">
              {(product.discountPrice || product.price).toLocaleString()} ₽ × {localQuantity}
            </div>
          </div>

          <div className="mt-auto">
            <div className="flex items-center justify-between">
              <span className="text-white font-medium text-sm">Кол-во:</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleQuantityChange(localQuantity - 1)}
                  disabled={localQuantity <= 1}
                  className="w-8 h-8 rounded-md bg-white/25 text-white flex items-center justify-center 
                           hover:bg-white/35 disabled:opacity-50 disabled:cursor-not-allowed 
                           transition-colors shadow-sm"
                >
                  −
                </button>
                
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={localQuantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    className="w-12 h-8 bg-white/15 border border-white/40 rounded-md text-white 
                             text-center font-bold text-sm [appearance:textfield] shadow-inner"
                  />
                </div>
                
                <button
                  onClick={() => handleQuantityChange(localQuantity + 1)}
                  disabled={localQuantity >= 10}
                  className="w-8 h-8 rounded-md bg-white/25 text-white flex items-center justify-center 
                           hover:bg-white/35 disabled:opacity-50 disabled:cursor-not-allowed 
                           transition-colors shadow-sm"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Правая колонка: чекбокс и кнопка удаления */}
        <div className="md:w-24 flex flex-col items-center justify-center p-3 
                       border-t md:border-t-0 md:border-l border-white/25
                       space-y-3"> {/* space-y-3 между чекбоксом и кнопкой */}
          
          {/* Чекбокс для выбора - СВЕРХУ */}
          <label className="flex flex-col items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onToggleSelect?.(product.id)}
              className="sr-only"
              aria-label={`Выбрать ${product.title}`}
            />
            <div className={`
              w-6 h-6 rounded border-2 flex items-center justify-center
              transition-all duration-200
              ${isSelected 
                ? 'bg-yellow-300 border-yellow-400 shadow-inner' 
                : 'bg-white/40 border-white/60 hover:bg-white/50'
              }
            `}>
              {isSelected && (
                <svg 
                  className="w-4 h-4 text-[#7908AA]" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="3" 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              )}
            </div>
            <span className="mt-1 text-white/70 text-xs">
              {isSelected ? 'Выбрано' : 'Выбрать'}
            </span>
          </label>
          
          {/* Разделитель */}
          <div className="h-px w-full bg-white/20 md:hidden"></div>
          
          {/* Кнопка удаления - СНИЗУ */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => onRemove?.(product.id)}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-red-600 
                       text-white flex items-center justify-center hover:from-red-600 
                       hover:to-red-700 active:scale-95 shadow-lg hover:shadow-xl 
                       transition-all duration-300 text-lg font-bold"
              title="Удалить из корзины"
              aria-label="Удалить товар"
            >
              ×
            </button>
            <span className="mt-1 text-white/70 text-xs">Удалить</span>
          </div>
        </div>
      </div>
    </div>
  );
};