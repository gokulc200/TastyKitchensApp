/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {RiArrowDropLeftLine, RiArrowDropRightLine} from 'react-icons/ri'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import RestaurantHeader from '../RestaurantHeader'

import RestaurantCard from '../RestaurantCard'

import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class PopularRestaurants extends Component {
  state = {
    restaurantsList: [],
    isLoading: false,
    activePage: 1,
    sortOption: sortByOptions[1].value,
    totalPages: 0,
    searchInput: '',
  }

  componentDidMount() {
    this.getRestaurants()
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  getRestaurants = async () => {
    this.setState({isLoading: true})
    const {activePage, sortOption} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const limit = 9
    const offset = (activePage - 1) * limit
    const url = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${sortOption}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    const totalRestaurants = data.total
    const totalPages = Math.ceil(totalRestaurants / limit)
    const updatedData = data.restaurants.map(eachItem => ({
      id: eachItem.id,
      cuisine: eachItem.cuisine,
      imageUrl: eachItem.image_url,
      name: eachItem.name,
      rating: eachItem.user_rating.rating,
      totalReviews: eachItem.user_rating.total_reviews,
    }))
    this.setState({
      restaurantsList: updatedData,
      isLoading: false,
      totalPages,
    })
  }

  updateOption = option => {
    this.setState({sortOption: option}, this.getRestaurants)
  }

  decrementPage = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage - 1,
        }),
        this.getRestaurants,
      )
    }
  }

  incrementPage = () => {
    const {activePage} = this.state
    if (activePage < 4) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage + 1,
        }),
        this.getRestaurants,
      )
    }
  }

  renderPopularRestaurants = () => {
    const {
      restaurantsList,
      sortOption,
      activePage,
      totalPages,
      searchInput,
    } = this.state
    const searchResults = restaurantsList.filter(eachRestaurant =>
      eachRestaurant.name.toLowerCase().includes(searchInput.toLowerCase()),
    )
    const isTrue = searchResults.length > 0
    return (
      <div className="popular-restaurants">
        <RestaurantHeader
          sortOption={sortOption}
          sortByOptions={sortByOptions}
          updateOption={this.updateOption}
        />
        <hr className="hr-line" />
        <input
          type="search"
          className="search-input"
          placeholder="Search"
          value={searchInput}
          onChange={this.onChangeSearchInput}
        />
        <hr className="hr-line" />
        {isTrue ? (
          <ul className="restaurants-list">
            {searchResults.map(eachItem => (
              <RestaurantCard restaurant={eachItem} key={eachItem.id} />
            ))}
          </ul>
        ) : (
          <div className="no-restaurants">
            <h1 className="no-restaurants-heading">No Restaurants Found</h1>
          </div>
        )}
        <div className="pagination-container">
          <button
            type="button"
            className="pagination-button"
            onClick={this.decrementPage}
            // eslint-disable-next-line react/no-unknown-property
            testid="pagination-left-button"
          >
            <RiArrowDropLeftLine size={20} color="red" />
          </button>
          <p testid="active-page-number" className="page-count">
            {activePage}
          </p>
          <span
            className="page-count"
            style={{marginLeft: '5px', marginRight: '5px'}}
          >
            of
          </span>
          <p className="page-count"> {totalPages}</p>
          <button
            type="button"
            className="pagination-button"
            onClick={this.incrementPage}
            // eslint-disable-next-line react/no-unknown-property
            testid="pagination-right-button"
          >
            <RiArrowDropRightLine size={20} color="red" />
          </button>
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div className="carousel-loader" testid="restaurants-list-loader">
      <Loader type="ThreeDots" color="#F7931E" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return isLoading ? this.renderLoader() : this.renderPopularRestaurants()
  }
}

export default PopularRestaurants
