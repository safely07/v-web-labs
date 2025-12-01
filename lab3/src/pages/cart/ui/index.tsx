import './cartStyle.css'
import { Section } from '../../../widgets/product'
import { Header } from '../../../widgets/layout/header'
import { CartList } from '../../../widgets/product/cart-list' 

export const Cart = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Section title='Корзина'>
          <CartList />
        </Section>
      </div>
    </>
  )
}