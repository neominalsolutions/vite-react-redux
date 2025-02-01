import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { addToCart, CartItem, resetMessage } from '../slices/cart.slice';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function CartDemo() {
	const dispatch = useDispatch<AppDispatch>();
	const { action, cart } = useSelector((state: RootState) => state.cartReducer);

	useEffect(() => {
		// cleanup function
		return () => {
			console.log('component will unmount');
			// arayüzde temizlenmesi gereken değerler varsa temizlenir
			// slice üzerinden sadece değiştirilebilir.
			// action.message = '';
			dispatch(resetMessage());
		};
	}, []);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const products: any[] = [
		{ id: 1, name: 'Product 1', price: 100 },
		{ id: 2, name: 'Product 2', price: 200 },
		{ id: 3, name: 'Product 3', price: 300 },
	];

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onAddCart = (product: any) => {
		dispatch(
			addToCart({
				id: product.id,
				name: product.name,
				price: product.price,
				quantity: 1,
			} as CartItem)
		);
	};

	return (
		<>
			{(action.type === 'ADD_TO_CART' || action.type === 'INIT_CART') && (
				<div style={{ color: 'green' }}>{action.message}</div>
			)}

			{products.map((product, index) => (
				<>
					<div key={index}>{product.name}</div>
					<button
						style={{
							backgroundColor: cart.items.find((x) => x.id === product.id)
								? 'yellow'
								: 'default',
						}}
						onClick={() => onAddCart(product)}
					>
						Sepete Ekle
					</button>
				</>
			))}
			<hr></hr>
			<Link to="/cart-summary-demo">Sepet Özeti</Link>
		</>
	);
}

export default CartDemo;
