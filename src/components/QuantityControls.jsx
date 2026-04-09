const QuantityControls = ({ quantity, onIncrease, onDecrease }) => {
    return (
        <div className="srp-qty-controls" onClick={(e) => e.stopPropagation()}>
            <button
                className="srp-qty-btn"
                onClick={(e) => {
                    e.stopPropagation();
                    onDecrease();
                }}
            >
                −
            </button>
            <span className="srp-qty-value">{quantity}</span>
            <button
                className="srp-qty-btn"
                onClick={(e) => {
                    e.stopPropagation();
                    onIncrease();
                }}
            >
                +
            </button>
        </div>
    );
};

export default QuantityControls;