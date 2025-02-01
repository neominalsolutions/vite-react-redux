import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// sürekli güncellemeyen veriler için tercih edilir.
const productApi = createAsyncThunk('product/fetch', async () => {
	const response = await fetch('https://fakestoreapi.com/products');
	return response.json();
});

// fullfilled, pending, rejected

export type Product = { id: number; name: string; price: number };

export type ProductState = {
	data: Product[];
	loading: boolean;
	error: string;
};

const initialState: ProductState = { data: [], loading: false, error: '' };

const productSlice = createSlice({
	name: 'product',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		// async işlemler için ekstra reducerlar kullanılır
		// veri çekilirken ki asenkron işlem aşaması
		builder.addCase(productApi.pending, (state: ProductState) => {
			state.loading = true;
		});
		builder.addCase(
			productApi.fulfilled, // resolved olduğunda
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(state: ProductState, action: any) => {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				state.data = action.payload.map((item: any) => {
					return {
						id: item.id,
						name: item.title,
						price: item.price,
					} as Product;
				});
			}
		);
		builder.addCase(productApi.rejected, (state: ProductState) => {
			// hata olduğunda
			state.error = 'Veri çekilirken hata oluştu';
		});
	},
});

export const productReducer = productSlice.reducer;
export { productApi }; // action creator dışarıdan çağrılabilir
