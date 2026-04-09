// src/components/QuickViewModal.jsx
import ProductDetails from './ProductDetails';

const QuickViewModal = ({ product, onClose }) => {
    if (!product) return null;

    return (
        <div className="quick-view-overlay" onClick={onClose}>
            <div className="quick-view-modal" onClick={(e) => e.stopPropagation()}>
                <button className="quick-view-close" onClick={onClose}>&times;</button>
                <ProductDetails product={product} />
            </div>
        </div>
    );
};

export default QuickViewModal;