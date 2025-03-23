import {Link, withRouter} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'

import SearchMoviesContext from '../../context/SearchMoviesContext'

import './index.css'

const Header = props => {
  const renderSearchBar = () => (
    <SearchMoviesContext.Consumer>
      {value => {
        const {
          onTriggerSearchingQuery,
          onChangeSearchInput,
          searchInput,
          apiStatus,
        } = value

        const onChangeHandler = event => onChangeSearchInput(event.target.value)

        const onSearchHandler = event => {
          event.preventDefault()
          const {history} = props
          onTriggerSearchingQuery()
          history.push(`/search`)
        }

        return (
          <div className="search-bar">
            <input
              type="text"
              className="search-input"
              onChange={onChangeHandler}
              value={searchInput}
              placeholder="Search"
            />
            <button
              className="search-btn"
              type="button"
              onClick={onSearchHandler}
            >
              <FaSearch />
            </button>
          </div>
        )
      }}
    </SearchMoviesContext.Consumer>
  )

  return (
    <nav className="header-container">
      <h1 className="movie-header-heading">movieDB</h1>
      <ul className="links-container">
        <li className="navigation-btn">
          <Link className="popular-button" to="/">
            Popular
          </Link>
        </li>
        <li className="navigation-btn">
          <Link className="popular-button" to="/top-rated">
            Top Rated
          </Link>
        </li>
        <li className="navigation-btn">
          <Link className="popular-button" to="/upcoming">
            Upcoming
          </Link>
        </li>
      </ul>
      {renderSearchBar()}
    </nav>
  )
}

export default withRouter(Header)
