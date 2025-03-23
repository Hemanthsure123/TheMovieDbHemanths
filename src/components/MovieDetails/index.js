import './index.css'
import {Component} from 'react'
import Header from '../Header'
import CastDetails from '../CastDetails'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class MovieDetails extends Component {
  state = {
    movieDetailsStatus: apiStatus.initial,
    movieDetailsData: [],
    castData: [],
  }

  componentDidMount() {
    this.getMovieDetails()
    this.getCastDetails()
  }

  getCastDetails = async () => {
    const apiKey = '02b615289b579ad135b0fd2ac28ccc47'
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en`
    const response = await fetch(url)
    const data = await response.json()
    const fetchedData = data.cast.map(eachItem => ({
      castImage: `https://image.tmdb.org/t/p/w500${eachItem.profile_path}`,
      originalName: eachItem.original_name,
      characterName: eachItem.character,
      id: eachItem.id,
    }))
    this.setState({castData: fetchedData})
  }

  getDuration = runtime => {
    if (runtime < 60) {
      return `${runtime} m`
    }
    const hours = Math.floor(runtime / 60)
    const minutes = runtime % 60
    return `${hours}h ${minutes}m`
  }

  getGenresList = genres => {
    const x = genres.map(eachItem => `${eachItem.name}, `)
    return x
  }

  getMovieDetails = async () => {
    this.setState({movieDetailsStatus: apiStatus.loading})
    const apiKey = '02b615289b579ad135b0fd2ac28ccc47'
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const fetchedData = {
        movieName: data.title,
        overview: data.overview,
        posterImage: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
        backdropImage: `https://image.tmdb.org/t/p/w500${data.backdrop_path}`,
        rating: data.vote_average,
        ratingsCount: data.vote_count,
        duration: this.getDuration(data.runtime),
        genresList: this.getGenresList(data.genres),
        releaseDate: data.release_date,
      }
      console.log(fetchedData)
      this.setState({
        movieDetailsStatus: apiStatus.success,
        movieDetailsData: fetchedData,
      })
    }
  }

  render() {
    const {movieDetailsData, movieDetailsStatus, castData} = this.state
    console.log(movieDetailsData)
    const {
      movieName,
      overview,
      posterImage,
      backdropImage,
      rating,
      ratingsCount,
      duration,
      genresList,
      releaseDate,
    } = movieDetailsData
    console.log(genresList)
    return (
      <div className="movie-details-container">
        <Header />
        <div className="movie-details-body">
          <img src={posterImage} alt={movieName} className="movie-detail-png" />
          <h1 className="movie-detail-heading">{movieName}</h1>
          <p className="movie-detail-paragraph">{overview}</p>
          <div className="genres-list">
            <p className="genre-item">{genresList}</p>
          </div>
          <p className="release">Release: {releaseDate}</p>
          <div className="ratings-container">
            <p className="rating">Rating: {rating}</p>
            <p className="rating-count">Rating Count: {ratingsCount}</p>
          </div>
          <p className="duration">{duration}</p>
        </div>
        <h1 className="movie-cast-heading">Movie Cast</h1>
        <div className="cast-container">
          {castData.map(eachItem => (
            <CastDetails castDetails={eachItem} key={eachItem.id} />
          ))}
        </div>
      </div>
    )
  }
}

export default MovieDetails
