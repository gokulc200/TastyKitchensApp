import {Component} from 'react'

import PaymentView from '../PaymentView'
import CartItem from '../CartItem'

import CartTotal from '../CartTotal'

import CartContext from '../../context/CartContext'

import './index.css'

class CartListView extends Component {
  state = {
    isOrderPlaced: false,
  }

  orderPlaced = () => {
    this.setState(prevState => ({isOrderPlaced: !prevState.isOrderPlaced}))
  }

  render() {
    const {isOrderPlaced} = this.state
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList, removeAllCartItems} = value
          const onClickRemoveAllBtn = () => {
            removeAllCartItems()
          }
          return isOrderPlaced ? (
            <PaymentView />
          ) : (
            <div className="cart-content-container">
              <div className="cart-card-details">
                <div className="cart-heading-remove-all-btn">
                  <h1 className="cart-heading">My Cart</h1>
                  <button
                    type="button"
                    className="remove-all-btn"
                    onClick={onClickRemoveAllBtn}
                  >
                    Remove All
                  </button>
                </div>
                <div className="desktop-cart-header">
                  <h1 className="cart-header-item">Item</h1>

                  <h1 className="cart-header-quantity">Quantity</h1>
                  <h1 className="cart-header-price">price</h1>
                  <h1 className="cart-header-remove">remove</h1>
                </div>
                <ul className="cart-list">
                  {cartList.map(eachItem => (
                    <CartItem
                      key={eachItem.id}
                      cartItem={eachItem}
                      value={value}
                    />
                  ))}
                </ul>
              </div>
              <CartTotal orderPlaced={this.orderPlaced} />
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default CartListView
