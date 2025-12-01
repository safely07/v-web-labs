// widgets/product/cart-list/ui/CartList.tsx
import { useState } from 'react';
import { CartItem } from "../../../entities/cart/ui/cart-item";
import { CartActionsPanel } from '../cart-action-panel'; 
import type { TProduct } from "../../../entities/product"
import { useStore } from "../../../shared/lib/zustand/store-context";

export const CartList = () => {
  const productsInCart = useStore((state) => state.productsInCart);
  const delProductFromCart = useStore((state) => state.delProductFromCart);
  
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  
  const handleToggleSelect = (productId: number) => {
    //console.log('Toggle select:', productId); // Для отладки
    setSelectedItems(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };
  
  // Выбрать все / отменить все
  const handleSelectAll = () => {
    if (selectedItems.length === productsInCart.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(productsInCart.map(p => p.id));
    }
  };
  
  // Удалить выбранные товары
  const handleRemoveSelected = () => {
    selectedItems.forEach(id => delProductFromCart(id));
    setSelectedItems([]);
  };
  
  // Посчитать сумму выбранных товаров
  const totalSelectedPrice = productsInCart
    .filter(product => selectedItems.includes(product.id))
    .reduce((sum, product) => {
      const price = product.discountPrice || product.price;
      return sum + price;
    }, 0);

  if (productsInCart.length === 0) {
    return (
      <div className="max-w-5xl mx-auto text-center py-20">
        <div className="text-8xl mb-6 opacity-30">🛒</div>
        <h3 className="text-3xl font-bold text-gray-800 mb-4">Корзина пуста</h3>
        <p className="text-gray-600 text-lg mb-8">Добавьте товары из каталога</p>
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
    <>
      <CartActionsPanel
        selectedCount={selectedItems.length}
        totalSelectedPrice={totalSelectedPrice}
        onSelectAll={handleSelectAll}
        onRemoveSelected={handleRemoveSelected}
        isAllSelected={selectedItems.length === productsInCart.length && productsInCart.length > 0}
        totalItems={productsInCart.length}
      />
      
      <div className="max-w-5xl mx-auto space-y-4">
        {productsInCart.map((product: TProduct) => (
          <CartItem 
            key={product.id}
            product={product}
            isSelected={selectedItems.includes(product.id)}
            onToggleSelect={handleToggleSelect}
            onRemove={delProductFromCart}
          />
        ))}
      </div>
      
    </>
  );
};