import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../api/tmdb-api";
import styles from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const data = await fetchMovieReviews(movieId);
        setReviews(data || []);
      } catch (err) {
        setError("Error loading reviews");
        console.error(err);
      }
    };
    getReviews();
  }, [movieId]);

  if (error) return <p>{error}</p>;

  if (!Array.isArray(reviews) || reviews.length === 0) {
    return <p>No reviews available for this movie.</p>;
  }

  return (
    <ul className={styles.list}>
      {reviews.map((review) => (
        <li key={review.id} className={styles.item}>
          <h3 className={styles.author}>Author: {review.author}</h3>
          <p className={styles.content}>{review.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;
