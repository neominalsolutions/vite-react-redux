import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, CartItem, resetMessage } from '../slices/cart.slice';
import { AppDispatch, RootState } from '../store';
import React from 'react';
import { productApiPost } from '../slices/product.slice';

function ProductDemo() {
	const dispatch = useDispatch<AppDispatch>();
	const { action, cart } = useSelector((state: RootState) => state.cartReducer);
	const { data, loading, error } = useSelector(
		(state: RootState) => state.productReducer
	);

	const inputRef = React.useRef<HTMLInputElement>(null);

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
	const onFormSubmit = (e: any) => {
		e.preventDefault();
		const productName = inputRef.current?.value;
		console.log('productName', productName);

		if (productName !== undefined) {
			// api call
			dispatch(productApiPost({ title: productName, price: 100 }));
		}

		console.log(productName);
	};

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

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<>
			{(action.type === 'ADD_TO_CART' || action.type === 'INIT_CART') && (
				<div style={{ color: 'green' }}>{action.message}</div>
			)}

			<form onSubmit={onFormSubmit}>
				<input ref={inputRef} type="text" placeholder="Ürün İsmi"></input>
				<input type="submit" value="Gönder" />
			</form>

			{data.map((product, index) => (
				<>
					<div key={index}>
						{product.name}
						<br></br>
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
					</div>
				</>
			))}
			<hr></hr>
			<Link to="/cart-summary-demo">Sepet Özeti</Link>
		</>
	);
}

export default ProductDemo;
