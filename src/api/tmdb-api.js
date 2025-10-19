import axios from 'axios';


const BASE_URL = 'https://api.themoviedb.org/3';
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const tmdb = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${API_TOKEN}`,
    },
});


export const fetchTrendingMovies = async () => {
    try {
        const response = await tmdb.get('/trending/movie/day');
        return response.data.results;
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        return [];
    }
};


export const searchMovies = async query => {
    try {
        const response = await tmdb.get('/search/movie', {
            params: {
                query,
                include_adult: false,
                language: 'en-US',
                page: 1,
            },
        });
        return response.data.results;
    } catch (error) {
        console.error('Error searching movies:', error);
        return [];
    }
};


export const fetchMovieDetails = async movieId => {
    try {
        const response = await tmdb.get(`/movie/${movieId}`, {
            params: {
                language: 'en-US',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        return null;
    }
};


export const fetchMovieCast = async movieId => {
    try {
        const response = await tmdb.get(`/movie/${movieId}/credits`, {
            params: {
                language: 'en-US',
            },
        });
        return response.data.cast;
    } catch (error) {
        console.error('Error fetching movie cast:', error);
        return [];
    }
};


export const fetchMovieReviews = async movieId => {
    try {
        const response = await tmdb.get(`/movie/${movieId}/reviews`, {
            params: {
                language: 'en-US',
                page: 1,
            },
        });
        return response.data.results;
    } catch (error) {
        console.error('Error fetching movie reviews:', error);
        return [];
    }
};




    