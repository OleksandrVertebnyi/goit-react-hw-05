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
        setReviews(data); 
      } catch (err) {
        setError("Failed to fetch reviews");
        console.error(err);
      }
    };
    getReviews();
  }, [movieId]);

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (reviews.length === 0) {
    return <p className={styles.empty}>No reviews for this movie.</p>;
  }

  return (
    <ul className={styles.list}>
      {reviews.map((review) => (
        <li key={review.id} className={styles.item}>
          <h3 className={styles.author}>Author: {review.author}</h3>
          {review.author_details?.rating && (
            <p className={styles.rating}>
              Rating: {review.author_details.rating}/10
            </p>
          )}
          <p className={styles.content}>{review.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;
