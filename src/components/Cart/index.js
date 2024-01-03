import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BiRupee} from 'react-icons/bi'
import {FaCheckCircle} from 'react-icons/fa'
import CartItem from './CartItem'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const cartStatusConstants = {
  initial: 'INITIAL',
  cartItemsFound: 'SUCCESS',
  noCartItems: 'FAILURE',
  paymentSuccess: 'PAYMENT',
}

class Cart extends Component {
  state = {cartData: [], cartStatus: cartStatusConstants.initial}

  componentDidMount() {
    this.getTheCartData()
  }

  getTheCartData = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []
    if (cartData.length === 0) {
      this.setState({
        cartStatus: cartStatusConstants.noCartItems,
      })
    } else {
      const cartItems = cartData.map(each => ({
        cost: each.cost,
        quantity: each.quantity,
        id: each.id,
        imageUrl: each.imageUrl,
        name: each.name,
      }))
      this.setState({
        cartStatus: cartStatusConstants.cartItemsFound,
        cartData: cartItems,
      })
    }
  }

  incrementCartItemQuantity = id => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const updatedCartData = cartData.map(eachItem => {
      if (eachItem.id === id) {
        console.log(eachItem.quantity)
        const updatedQuantity = eachItem.quantity + 1
        return {...eachItem, quantity: updatedQuantity}
      }
      return eachItem
    })
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.getTheCartData()
  }

  // decrement the cart quantity

  decrementCartItemQuantity = id => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const updatedCartData = cartData.map(eachItem => {
      if (eachItem.id === id) {
        if (eachItem.quantity > 0) {
          console.log(eachItem.quantity)
          const updatedQuantity = eachItem.quantity - 1
          console.log('updated:>>', updatedQuantity)
          return {...eachItem, quantity: updatedQuantity}
        }
      }
      return eachItem
    })
    this.removeCartItem(updatedCartData)
  }

  // remove the item

  removeCartItem = updatedData => {
    const updatedCartData = updatedData.filter(
      eachCartItem => eachCartItem.quantity > 0,
    )
    console.log(updatedCartData)
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.getTheCartData()
  }

  calculateTheTotalAmount = () => {
    const {cartData} = this.state
    const amountList = cartData.map(each => each.quantity * each.cost)
    const totalAmount = amountList.reduce((a, b) => a + b)
    return totalAmount
  }

  cartEmptyView = () => (
    <div>
      <img
        src="https://res.cloudinary.com/dppqkea7f/image/upload/v1625831743/cart-no-order_qivsro.png"
        alt="empty cart"
      />
      <h1>No Order Yet!</h1>
      <p>Your cart is empty. Add something from the menu.</p>
      <Link to="/" style={{textDecoration: 'none'}}>
        <button type="button">Order Now</button>
      </Link>
    </div>
  )

  paymentSuccessfulView = () => (
    <div className="payment-successful-container">
      <FaCheckCircle className="payment-done" />
      <h1 className="successful-heading">Payment Successful</h1>
      <p className="successful-paragraph">
        Thank you for ordering Your payment is successfully completed.
      </p>
      <Link to="/" style={{textDecoration: 'none'}}>
        <button type="button" className="home-page-button">
          Go To Home Page
        </button>
      </Link>
    </div>
  )

  cartItemsView = () => {
    const {cartData} = this.state
    console.log(cartData)
    const totalAmount = this.calculateTheTotalAmount()
    return (
      <>
        <div className="order-item-preview-container">
          <div className="order-details-container">
            <div className="order-item-heading-container">
              <h1 className="order-item-heading">Item</h1>
              <h1 className="order-item-heading">Quantity</h1>
              <h1 className="order-item-heading">Price</h1>
            </div>
            <ul className="food-order-item-list-container">
              {cartData.map(eachItem => (
                <CartItem
                  key={eachItem.id}
                  eachCartItem={eachItem}
                  incrementQuantity={this.incrementCartItemQuantity}
                  decrementQuantity={this.decrementCartItemQuantity}
                />
              ))}
            </ul>
            <hr />
            <div className="total-price-container">
              <h1 className="order-total-heading">Order Total:</h1>
              <div className="price-container">
                <BiRupee />
                <p>{totalAmount}.00</p>
              </div>
            </div>
            <div className="payment-button-container">
              <button
                type="button"
                onClick={this.placeOrder}
                className="payment-button"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }

  goToHomePage = () => {
    const {history} = this.props
    history.replace('/')
  }

  placeOrder = () => {
    this.setState({cartStatus: cartStatusConstants.paymentSuccess})
    localStorage.clear('cartData')
  }

  onRenderDisplayCartPage = () => {
    const {cartStatus} = this.state
    switch (cartStatus) {
      case cartStatusConstants.cartItemsFound:
        return this.cartItemsView()
      case cartStatusConstants.noCartItems:
        return this.cartEmptyView()
      case cartStatusConstants.paymentSuccess:
        return this.paymentSuccessfulView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="main-background-container">
          {this.onRenderDisplayCartPage()}
        </div>
        <Footer />
      </div>
    )
  }
}

export default Cart
