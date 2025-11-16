import { useState } from 'react';
import { Image, Price} from '../../../entities/product';
import { type TProduct } from '../../../entities/product';

type TCardProps = {
  product: TProduct;
}

export const Card = ({ product }: TCardProps) => {
  const [buttonText, setButtonText] = useState('В корзину');
  const [isAdded, setIsAdded] = useState(false);

  const handleButtonClick = () => {
    setIsAdded(!isAdded); 
    setButtonText(isAdded ? 'В корзину' : 'Добавлено');
  };

  return (
    <div className='bg-[#B365D4] rounded-lg overflow-hidden shadow-md border-4 border-[#7908AA] flex flex-col w-full max-w-[280px] h-[350px] transition-all duration-300 hover:transform hover:-translate-y-1 hover:border-8 hover:border-[#7908AA]'>
      <div className='relative w-full h-[200px] overflow-hidden'>
        <Image 
          url={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="font-bold text-white text-base mb-2 text-center">{product.title}</h3>
        
        <div className="mt-auto">
          <Price 
            price={product.price} 
            discountPrice={product.discountPrice} 
          />
          <button 
            type="button" 
            name="buyButton"
            className="bg-[#7908AA] hover:bg-[#470564] text-white py-3 px-6 rounded-md cursor-pointer text-base transition-all duration-300 hover:-translate-y-0.5 mt-2.5 min-w-[120px] w-full"
            onClick={handleButtonClick}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};
