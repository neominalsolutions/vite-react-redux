import { useState } from 'react';
import { useGetPokemonByNameQuery } from '../api/pokemon.api';

function PokemonDemo() {
	// rtk query sayesinde useEffect kullanmadan asenkron işlmelerimizi yapabiliriz.

	const names = ['bulbasaur', 'pikachu', 'charmander', 'squirtle'];

	const [pokemonName, setPokemonName] = useState('bulbasaur');

	const { data, isLoading, error, isError } =
		useGetPokemonByNameQuery(pokemonName);

	if (isLoading) return <div>Loading...</div>;

	if (isError) return <div>Error: {JSON.stringify(error)}</div>;

	if (data)
		return (
			<div>
				Ad: {data.name} Ağırlık: {data.weight}
				<button
					onClick={() =>
						setPokemonName(names[Math.round(Math.random() * names.length)])
					}
				>
					{pokemonName}
				</button>
			</div>
		);

	return <></>;
}

export default PokemonDemo;
