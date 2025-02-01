import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { removeFromCart } from '../slices/cart.slice';
import { Link } from 'react-router-dom';

// sepete eklenen ürünlerin gösteren component
function CartSummary() {
	// sepet state'ini alıyoruz
	const { cart, action } = useSelector((state: RootState) => state.cartReducer);
	// sepetten ürün çıkarma işlemi için dispatch fonksiyonunu alıyoruz
	const dispatch = useDispatch<AppDispatch>();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onRemoveCart = (product: any) => {
		dispatch(
			removeFromCart({
				id: product.id,
				quantity: 1,
			})
		);
	};

	return (
		<>
			{action.type === 'REMOVE_FROM_CART' && (
				<>
					{' '}
					<div style={{ color: 'red' }}>{action.message}</div>{' '}
				</>
			)}
			{/* sepet ürünlerini listeledik */}
			{cart.items.map((item, index) => (
				<div key={index}>
					{item.name} - Toplam : {item.quantity} - {item.price}
					<button onClick={() => onRemoveCart(item)}>Sepetten Çıkar</button>
				</div>
			))}
			<p>Ara Toplam: {cart.total}</p>
			<hr></hr>
			<Link to="/product-demo">Ürün Ekleme Geri Dön</Link>
		</>
	);
}

export default CartSummary;
