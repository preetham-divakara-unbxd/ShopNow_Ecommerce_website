import { usePagination, useProducts } from "@unbxd-ui/react-search-hooks";
import { useEffect } from "react";

const LoadMore1 = ({ children }) => {
    const {
        loadNextPage,
        isLastPage,
        isFirstPage,
        loadPreviousPage
    } = usePagination();
    const { loading, numberOfProducts } = useProducts();
    
    useEffect(() => {
        if (!isFirstPage()) {
            loadPreviousPage();
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (loading) return;
            if (window.scrollY <= 400 && !isFirstPage()) {
                loadPreviousPage();
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading]);

    //console.log("Loading state in LoadMore1:", loading);

    // if (isLastPage() || numberOfProducts === 0) {
    //     return null;
    // }

    return (
        <div className="load-more-wrapper">
            {loading && !isFirstPage() && (
                <div className="load-more-loader">
                    <img src="/blueLoader.svg" alt="Loading..." />
                </div>
            )}
            {children}
            {!isLastPage() && numberOfProducts > 0 && (
                loading ? (
                    <div className="load-more-loader">
                        <img src="/blueLoader.svg" alt="Loading..." />
                    </div>
                ) : (
                    <button className="load-more-btn" onClick={loadNextPage}>
                        Load More
                    </button>
                )
            )}
        </div>
    );
};

export default LoadMore1;