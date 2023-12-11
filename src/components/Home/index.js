import {Component} from 'react'
import Cookies from 'js-cookie'
import {MdSort} from 'react-icons/md'
import {FaAngleLeft, FaAngleRight} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import Header from '../Header'
import Footer from '../Footer'
import Restaurant from '../Restaurant'
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

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    Carousel: [],
    apiStatus: apiStatusConstants.initial,
    activePage: 1,
    sortBy: sortByOptions[1].value,
    restaurantsList: [],
  }

  componentDidMount() {
    this.getJobDetails()
    this.getRestaurantsList()
  }

  onDecresePageNumber = () => {
    const {activePage} = this.state
    if (activePage === 1) {
      this.setState({activePage: 1})
    } else {
      this.setState(
        prevState => ({
          activePage: prevState.activePage - 1,
        }),
        this.getRestaurantsList,
      )
    }
  }

  onIncreasePageNumber = () => {
    const {activePage} = this.state
    if (activePage === 4) {
      this.setState({activePage: 4})
    } else {
      this.setState(
        prevState => ({
          activePage: prevState.activePage + 1,
        }),
        this.getRestaurantsList,
      )
    }
  }

  onPageChange = () => {
    const {activePage} = this.state
    return (
      <div className="page-change-container-with-button">
        <FaAngleLeft
          testid="pagination-left-button"
          onClick={this.onDecresePageNumber}
        />
        <p>
          <span testid="active-page-number">{activePage}</span> of 4
        </p>
        <FaAngleRight
          testid="pagination-right-button"
          onClick={this.onIncreasePageNumber}
        />
      </div>
    )
  }

  getRestaurantsList = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {activePage, sortBy} = this.state
    const offset = (activePage - 1) * 9
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=9&sort_by_rating=${sortBy}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.restaurants.map(eachRestaurants => ({
        id: eachRestaurants.id,
        cuisine: eachRestaurants.cuisine,
        imageUrl: eachRestaurants.image_url,
        name: eachRestaurants.name,
        userRating: {
          rating: eachRestaurants.user_rating.rating,
          ratingColor: eachRestaurants.user_rating.rating_color,
          ratingText: eachRestaurants.user_rating.rating_text,
          totalReviews: eachRestaurants.user_rating.total_reviews,
        },
      }))
      this.setState({
        restaurantsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onRenderRestaurants = () => {
    const {restaurantsList} = this.state
    return (
      <ul className="restaurant-unorder-list">
        {restaurantsList.map(eachItem => (
          <Restaurant key={eachItem.id} eachItem={eachItem} />
        ))}
      </ul>
    )
  }

  onChangeSortByOption = event => {
    this.setState({sortBy: event.target.value}, this.getRestaurantsList)
  }

  getJobDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.setState({
        Carousel: data.offers,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div testid="restaurants-offers-loader" className="jobs-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderoffersview = () => {
    const {Carousel} = this.state
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
    }
    return (
      <Slider {...settings} className="carousal-container">
        {Carousel.map(eachImg => (
          <img src={eachImg.image_url} key={eachImg.id} alt="offer" />
        ))}
      </Slider>
    )
  }

  onRenderHeadingSection = () => {
    const {sortBy} = this.state
    return (
      <div className="heading-and-filter-container">
        <div>
          <h1 className="main-heading">Popular Restaurants</h1>
          <p className="heading-description">
            Select Your favourite restaurant special dish and make your day
            happy...
          </p>
        </div>
        <div className="filter-container">
          <MdSort />
          <p className="filter-heading">Sort by</p>
          <select
            className="filter-box"
            onChange={this.onChangeSortByOption}
            value={sortBy}
          >
            {sortByOptions.map(eachoptions => (
              <option key={eachoptions.id}>{eachoptions.displayText}</option>
            ))}
          </select>
        </div>
      </div>
    )
  }

  renderAlloffers = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderoffersview()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderLoadingView = () => (
    <div className="jobs-loader-container" testid="restaurants-list-loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onRestaurantslistview = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.onRenderRestaurants()
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
        <div className="carousal-container">{this.renderAlloffers()}</div>
        <div className="restaurants-container">
          {this.onRenderHeadingSection()}
          <hr className="horizontal-line" />
          {this.onRestaurantslistview()}
          {this.onPageChange()}
        </div>
        <Footer />
      </>
    )
  }
}

export default Home
