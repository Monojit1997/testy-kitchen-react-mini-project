import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'

import './index.css'

const Restaurant = props => {
  const {eachItem} = props
  const {id, name, cuisine, imageUrl, userRating} = eachItem
  return (
    <Link to={`restaurant/${id}`} className="link-style">
      <li className="eachrestaurant-container">
        <img src={imageUrl} alt="restaurant" className="restaurants-image" />
        <div className="restaurant-name-container">
          <h1 className="restaurant-name">{name}</h1>
          <p className="restaurant-type">{cuisine}</p>
          <div className="rating-container">
            <FaStar className="star" />
            <span className="rating">
              {userRating.rating} ({userRating.totalReviews} ratings)
            </span>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default Restaurant
