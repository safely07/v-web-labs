import './cartStyle.css'
import { Header } from '../../../widgets/layout/header'
import { CartList } from '../../../widgets/product/cart-list'
import { useStore } from '../../../shared/lib/zustand/store-context' 

export const Cart = () => {
  
  const totalPrice = useStore((state) => {
    return state.productsInCart.reduce((total, product) => {
      const price = product.discountPrice || product.price;
      return total + price;
    }, 0);
  });
  
  return (
    <>
      <Header />
      
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Корзина покупок</h1>
          <p className="text-gray-600 mt-2">Управляйте вашими товарами</p>
        </div>
        
        <div className="max-w-7xl mx-auto"> 
          <CartList />
        </div>
        
        <div className="max-w-7xl mx-auto mt-12">
          <div className="p-6 bg-gradient-to-r from-[#B365D4] to-[#7908AA] rounded-xl shadow-lg border-4 border-[#7908AA]">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
              <div>
                <h3 className="text-white text-2xl font-bold">Итого к оплате</h3>
                <p className="text-white/80 text-sm">С учетом всех товаров в корзине</p>
              </div>
              <div className="text-center sm:text-right">
                <div className="text-4xl font-bold text-white mb-4">
                  {totalPrice}Р
                </div>
                <button className="px-10 py-4 bg-white text-[#7908AA] font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg text-lg">
                  Оформить заказ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}