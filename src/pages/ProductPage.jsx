import { useLocation, useOutletContext, useNavigate } from 'react-router';
import { UnbxdShoppingAssistantWrapper } from "@unbxd-ui/react-shopping-assistant-hooks";
import ChatbotPanel from './ChatbotPanel';
import { UnbxdRecsCSRWrapper } from "@unbxd-ui/react-recs-hooks";
import { Widget } from "@unbxd-ui/react-recs-components";
import RecommendationsDisplay from './RecommendationsDisplay';

// Import styles (optional)
import "@unbxd-ui/react-recs-components/styles/widget.css";
const ProductPage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const product = state?.product;
    console.log("product", product);
    
    const productId = product?.uniqueId;
    const { cartItems, addToCart } = useOutletContext();
    const isInCart = cartItems.some(item => item.uniqueId === product.uniqueId);
    if (!product) return <div className="product-not-found">Product not found</div>;

    return (
        <UnbxdRecsCSRWrapper
            sitekey={import.meta.env.VITE_UNBXD_SITE_KEY}
            apikey={import.meta.env.VITE_UNBXD_API_KEY}

            extraParams={{
                pageType: "PRODUCT",
                id: productId,
                uid: "user123",
            }}
        // allowCookies={true}

        >
            <UnbxdShoppingAssistantWrapper
                siteKey={import.meta.env.VITE_UNBXD_SITE_KEY}
                apiKey={import.meta.env.VITE_UNBXD_API_KEY}
                convStorageType="LOCALSTORAGE"
                convStorageName={`product-${productId}`}
                extraParams={{
                    uid: "user123",

                }}
                apiEndpoint="https://aus.assistant.unbxd.io"
                requestBody={() => {
                    const pathname = window.location.pathname;
                    if (pathname.startsWith('/product/')) {
                        return { pagetype: "pdp" };
                    }
                    return { pagetype: "home" };
                }}


            >
                <div className="product-page">

                    <div className="product-page-content">
                        <div className="product-page-image-wrapper">
                            <img src={product.imageUrl?.[0]} alt={product.title} />
                        </div>
                        <div className="product-page-details">
                            <h1 className="product-page-title">{product.title || product.name}</h1>
                            <div className="product-page-price">${product.price}</div>
                            <div className='product-page-description-title'>Description:</div>
                            <p className="product-page-description">{product.description}</p>
                            {isInCart ? (
                                <button className="product-page-add-to-cart go-to-cart" onClick={() => navigate('/cart')}>
                                    Go to Cart
                                </button>
                            ) : (
                                <button className="product-page-add-to-cart" onClick={() => addToCart(product)}>
                                    Add to Cart
                                </button>
                            )}
                        </div>

                    </div>
                    <div className="product-page-chatbot">
                        <ChatbotPanel fullWidth={true} />
                    </div>
                    <div className="recommendations-container">
                        {/* <Widget widgetId="widget1" /> */}
                        <RecommendationsDisplay />
                    </div>

                </div>
            </UnbxdShoppingAssistantWrapper>
        </UnbxdRecsCSRWrapper>
    );
};
export default ProductPage;