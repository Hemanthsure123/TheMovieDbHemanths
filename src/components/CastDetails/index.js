import './index.css'
import {Component} from 'react'

class CastDetails extends Component {
  render() {
    const {castDetails} = this.props
    const {castImage, originalName, characterName, id} = castDetails
    return (
      <div className="cast-card" key={id}>
        <img src={castImage} alt={originalName} className="cast-png" />
        <h1 className="cast-name">Original Name: {originalName}</h1>
        <p className="cast-details">Character Name: {characterName}</p>
      </div>
    )
  }
}

export default CastDetails
