import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
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
import { store } from './store.ts';

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<>
				<p style={{ padding: '10px' }}>
					<Link style={{ padding: 5 }} to="/counter-demo">
						Counter Demo
					</Link>
					<Link style={{ padding: 5 }} to="/product-demo">
						Product Demo
					</Link>
					<Link style={{ padding: 5 }} to="/cart-summary-demo">
						Cart Summary Demo
					</Link>
				</p>

				<Outlet />
			</>
		),
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
		],
	},
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
);
