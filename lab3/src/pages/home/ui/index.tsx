import './homeStyle.css'
import {Section, CardList} from '../../../widgets/product'
import { Header } from '../../../widgets/layout/header'

export const Home = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Section title="Популярные товары">
          <CardList />
        </Section>
      </div>
    </>
  )
}
