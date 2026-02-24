import { usePagination,useProducts } from "@unbxd-ui/react-search-hooks";


const LoadMore1 = () => {
    const {
        loadNextPage,
        isLastPage
    } = usePagination();

    const { loading } = useProducts();

    console.log("Loading state in LoadMore1:", loading);

    if (isLastPage()) {
        return null;
    }

    return (
        <div className="load-more-wrapper">
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

export default LoadMore1;