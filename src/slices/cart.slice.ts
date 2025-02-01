import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// sepet elemanlarının tipi
export type CartItem = {
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

type CartAction = {
	type: ActionTypes;
	message: string;
};

type ActionTypes =
	| 'ADD_TO_CART'
	| 'REMOVE_FROM_CART'
	| 'CLEAR_CART'
	| 'INIT_CART';

// sepet state'inin tipi
type CartState = {
	cart: Cart;
	action: CartAction;
};

// initial state
const initialState: CartState = {
	cart: {
		items: [],
		total: 0,
	},
	action: { type: 'INIT_CART', message: 'Sepetiniz boş' },
};

const cartSlice = createSlice({
	name: 'cart',
	initialState: initialState,
	reducers: {
		// recuders içerisinde action senkron olarak çalışır
		// sepete ürün ekleme
		addToCart: (state: CartState, action: PayloadAction<CartItem>) => {
			const { id, name, price, quantity } = action.payload;
			state.action.type = 'ADD_TO_CART';
			// sepette aynı ürün varsa quantity arttırılır
			const index = state.cart.items.findIndex((item) => item.id === id);
			if (index === -1) {
				// yeni ürün eklenir
				state.action.message = 'Sepete Yeni ürün eklendi';
				state.cart.items.push({ id, name, price, quantity });
			} else {
				// aynı ürün varsa quantity arttırılır
				state.action.message =
					'Sepette aynı üründen mevcut. Ürünün adeti güncellendi';
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
			state.action.type = 'REMOVE_FROM_CART';

			const index = state.cart.items.findIndex((item) => item.id === id);
			if (index !== -1) {
				// sepette aynı ürün varsa quantity azaltılır
				state.cart.items[index].quantity -= quantity;
				// toplam fiyat güncellenir
				state.cart.total -= state.cart.items[index].price * quantity;
				// quantity 0'dan küçükse ürün silinir
				if (state.cart.items[index].quantity <= 0) {
					state.cart.items.splice(index, 1);
					state.action.message = 'Ürün sepetten çıkarıldı';
				} else {
					state.action.message = 'Ürün adeti düşürüldü';
				}
			}
		},
		resetMessage: (state: CartState) => {
			// action.message resetleme
			state.action.message = '';
		},
	},
	// extraReducers: (builder) => { // asenkron api call işlemleri burada yapılır
	//     // extraReducers içerisinde action asenkron olarak çalışır
	// }
});

export const { addToCart, removeFromCart, resetMessage } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
