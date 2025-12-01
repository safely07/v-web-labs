import { type StoreApi, createStore } from 'zustand';
import { type TProductState } from '../../../entities/product';

export const populateStore = (initialState: Pick<TProductState, 'products'>): StoreApi<TProductState> =>
    createStore<TProductState>((set, get) => ({
        ...initialState,
        productsInCart: [],
        productsInFavourite: [],
        addProduct: (product) =>
            set((state) => ({ products: [...state.products, product] })),
        delProduct: (id) =>
            set((state) => ({
                products: state.products.filter((p) => p.id !== id),
            })),
        searchProducts: (query) =>
            get().products.filter((p) => p.title.includes(query)),
        addProductInCart: (product) =>
            set((state) => ({ productsInCart: [...state.productsInCart, product] })),
        delProductFromCart: (id) =>
            set((state) => ({
                productsInCart: state.productsInCart.filter((p) => p.id !== id),
            })),
        addProductInFavourite: (product) =>
            set((state) => ({ productsInFavourite: [...state.productsInFavourite, product] })),
        delProductFromFavourite: (id) =>
            set((state) => ({
                productsInFavourite: state.productsInFavourite.filter((p) => p.id !== id),
            })),
        isProductInFavouriteById: (id: number) => {
            return get().productsInFavourite.some(p => p.id === id);
        },

        isProductInCartById: (id: number) => {
            return get().productsInCart.some(p => p.id === id);
        },
    
}));