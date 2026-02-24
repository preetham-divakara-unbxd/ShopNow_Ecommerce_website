import { Link } from 'react-router'
import shopnowLogo from '../assets/shopnow.png'

function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        {/* Logo Section */}
        <div className="logo-section">
          {/* ShopNow Logo */}
          <img 
            src={shopnowLogo} 
            alt="ShopNow Logo" 
            className="logo-image-large"
          />
        </div>
        
        {/* Welcome Text */}
        <div className="welcome-section">
          <h1 className="welcome-title">Welcome to ShopNow</h1>
          <p className="welcome-description">
            Discover amazing products from thousands of brands. Shop with confidence and enjoy fast, 
            reliable delivery to your doorstep. Your one-stop destination for all your shopping needs.
          </p>
        </div>
        
        {/* Features */}
        <div className="features-section">
          <div className="feature-item">
            <div className="feature-icon">🚚</div>
            <p className="feature-text">Fast Delivery</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🔒</div>
            <p className="feature-text">Secure Payment</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">⭐</div>
            <p className="feature-text">Quality Products</p>
          </div>
        </div>
        
        {/* Search Button with Black Background */}
        <Link to="/search" className="search-button">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M14 14L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Search Products
        </Link>
      </div>
    </div>
  )
}

export default Home