import { useState, useEffect, useRef } from 'react';
import { useStore } from '../../../shared/lib/zustand/store-context';
import { type TProduct } from '../../../entities/product';

export const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [searchResults, setSearchResults] = useState<TProduct[]>([]);
    const searchRef = useRef<HTMLDivElement>(null);
    
    const searchProducts = useStore((state) => state.searchProducts);
    const addProductInCart = useStore((state) => state.addProductInCart);
    const addProductInFavourite = useStore((state) => state.addProductInFavourite);
    const productsInCart = useStore((state) => state.productsInCart);
    const productsInFavourite = useStore((state) => state.productsInFavourite);

    const isProductInCart = (productId: number) => 
        productsInCart.some(p => p.id === productId);
    
    const isProductInFavourite = (productId: number) => 
        productsInFavourite.some(p => p.id === productId);

    useEffect(() => {
        if (query.trim() === '') {
            setSearchResults([]);
            setIsOpen(false);
            return;
        }
        
        const results = searchProducts(query);
        setSearchResults(results);
        setIsOpen(results.length > 0);
    }, [query, searchProducts]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleAddToCart = (product: TProduct, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!isProductInCart(product.id)) {
            addProductInCart(product);
        }
    };

    const handleAddToFavourite = (product: TProduct, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!isProductInFavourite(product.id)) {
            addProductInFavourite(product);
        }
    };

    const handleSelectProduct = (product: TProduct) => {
        setQuery('');
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={searchRef}>
            {/* Поле поиска в вашем стиле */}
            <div className="relative">
                <input 
                    type="text" 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.trim() !== '' && setIsOpen(true)}
                    placeholder="Поиск..." 
                    className="bg-[#b365d471] py-2 px-10 rounded-full border-none min-w-[300px] 
                             text-white font-normal placeholder:text-white/70
                             focus:outline-none focus:ring-2 focus:ring-[#7908AA] focus:ring-opacity-50
                             transition-all duration-300"
                />
                {/* Иконка лупы внутри поля */}
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70">
                    🔍
                </div>
            </div>

            {/* Выпадающий список результатов */}
            {isOpen && searchResults.length > 0 && (
                <div className="absolute z-50 mt-2 bg-gradient-to-b from-[#B365D4] to-[#7908AA] 
                              rounded-xl shadow-2xl border-2 border-white/20 backdrop-blur-sm
                              max-h-80 overflow-y-auto w-[600px] left-1/2 transform -translate-x-1/2">
                    
                    <div className="p-3">
                        {/* Заголовок */}
                        <div className="px-3 py-2 mb-2 border-b border-white/20">
                            <span className="text-sm font-bold text-white">
                                Найдено товаров: {searchResults.length}
                            </span>
                        </div>
                        
                        {/* Список товаров */}
                        {searchResults.map((product) => {
                            const inCart = isProductInCart(product.id);
                            const inFavourite = isProductInFavourite(product.id);
                            
                            return (
                                <div
                                    key={product.id}
                                    className="flex items-center p-3 hover:bg-white/10 rounded-lg 
                                             transition-all duration-200 cursor-pointer m-1"
                                    onClick={() => handleSelectProduct(product)}
                                >
                                    {/* Изображение */}
                                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 
                                                  border-2 border-white/30">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Информация */}
                                    <div className="ml-3 flex-1 min-w-0">
                                        <h4 className="font-bold text-white text-sm truncate">
                                            {product.title}
                                        </h4>
                                        <div className="flex items-center mt-1">
                                            <span className={`font-bold ${product.discountPrice ? 'text-yellow-300' : 'text-white'}`}>
                                                {product.discountPrice || product.price} ₽
                                            </span>
                                            {product.discountPrice && (
                                                <span className="ml-2 text-xs text-white/60 line-through">
                                                    {product.price} ₽
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Кнопки */}
                                    <div className="flex items-center space-x-2 ml-2">
                                        {/* Избранное */}
                                        <button
                                            onClick={(e) => handleAddToFavourite(product, e)}
                                            disabled={inFavourite}
                                            className={`w-8 h-8 rounded-full flex items-center justify-center 
                                                     transition-all duration-200 text-lg ${
                                                        inFavourite
                                                        ? 'text-red-300 cursor-default'
                                                        : 'text-white/70 hover:text-white'
                                                     }`}
                                            title={inFavourite ? 'В избранном' : 'В избранное'}
                                        >
                                            {inFavourite ? '💜' : '🤍'}
                                        </button>

                                        {/* Корзина */}
                                        <button
                                            onClick={(e) => handleAddToCart(product, e)}
                                            disabled={inCart}
                                            className={`px-3 py-1.5 rounded-full font-bold text-sm transition-all duration-200 
                                                     min-w-[85px] flex items-center justify-center ${
                                                        inCart
                                                        ? 'bg-white/20 text-white cursor-default'
                                                        : 'bg-white text-[#7908AA] hover:bg-gray-100 active:scale-95'
                                                     }`}
                                        >
                                            {inCart ? '✓ В корзине' : 'В корзину'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Сообщение "не найдено" */}
            {isOpen && query.trim() !== '' && searchResults.length === 0 && (
                <div className="absolute z-50 mt-2 w-full bg-gradient-to-b from-[#B365D4] to-[#7908AA] 
                              rounded-xl shadow-xl border-2 border-white/20 p-4 
                              min-w-[350px] left-1/2 transform -translate-x-1/2">
                    <div className="text-center">
                        <div className="text-white text-2xl mb-2">🔍</div>
                        <p className="text-white font-bold">Товары не найдены</p>
                        <p className="text-white/70 text-sm mt-1">
                            Попробуйте другой запрос
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};