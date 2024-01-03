import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-heading-container">
        <img
          src="https://res.cloudinary.com/drjim6cqm/image/upload/v1700936460/Frame_275_ifpc9g.png"
          alt="website-footer-logo"
        />
        <h1 className="footer-heading">Tasty Kitchens</h1>
      </div>
      <p className="footer-paragraph">
        The only thing we are serious about is food. Contact us on
      </p>
      <div>
        <FaPinterestSquare className="social-media-style" />
        <FaInstagram className="social-media-style" />
        <FaTwitter className="social-media-style" />
        <FaFacebookSquare className="social-media-style" />
      </div>
    </div>
  )
}
