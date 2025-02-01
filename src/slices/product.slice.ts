import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// sürekli güncellemeyen veriler için tercih edilir.
const productFetchApi = createAsyncThunk('product/fetch', async () => {
	const response = await fetch('https://fakestoreapi.com/products');
	return response.json();
});

// POST, PUT, DELETE gibi işlemler için redux ile nasıl çalışıyoruz?
const productApiPost = createAsyncThunk(
	'product/post',
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async (data: any) => {
		const response = await axios.post(
			'https://fakestoreapi.com/products',
			data
		);
		return response.data; // action.payload olarak döner
	}
);

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
		builder.addCase(productFetchApi.pending, (state: ProductState) => {
			state.loading = true;
		});
		builder.addCase(productFetchApi.fulfilled, // resolved olduğunda
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
				state.loading = false;
			}
		);
		builder.addCase(productFetchApi.rejected, (state: ProductState) => {
			// hata olduğunda
			state.error = 'Veri çekilirken hata oluştu';
			state.loading = false;
		});
		builder.addCase(productApiPost.pending, (state: ProductState) => {
			state.loading = false;
		});
		builder.addCase(productApiPost.fulfilled,
			(
				state: ProductState,
				action: PayloadAction<{ id: number; title: string; price: number }>
			) => {
				// mapping işlemleri
				state.data = [
					{
						id: action.payload.id,
						name: action.payload.title,
						price: action.payload.price,
					},
					...state.data,
				];
				state.loading = false;
			}
		);
		builder.addCase(productApiPost.rejected, (state: ProductState) => {
			state.error = 'Veri Kaydederken hata oluştu';
			state.loading = false;
		});
	},
});

export const productReducer = productSlice.reducer;
export { productFetchApi as productApi, productApiPost }; // action creator dışarıdan çağrılabilir
