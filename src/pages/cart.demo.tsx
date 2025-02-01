import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { addToCart, CartItem } from '../slices/cart.slice';

function CartDemo() {
	const dispatch = useDispatch<AppDispatch>();

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
			{products.map((product, index) => (
				<>
					<div key={index}>{product.name}</div>
					<button onClick={onAddCart}>Sepete Ekle</button>
				</>
			))}
		</>
	);
}

export default CartDemo;
