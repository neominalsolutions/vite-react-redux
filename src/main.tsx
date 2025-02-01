import { createRoot } from 'react-dom/client';
import { Provider, useDispatch } from 'react-redux';
import {
	createBrowserRouter,
	Link,
	Outlet,
	RouterProvider,
} from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import CartSummary from './pages/cart.summary.demo.tsx';
import ProductDemo from './pages/product.demo.tsx';
import { AppDispatch, store } from './store.ts';
import { useEffect } from 'react';
import { productApi } from './slices/product.slice.ts';
import PokemonDemo from './pages/pokemon.demo.tsx';

const Layout = () => {
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		// sadece Layout componenti mount olduğunda çalışır
		dispatch(productApi()); // async thunk çalıştırılır
	}, []);

	return (
		<p style={{ padding: '10px' }}>
			<h1 className="text-3xl font-bold underline">Hello world!</h1>

			<Link style={{ padding: 5 }} to="/counter-demo">
				Counter Demo
			</Link>
			<Link style={{ padding: 5 }} to="/product-demo">
				Product Demo
			</Link>
			<Link style={{ padding: 5 }} to="/cart-summary-demo">
				Cart Summary Demo
			</Link>
			<Link style={{ padding: 5 }} to="/pokemon-demo">
				Pokemon Demo
			</Link>
			<Outlet />
		</p>
	);
};

const router = createBrowserRouter([
	{
		path: '/',
		Component: Layout,
		children: [
			{
				path: '/counter-demo',
				Component: App,
			},
			{
				path: '/product-demo',
				Component: ProductDemo,
			},
			{
				path: '/cart-summary-demo',
				Component: CartSummary,
			},
			{
				path: '/pokemon-demo',
				Component: PokemonDemo,
			},
		],
	},
]);

createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
);
