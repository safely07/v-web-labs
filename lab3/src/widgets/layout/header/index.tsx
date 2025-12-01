import { Link } from 'react-router';

export const Header = () => {
  return (
    <header className="bg-[#7908AA] text-white py-4 relative">
      <div className="max-w-7xl mx-auto px-5 flex justify-between items-center">
        <Link 
          to="/" 
          className="text-white no-underline transition-colors duration-300 hover:text-gray-300 ml-5 relative"
        >
          Главная
        </Link>
           
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <input 
            type="text" 
            placeholder="Поиск..." 
            className="bg-[#b365d471] py-2 px-10 rounded-full border-none min-w-[300px] text-white font-normal placeholder:text-white/70"
          />
        </div>
        
        <nav className="flex list-none">
          <Link 
            to="/favourite" 
            className="text-white no-underline transition-colors duration-300 hover:text-gray-300 ml-5 relative"
          >
            Избранное
          </Link>
          <Link 
            to="/cart" 
            className="text-white no-underline transition-colors duration-300 hover:text-gray-300 ml-5 relative"
          >
            Корзина
          </Link>
        </nav>
      </div>
    </header>
  );
};