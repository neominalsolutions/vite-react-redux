// 1. aşama: store oluşturulması
// 2. aşama: store'un provider ile uygulamaya eklenmesi
// 3.aşama: slice oluşturulması
// 4. aşama: slice içindeki reducer store'a eklenmesi
// 5. aşama: slice içindeki action'ların (useDispatch) kullanılması (UI Componentlerinden ya da başka bir yerden) veya  slice içindeki state'lerin (useSelector) kullanılması (UI Componentlerinden ya da başka bir yerden)

import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from './slices/counter.slice';

// store reducerlar ile ilgili state'leri tutar ve değiştirir
export const store = configureStore({
	reducer: { counterReducer }, // reducer'lar buraya eklenecek
});

// uygulama genelinde kullanılacak olan store'u export ediyoruz
// bütün stateler getState ile alınabilir ve dispatch ile değiştirilebilir
export type RootState = ReturnType<typeof store.getState>;
// dispatch fonksiyonunu kullanabilmek için bu tipi oluşturuyoruz
export type AppDispatch = typeof store.dispatch;
