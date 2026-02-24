import { usePagination,useProducts } from "@unbxd-ui/react-search-hooks";


const LoadMore2 = () => {
    const {
        loadNextPage,
        isLastPage
    } = usePagination();

    const { loading, products , numberOfProducts} = useProducts();

    // console.log("Loading state in LoadMore2:", loading);
    // console.log("Products in LoadMore2:", products);
    const currentShown = products.length;

    if (isLastPage()) {
        return null;
    }
    
    return (
        <div className="load-more-wrapper">
            <div>Showing {currentShown} out of {numberOfProducts} products</div>
            
            {loading ? (
                <div className="load-more-loader">
                    <img src="/blueLoader.svg" alt="Loading..." />
                </div>
            ) : (
                <button
                    className="load-more-btn"
                    onClick={loadNextPage}
                >
                    Load More
                </button>
            )}
        </div>
    );
};

export default LoadMore2;