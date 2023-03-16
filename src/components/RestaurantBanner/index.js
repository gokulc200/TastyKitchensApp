import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'

import './index.css'

const RestaurantBanner = props => {
  const {restaurantData} = props
  const {
    name,
    imageUrl,
    cuisine,
    location,
    rating,
    costForTwo,
    reviewsCount,
  } = restaurantData

  return (
    <div className="restaurant-banner">
      <img className="restaurant-image" src={imageUrl} alt="restaurant" />

      <div className="restaurant-details-container">
        <h1 className="restaurant-name">{name}</h1>
        <p className="restaurant-cuisine">{cuisine}</p>
        <p className="restaurant-location">{location}</p>

        <div className="restaurant-banner-sub-container">
          <div>
            <div className="restaurant-rating-icon-container">
              <AiFillStar className="restaurant-star-icon" />
              <p className="restaurant-rating">{rating}</p>
            </div>
            <p className="restaurant-reviews">{reviewsCount}+ Ratings</p>
          </div>
          <hr className="vertical-hr" />
          <div>
            <div className="restaurant-rating-icon-container">
              <BiRupee className="restaurant-star-icon" />
              <p className="restaurant-rating">{costForTwo}</p>
            </div>
            <p className="restaurant-reviews">Cost for two</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestaurantBanner
