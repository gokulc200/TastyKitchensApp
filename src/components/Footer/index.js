import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="logo-container">
      <img
        src="https://res.cloudinary.com/gokulc/image/upload/v1678465625/Frame_275_dpsm49.png"
        alt="website-footer-logo"
        className="logo"
      />
      <h1 className="footer-heading">Tasty Kitchens</h1>
    </div>
    <p className="footer-description">
      The only thing we are serious about is food.
      <br /> Contact us on
    </p>
    <div className="social-icons-container">
      <FaPinterestSquare
        testid="pintrest-social-icon"
        className="social-icon"
      />
      <FaInstagram testid="instagram-social-icon" className="social-icon" />
      <FaTwitter testid="twitter-social-icon" className="social-icon" />
      <FaFacebookSquare testid="facebook-social-icon" className="social-icon" />
    </div>
  </div>
)

export default Footer
