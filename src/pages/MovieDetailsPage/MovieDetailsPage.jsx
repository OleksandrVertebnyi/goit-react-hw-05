import { useEffect, useState, useRef } from "react";
import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { fetchMovieDetails } from "../../api/tmdb-api";
import styles from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();

  // ✅ «Заморожуємо» посилання назад один раз при першому рендері
  const backLinkRef = useRef(location.state?.from ?? "/");

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (e) {
        console.error("Error fetching movie details:", e);
      }
    };
    getMovieDetails();
  }, [movieId]);

  if (!movie) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      
      <Link to={backLinkRef.current} className={styles.goBack}>
        ← Go back
      </Link>

      <div className={styles.movieInfo}>
        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className={styles.poster}
          />
        )}
        <div className={styles.details}>
          <h1 className={styles.title}>{movie.title}</h1>
          {movie.overview && (
            <p className={styles.overview}>{movie.overview}</p>
          )}
          {movie.genres?.length > 0 && (
            <p>
              <strong>Genres:</strong>{" "}
              {movie.genres.map((g) => g.name).join(", ")}
            </p>
          )}
          {movie.release_date && (
            <p>
              <strong>Release date:</strong> {movie.release_date}
            </p>
          )}
          <p>
            <strong>Rating:</strong> {movie.vote_average}
          </p>
        </div>
      </div>

      <div className={styles.additional}>
        <h2>Additional information</h2>
        <ul className={styles.links}>
          
          <li>
            <Link to="cast" state={{ from: backLinkRef.current }}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" state={{ from: backLinkRef.current }}>
              Reviews
            </Link>
          </li>
        </ul>

        
        <Outlet />
      </div>
    </div>
  );
};

export default MovieDetailsPage;
