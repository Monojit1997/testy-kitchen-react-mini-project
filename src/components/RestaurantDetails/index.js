import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaStar, FaRupeeSign} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import MenuList from '../MenuList'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RestaurantDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    currentRestaurantsDetails: {},
    menuListitem: [],
  }

  componentDidMount() {
    this.getCurrentRestauraantDetails()
  }

  getCurrentRestauraantDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const api = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(api, options)
    const data = await response.json()
    if (response.ok) {
      const updatedData = {
        id: data.id,
        cuisine: data.cuisine,
        imageUrl: data.image_url,
        location: data.location,
        name: data.name,
        rating: data.rating,
        reviewCount: data.reviews_count,
        costForTwo: data.cost_for_two,
      }
      const updatedMenuList = data.food_items.map(eachFood => ({
        cost: eachFood.cost,
        foodType: eachFood.food_type,
        imageUrl: eachFood.image_url,
        id: eachFood.id,
        rating: eachFood.rating,
        name: eachFood.name,
      }))
      this.setState({
        menuListitem: updatedMenuList,
        currentRestaurantsDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="jobs-loader-container" testid="restaurant-details-loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="jobs-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-img"
      />
      <h1 className="jobs-failure-heading-text">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="button"
        onClick={this.onClickGetResponse}
      >
        Retry
      </button>
    </div>
  )

  renderRestaurantDetails = () => {
    const {menuListitem, currentRestaurantsDetails} = this.state
    return (
      <>
        <div className="restaurant-details-container">
          <div className="restaurant-name-and-location-container">
            <img
              src={currentRestaurantsDetails.imageUrl}
              alt="restaurant"
              className="restaurant-logo"
            />
            <div className="name-container">
              <h1 className="each-restaurant-name">
                {currentRestaurantsDetails.name}
              </h1>
              <p className="each-restaurant-type">
                {currentRestaurantsDetails.cuisine}
              </p>
              <p className="each-restaurant-type">
                {currentRestaurantsDetails.location}
              </p>
              <div className="cost-container">
                <div>
                  <FaStar className="rating-icon" />
                  <p className="each-restaurant-rating">
                    {currentRestaurantsDetails.rating}
                  </p>
                  <p className="each-restaurant-rating">
                    {currentRestaurantsDetails.reviewCount}+ Ratings
                  </p>
                </div>
                <div>
                  <p className="each-restaurant-rating">
                    <FaRupeeSign />
                    {currentRestaurantsDetails.costForTwo}
                  </p>
                  <p className="each-restaurant-rating">Cost for two</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className="food-item-unorder-list-container">
          {menuListitem.map(eachItem => (
            <MenuList eachItem={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </>
    )
  }

  renderReataurantResults = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurantDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-details-container">
          {this.renderReataurantResults()}
        </div>
        <Footer />
      </>
    )
  }
}

export default RestaurantDetails
