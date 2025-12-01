import { BrowserRouter, Routes, Route } from 'react-router';
import { withProvider } from '../shared/utils';
import { Home } from '../pages/home';
import { Cart } from '../pages/cart';
import { Layout } from '../layouts/app';
import './style/index.css';
import { StoreProvider } from '../shared/utils/store-provider';
import { productsList } from '../shared/data/products';
import type { TProduct, TProductState } from '../entities/product';

const products: TProduct[] = productsList;
const initialState: Pick<TProductState, 'products'> = { products };

const ROUTES = [
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/cart',
		element: <Cart />,
	},
	{
		path: '*',
		element: <Home />,
	},
];

export const App = withProvider(BrowserRouter)(() => {
	return (
		<StoreProvider initialState={initialState}>
			<Layout>
				<Routes>
					{ROUTES.map(({ path, element }) => (
						<Route key={path} path={path} element={element} />
					))}
				</Routes>
			</Layout>
		</StoreProvider>
		
	);
});