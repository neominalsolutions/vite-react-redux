import { createSlice, PayloadAction } from '@reduxjs/toolkit';

//slice içinde kullanılacak olan state'lerin tanımlanması
type CounterState = {
	count: number;
};

// state içindeki ilk değerlerin tanımlanması
const initialState: CounterState = {
	count: 0,
};

// slice oluşturulması
// slice, reducer ve action'ları bir arada tutar
const counterSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		increment: (state: CounterState) => {
			// state içindeki count değerini 1 arttırır counter/increment
			state.count += 1;
		},
		decrement: (state: CounterState) => {
			state.count -= 1;
		},
		incrementByAmount: (state: CounterState, action: PayloadAction<number>) => {
			// payload nedir?
			// action'ın içindeki veriyi almak için kullanılır
			state.count += action.payload;
		},
	},
});

// slice içinden actionları export etmek
// slice içinden reducer'ları export etmek
export const { increment, decrement, incrementByAmount } = counterSlice.actions; // action'ları export etmek
export const counterReducer = counterSlice.reducer; // reducer'ı export etmek
