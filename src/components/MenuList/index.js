import {Component} from 'react'
import {FaStar, FaRupeeSign} from 'react-icons/fa'
import {HiOutlineMinusSm} from 'react-icons/hi'
import {BsPlus} from 'react-icons/bs'
import './index.css'

class MenuList extends Component {
  state = {isFound: false, quantity: 0}

  findTheCartItemInList = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []
    const {eachItem} = this.props
    const cartItem = cartData.filter(each => each.id === eachItem.id)
    if (cartItem.length !== 0) {
      // console.log(cartItem)
      if (cartItem[0].quantity > 0) {
        this.setState({quantity: cartItem[0].quantity, isFound: true})
      } else if (cartItem[0].quantity < 1) {
        this.removeCartItem()
        this.setState({quantity: cartItem[0].quantity, isFound: false})
      }
    }
  }

  incrementCartItemQuantity = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const {eachItem} = this.props
    const updatedCartData = cartData.map(each => {
      if (each.id === eachItem.id) {
        const updatedQuantity = each.quantity + 1
        return {...each, quantity: updatedQuantity}
      }
      return each
    })
    console.log(updatedCartData)
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.findTheCartItemInList()
  }

  decrementCartItemQuantity = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const {eachItem} = this.props
    const updatedCartData = cartData.map(each => {
      if (each.id === eachItem.id) {
        // console.log('found')
        if (each.quantity > 0) {
          const updatedQuantity = each.quantity - 1
          return {...each, quantity: updatedQuantity}
        }
      }
      return each
    })
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.findTheCartItemInList()
  }

  removeCartItem = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const {eachItem} = this.props
    const updatedCartData = cartData.filter(
      eachCartItem => eachCartItem.id !== eachItem.id,
    )
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.findTheCartItemInList()
  }

  addCartItem = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []
    const {eachItem} = this.props
    const cartItem = {...eachItem, quantity: 1}
    cartData.push(cartItem)
    console.log(cartData)
    localStorage.setItem('cartData', JSON.stringify(cartData))
    this.findTheCartItemInList()
    this.setState({isFound: true})
  }

  render() {
    const {isFound, quantity} = this.state
    const {eachItem} = this.props
    const {id, cost, imageUrl, name, rating} = eachItem
    return (
      <li className="food-list-container" testid="foodItem">
        <img src={imageUrl} alt={name} className="food-image" />
        <div className="food-name-price-container">
          <h1 className="food-name">{name}</h1>
          <div className="food-rating-container">
            <FaRupeeSign />
            <p className="food-cost">{cost}</p>
          </div>
          <div className="food-rating-container">
            <FaStar className="star" />
            <p className="food-rating">{rating}</p>
          </div>
          {isFound ? (
            <div className="each-item-counter-container" id={id}>
              <button
                aria-label="decrement"
                type="button"
                className="icon-container"
                testid="decrement-count"
                onClick={this.decrementCartItemQuantity}
              >
                <HiOutlineMinusSm className="icon" />
              </button>
              <p type="button" className="count-value" testid="active-count">
                {quantity}
              </p>
              <button
                aria-label="increment"
                type="button"
                className="icon-container"
                testid="increment-count"
                onClick={this.incrementCartItemQuantity}
              >
                <BsPlus className="icon" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="add-button"
              onClick={this.addCartItem}
            >
              ADD
            </button>
          )}
        </div>
      </li>
    )
  }
}

export default MenuList
