  
import {useNavigate } from 'react-router';
  const Order = () => {
      const navigate=useNavigate();
  return (
      <div className="order-page">
            <div className="order-success-overlay">
                <div className="order-success-modal">
                    <div className="order-success-icon">🎉</div>
                    <h2>Congratulations!</h2>
                    <p>Your order has been placed successfully.</p>
                    <div className="order-success-btns">
                      
                        <button onClick={() => navigate('/search')}>Continue Shopping</button>
                    </div>
                </div>
            </div>
            </div>
        );
        

    }

    export default Order;