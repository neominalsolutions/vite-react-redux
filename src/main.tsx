import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './store.ts';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CartDemo from './pages/cart.demo.tsx';
import CartSummary from './pages/cart.summary.demo.tsx';

const router = createBrowserRouter([
	{
		path: '/counter-demo',
		Component: App,
	},
	{
		path: '/cart-demo',
		Component: CartDemo,
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
