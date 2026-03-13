import { useRecs } from "@unbxd-ui/react-recs-hooks";
import { useNavigate } from 'react-router';

const RecommendationsDisplay = () => {
    const { getSingleWidgetResponse, isLoading } = useRecs();
    const navigate = useNavigate();
    
    const widget = getSingleWidgetResponse("widget1");
    console.log("widget",widget)

    if (isLoading) return <div> <img src={"/blueLoader.svg"} alt="loader" /></div>;
    if (!widget || widget.count === 0) return null;

    return (
        <div className="recs-widget">
            <h2 className="recs-widget-title">{widget.widgetTitle}</h2>
            <div className="recs-products-scroll">
                {widget.recommendations.map(product => (
                    <div
                        key={product.uniqueId}
                        className="recs-product-card"
                        onClick={() => navigate(`/product/${product.uniqueId}`, { state: { product } })}
                    >
                        <img src={product.imageUrl?.[0]} alt={product.name} />
                        <div className="recs-product-name">{product.name}</div>
                        <div className="recs-product-price">${product.price}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecommendationsDisplay;