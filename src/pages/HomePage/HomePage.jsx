import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { fetchTrendingMovies } from "../../api/tmdb-api";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();

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
      <ul className={styles.list}>
        {movies.map((movie) => (
          <li key={movie.id} className={styles.item}>
            <Link
              to={`/movies/${movie.id}`}
              state={{ from: location }}
              className={styles.link}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
