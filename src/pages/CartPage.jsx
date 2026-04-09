import { useOutletContext, useNavigate } from 'react-router';
import { UnbxdRecsCSRWrapper } from "@unbxd-ui/react-recs-hooks";
import RecommendationsDisplay from './RecommendationsDisplay';
// import { useState } from 'react';

const CartPage = () => {
    const { cartItems, removeFromCart, clearCart, cartCount, updateQuantity } = useOutletContext();
    // const [showOrderSuccess, setShowOrderSuccess] = useState(false);

    const handlePlaceOrder = () => {
      
        navigate('/order');
        clearCart();

    };
    const navigate = useNavigate();


    if (cartItems.length === 0) {
        return (
            <div className="cart-empty">
                <h2 className="cart-empty-title">Your Cart is Empty</h2>
                <button className="cart-empty-btn" onClick={() => navigate('/search')}>Continue Shopping</button>
            </div>
        );
    }

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <UnbxdRecsCSRWrapper
            sitekey={import.meta.env.VITE_UNBXD_SITE_KEY}
            apikey={import.meta.env.VITE_UNBXD_API_KEY}

            extraParams={{
                pageType: "CART",
                uid: "user123",
            }}


        >
            <div className="cart-page">
                <h2 className="cart-heading">Shopping Cart ({cartCount} items)</h2>
                <div className="cart-items-list">
                    {cartItems.map(item => (
                        <div key={item.uniqueId} className="cart-item">
                            <img className="cart-item-img" src={item.imageUrl?.[0] || item.imageUrl} alt={item.title} />
                            <div className="cart-item-details">
                                <div className="cart-item-title">{item.title}</div>
                                <div className="cart-item-price">${item.price}</div>

                            </div>
                            <div className="cart-item-actions">
                                <div className="cart-qty-controls">
                                    <button className="cart-qty-btn" onClick={() => updateQuantity(item.uniqueId, -1)} disabled={item.quantity <= 1}>−</button>
                                    <span className="cart-qty-value">{item.quantity}</span>
                                    <button className="cart-qty-btn" onClick={() => updateQuantity(item.uniqueId, 1)}>+</button>
                                </div>
                                <button className="cart-item-remove" onClick={() => removeFromCart(item.uniqueId)}>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="cart-footer">
                    <div className="cart-total">Total: ${total.toFixed(2)}</div>
                    <div className="cart-footer-btns">
                        <button className="cart-clear-btn" onClick={clearCart}>Clear Cart</button>
                        <button className="cart-place-order-btn" onClick={handlePlaceOrder}>Place Order</button>
                    </div>
                </div>
               
                <div className="recommendations-container">

                    <RecommendationsDisplay />
                </div>
            </div>
        </UnbxdRecsCSRWrapper>
    );
};

export default CartPage;