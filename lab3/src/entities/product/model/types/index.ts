export type TProduct = {
	id: number,
	title: string,
	price: number,
	discountPrice: number,
	image: string,
	quantity?: number,
}

export type TProductState = {
	products: TProduct[],
	productsInCart: TProduct[],
	productsInFavourite: TProduct[],
	addProduct: (product: TProduct) => void,
	delProduct: (id: number) => void,
	searchProducts: (query: string) => TProduct[],
	addProductInCart: (product: TProduct) => void,
	delProductFromCart: (id: number) => void,
	addProductInFavourite: (product: TProduct) => void,
	delProductFromFavourite: (id: number) => void,
	isProductInFavouriteById: (id: number) => boolean,
	isProductInCartById: (id: number) => boolean,
	incProductQuantity: (id: number) => void,
	decProductQuantity: (id: number) => void,
	updateCartQuantity: (id: number, quantity: number) => void,
}
