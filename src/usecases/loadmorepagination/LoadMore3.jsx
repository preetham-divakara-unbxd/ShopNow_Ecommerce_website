import { usePagination, useProducts } from "@unbxd-ui/react-search-hooks";


const LoadMore1 = () => {
    const {
        loadNextPage,
        isLastPage
    } = usePagination();
    const { loading, products, numberOfProducts } = useProducts();

    // console.log("Loading state in LoadMore1:", loading);

    const currentShown = products.length;
    const progressPercent = numberOfProducts > 0
        ? Math.round((currentShown / numberOfProducts) * 100)
        : 0;


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
                <>
                    <progress
                        value={currentShown}
                        max={numberOfProducts}
                        className="progress-bar"
                    >
                        {progressPercent}%
                    </progress>

                    <button
                        className="load-more-btn"
                        onClick={loadNextPage}
                    >
                        Load More
                    </button>
                </>
            )}
        </div>
    );
};

export default LoadMore1;