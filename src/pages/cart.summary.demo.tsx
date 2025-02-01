import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { removeFromCart } from '../slices/cart.slice';

// sepete eklenen ürünlerin gösteren component
function CartSummary() {
	// sepet state'ini alıyoruz
	const { cart } = useSelector((state: RootState) => state.cartReducer);
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
			{/* sepet ürünlerini listeledik */}
			{cart.items.map((item, index) => (
				<div key={index}>
					{item.name} - Toplam : {item.quantity} - {item.price}
					<button onClick={() => onRemoveCart(item)}>Sepetten Çıkar</button>
				</div>
			))}
			<p>Ara Toplam: {cart.total}</p>
		</>
	);
}

export default CartSummary;
