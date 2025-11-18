import { BrowserRouter, Routes, Route } from 'react-router';
import { withProvider } from '../shared/utils';
import { Home } from '../pages/home';
import { Layout } from '../layouts/app';
import './style/index.css'

const ROUTES = [
	{
		path: '/',
		element: <Home />,
	}
];

export const App = withProvider(BrowserRouter)(() => {
	return (
		<Layout>
			<Routes>
				{ROUTES.map(({ path, element }) => (
					<Route key={path} path={path} element={element} />
				))}
			</Routes>
		</Layout>
	);
});