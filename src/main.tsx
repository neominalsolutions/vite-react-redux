import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import CartSummary from './pages/cart.summary.demo.tsx';
import ProductDemo from './pages/product.demo.tsx';
import { store } from './store.ts';

const router = createBrowserRouter([
	{
		path: '/counter-demo',
		Component: App,
	},
	{
		path: '/cart-demo',
		Component: ProductDemo,
	},
	{
		path: '/cart-summary-demo',
		Component: CartSummary,
	},
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
);
