import { useOutletContext, useNavigate } from 'react-router';

const OrdersPage = () => {
    const { orders } = useOutletContext();
    const navigate = useNavigate();

    if (orders.length === 0) {
        return (
            <div className="cart-empty">
                <h2 className="cart-empty-title">No Orders Yet</h2>
                <button className="cart-empty-btn" onClick={() => navigate('/search')}>Start Shopping</button>
            </div>
        );
    }

    return (
        <div className="orders-page">
            <h2 className="orders-heading">My Orders</h2>
            {orders.map(order => (
                <div key={order.id} className="order-card">
                    <div className="order-card-header">
                        <span className="order-date">Ordered on {order.date}</span>
                        <span className="order-total">Total: ${order.total.toFixed(2)}</span>
                    </div>
                    <div className="order-items">
                        {order.items.map(item => (
                            <div key={item.uniqueId} className="order-item">
                                <img className="order-item-img" src={item.imageUrl?.[0] || item.imageUrl} alt={item.title} />
                                <div className="order-item-details">
                                    <div className="order-item-title">{item.title}</div>
                                    <div className="order-item-price">${item.price} x {item.quantity}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrdersPage;