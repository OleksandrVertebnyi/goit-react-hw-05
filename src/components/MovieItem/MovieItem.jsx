import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./MovieItem.module.css";

const MovieItem = ({ id, title }) => {
  const location = useLocation();

  return (
    <li className={styles.item}>
      <Link
        to={`/movies/${id}`}
        state={{ from: location }}
        className={styles.link}>
        {title}
      </Link>
    </li>
  );
};

MovieItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default MovieItem;
