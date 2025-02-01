import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import {
	decrement,
	increment,
	incrementByAmount,
} from './slices/counter.slice';
import { AppDispatch, RootState } from './store';

function IncrementButton() {
	const dispatch = useDispatch<AppDispatch>();

	return <button onClick={() => dispatch(increment())}>+</button>;
}

function DecrementButton() {
	const dispatch = useDispatch<AppDispatch>();

	return <button onClick={() => dispatch(decrement())}>-</button>;
}

function IncrementByValue() {
	// useDispatch ile store'daki action'ları kullanabiliriz
	const dispatch = useDispatch<AppDispatch>();

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// input değeri kadar arttırma işlemi yapılacak
		dispatch(incrementByAmount(Number(e.target.value)));
	};

	return <input onChange={onInputChange} type="number" />;
}

function CounterLabel() {
	// useSelector ile store'daki state'leri alabiliriz
	// useContext yerine kullanılabilir
	const { count } = useSelector((state: RootState) => state.counterReducer);
	return (
		<div>
			<h1>Sayac: {count}</h1>
		</div>
	);
}

function App() {
	return (
		<>
			<IncrementButton />
			<DecrementButton />
			<IncrementByValue />
			<hr></hr>
			<CounterLabel />
		</>
	);
}

export default App;
