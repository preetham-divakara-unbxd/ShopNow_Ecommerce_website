// src/components/ProductDetails.jsx
import { useNavigate, useOutletContext } from 'react-router';
import QuantityControls from './QuantityControls';
const ProductDetails = ({ product }) => {
    const navigate = useNavigate();
    const { cartItems, addToCart, updateQuantity, removeFromCart } = useOutletContext();
    const cartItem = cartItems.find(item => item.uniqueId === product.uniqueId);
    // const isInCart = cartItems.some(item => item.uniqueId === product.uniqueId);

    return (
        <div className="product-page-content">
            <div className="product-page-image-wrapper">
                <img src={product.imageUrl?.[0]} alt={product.title} />
            </div>
            <div className="product-page-details">
                <h1 className="product-page-title">{product.title || product.name}</h1>
                <div className="product-page-price">${product.price}</div>
                <div className="product-page-description-title">Description:</div>
                <p className="product-page-description">{product.description}</p>
                {cartItem ? (
                    <QuantityControls
                       
                        quantity={cartItem.quantity}
                        onIncrease={() => updateQuantity(product.uniqueId, 1)}
                        onDecrease={() => cartItem.quantity === 1 ? removeFromCart(product.uniqueId) : updateQuantity(product.uniqueId, -1)}
                    />
                ) : (
                    <button className="product-page-add-to-cart" onClick={() => addToCart(product)}>
                        Add to Cart
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;