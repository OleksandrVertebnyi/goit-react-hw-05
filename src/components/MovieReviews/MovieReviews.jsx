import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../api/tmdb-api";
import styles from "./MovieReviews.module.css";


const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const getCast = async () => {
      const data = await fetchMovieCast(movieId);
      setCast(data);
    };
    getCast();
  }, [movieId]);

  if (cast.length === 0) return <p>No cast information available.</p>;

  return (
    <ul className={styles.list}>
      {cast.map((actor) => (
        <li key={actor.id} className={styles.item}>
          {actor.profile_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              alt={actor.name}
              className={styles.photo}
            />
          ) : (
            <div className={styles.noPhoto}>No Image</div>
          )}
          <p className={styles.name}>{actor.name}</p>
          <p className={styles.character}>{actor.character}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
