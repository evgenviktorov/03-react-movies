import axios from 'axios'
import type { Movie } from '../types/movie'

export const fetchMovies = async (query: string): Promise<Movie[]> => {
	const myKey = import.meta.env.VITE_TMDB_TOKEN

	const response = await axios.get(
		'https://api.themoviedb.org/3/search/movie',
		{
			params: {
				query,
				language: 'en-US',
				include_adult: false,
			},
			headers: {
				Authorization: `Bearer ${myKey}`,
				accept: 'application/json',
			},
		}
	)

	return response.data.results
}
