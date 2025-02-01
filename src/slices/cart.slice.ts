import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// sepet elemanlarının tipi
type CartItem = {
	id: number;
	name: string;
	price: number;
	quantity: number;
};

// sepetteki toplam ürün sayısı ve fiyatı
type Cart = {
	items: CartItem[];
	total: number;
};

// sepet state'inin tipi
type CartState = {
	cart: Cart;
};

// initial state
const initialState: CartState = {
	cart: {
		items: [],
		total: 0,
	},
};

const cartSlice = createSlice({
	name: 'cart',
	initialState: initialState,
	reducers: {
		// recuders içerisinde action senkron olarak çalışır
		// sepete ürün ekleme
		addToCart: (state: CartState, action: PayloadAction<CartItem>) => {
			const { id, name, price, quantity } = action.payload;
			// sepette aynı ürün varsa quantity arttırılır
			const index = state.cart.items.findIndex((item) => item.id === id);
			if (index === -1) {
				// yeni ürün eklenir
				state.cart.items.push({ id, name, price, quantity });
			} else {
				// aynı ürün varsa quantity arttırılır
				state.cart.items[index].quantity += quantity;
			}
			// toplam fiyat güncellenir
			state.cart.total += price * quantity;
		},
		// sepetten ürün çıkarma
		removeFromCart: (
			state: CartState,
			action: PayloadAction<{ id: number; quantity: number }>
		) => {
			const { id, quantity } = action.payload;

			const index = state.cart.items.findIndex((item) => item.id === id);
			if (index !== -1) {
				// sepette aynı ürün varsa quantity azaltılır
				state.cart.items[index].quantity -= quantity;
				// toplam fiyat güncellenir
				state.cart.total -= state.cart.items[index].price * quantity;
				// quantity 0'dan küçükse ürün silinir
				if (state.cart.items[index].quantity <= 0) {
					state.cart.items.splice(index, 1);
				}
			}
		},
	},
	// extraReducers: (builder) => { // asenkron api call işlemleri burada yapılır
	//     // extraReducers içerisinde action asenkron olarak çalışır
	// }
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
