import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../api/tmdb-api";
import styles from "./HomePage.module.css";
import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  

  useEffect(() => {
    const getMovies = async () => {
      try {
        const trending = await fetchTrendingMovies();
        setMovies(trending);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };
    getMovies();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Trending today</h1>
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default HomePage;


