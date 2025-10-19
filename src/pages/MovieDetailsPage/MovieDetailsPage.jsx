import { useState, useEffect } from "react";
import { useParams, Link, Routes, Route, useLocation } from "react-router-dom";
import { fetchMovieDetails } from "../../api/tmdb-api";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";
import styles from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      const data = await fetchMovieDetails(movieId);
      setMovie(data);
    };
    getMovieDetails();
  }, [movieId]);

  if (!movie) return <div className={styles.loading}>Loading...</div>;

  const goBackLink = location.state?.from || "/movies";

  return (
    <div className={styles.container}>
      <Link to={goBackLink} className={styles.goBack}>
        ← Go Back
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
          <p className={styles.overview}>{movie.overview}</p>
          <p>
            <strong>Genres:</strong>{" "}
            {movie.genres.map((g) => g.name).join(", ")}
          </p>
          <p>
            <strong>Release date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average}
          </p>
        </div>
      </div>

      <div className={styles.additional}>
        <h2>Additional information</h2>
        <ul className={styles.links}>
          <li>
            <Link to="cast" state={{ from: goBackLink }}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" state={{ from: goBackLink }}>
              Reviews
            </Link>
          </li>
        </ul>

        <Routes>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Routes>
      </div>
    </div>
  );
};

export default MovieDetailsPage;



