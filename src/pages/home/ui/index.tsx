import './homeStyle.css'
import {Section, Card} from '../../../widgets/product'
import {productsList} from '../../../shared/data/products'
import { Header } from '../../../widgets/layout/header'

export const Home = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Section title="Популярные товары">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productsList.map(product => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        </Section>
      </div>
    </>
  )
}
