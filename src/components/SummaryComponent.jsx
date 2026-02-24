import { useQuery } from "@unbxd-ui/react-search-hooks";
import { useProducts } from "@unbxd-ui/react-search-hooks";
import RefreshButton from "./RefreshButton";

const SummaryComponent = () => {
    const { query } = useQuery();
    const { start = 0, numberOfProducts = 0, products = [] } = useProducts();
 
    const pageSize = products.length > 0 ? products.length : 12;
   
    const pageStart = numberOfProducts > 0 ? start + 1 : 0;
    const pageEnd = Math.min(start + pageSize, numberOfProducts);


    const displayQuery = query === '*' ? '' : query;

    if (numberOfProducts === 0) {
        return null;
    }

    return (
        <div className="spellcheck-wrapper">
            {displayQuery && (
                <div className="spellcheck-text">
                    Showing results for <strong>{displayQuery}</strong>
                </div>
            )}
            <div className="spellcheck-summary">
                {pageStart} - {pageEnd} of {numberOfProducts} products <RefreshButton />
            </div>
        </div>
    );
};

export default SummaryComponent;