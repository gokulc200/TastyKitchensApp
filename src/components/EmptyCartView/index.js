import {Link} from 'react-router-dom'

import './index.css'

const EmptyCartView = () => (
  <div className="empty-cart-container">
    <img
      src="https://res.cloudinary.com/gokulc/image/upload/v1678464892/cooking_1_ygxdlg.png"
      alt="empty cart"
      className="empty-cart-image"
    />
    <h1 className="no-order-heading">No Order Yet!</h1>
    <p className="no-order-text">
      Your cart is empty. Add something from the menu.
    </p>
    <Link to="/">
      <button type="button" className="order-btn">
        Order Now
      </button>
    </Link>
  </div>
)

export default EmptyCartView
