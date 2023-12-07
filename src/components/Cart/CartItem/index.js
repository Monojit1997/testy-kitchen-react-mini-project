import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'
import {HiOutlineMinusSm} from 'react-icons/hi'
import {BsPlus} from 'react-icons/bs'
import './index.css'

class CartItem extends Component {
  increment = () => {
    const {eachCartItem, incrementQuantity} = this.props
    incrementQuantity(eachCartItem.id)
  }

  decrement = () => {
    const {eachCartItem, decrementQuantity} = this.props
    decrementQuantity(eachCartItem.id)
  }

  render() {
    const {eachCartItem} = this.props
    const price = eachCartItem.cost * eachCartItem.quantity
    console.log(price)
    return (
      <li className="order-item-list-container" data-testid="cartItem">
        <div className="fooditem-heading-and-image-container">
          <img
            src={eachCartItem.imageUrl}
            alt="cart-item"
            className="item-img"
          />
          <h1 className="food-title">{eachCartItem.name}</h1>
        </div>
        <div className="count-container">
          <div className="each-item-counter-container">
            <button
              aria-label="minus"
              data-testid="decrement-quantity"
              type="button"
              className="minus-icon-container"
              onClick={this.decrement}
            >
              <HiOutlineMinusSm className="minus-icon" />
            </button>
            <p data-testid="item-quantity" className="count-value">
              {eachCartItem.quantity}
            </p>
            <button
              aria-label="plus"
              data-testid="increment-quantity"
              type="button"
              className="plus-icon-container"
              onClick={this.increment}
            >
              <BsPlus className="plus-icon" />
            </button>
          </div>
        </div>
        <div className="price-container">
          <BiRupee />
          <p data-testid="total-price">{eachCartItem.cost}</p>
        </div>
      </li>
    )
  }
}

export default CartItem
