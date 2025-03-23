import {Link} from 'react-router-dom'
import './index.css'

const MovieCard = props => {
  const {movieDetails} = props
  const {id, title, posterPath, voteAverage} = movieDetails

  return (
    <li className="movie-card">
      <img className="movie-card-image" alt={title} src={posterPath} />
      <h1 className="movie-card-heading">{title}</h1>
      <p className="movie-card-rating">Rating: {voteAverage}</p>
      <Link to={`/movie/${id}`}>
        <button className="movie-card-button" type="button">
          View Details
        </button>
      </Link>
    </li>
  )
}

export default MovieCard
