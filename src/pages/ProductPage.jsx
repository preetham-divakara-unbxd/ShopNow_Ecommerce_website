import { useLocation } from 'react-router';
import { UnbxdShoppingAssistantWrapper } from "@unbxd-ui/react-shopping-assistant-hooks";
import ChatbotPanel from './ChatbotPanel';

const ProductPage = () => {
    const { state } = useLocation();
    const product = state?.product;
    console.log("product", product);

    const productId = product?.uniqueId;

    if (!product) return <div className="product-not-found">Product not found</div>;

    return (
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
                        <h1 className="product-page-title">{product.title}</h1>
                        <div className="product-page-price">${product.price}</div>
                        <div className='product-page-description-title'>Description:</div>
                        <p className="product-page-description">{product.description}</p>
                        <button className="product-page-add-to-cart">Add to Cart</button>
                    </div>

                </div>
                <div className="product-page-chatbot">
                    <ChatbotPanel fullWidth={true} />
                </div>

            </div>
        </UnbxdShoppingAssistantWrapper>
    );
};
export default ProductPage;