import { Header } from '../../../widgets/layout/header'
import { FavouriteList } from '../../../widgets/product' 

export const Favourite = () => {
  return (
    <>
      <Header />
      
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Избранное</h1>
          <p className="text-gray-600 mt-2">Ваши понравившиеся товары</p>
        </div>
        
        <div className="max-w-7xl mx-auto"> 
          <FavouriteList />
        </div>
      </div>
    </>
  )
}