import { usePagination } from "@unbxd-ui/react-search-hooks";

const FixedPagination5 = () => {
    const {
        
        currentPage,
        totalPages,
        numberOfProducts,
        goToPage
    } = usePagination();


    const pageLimit = 10; 

  
    if (numberOfProducts === 0 || totalPages <= 1) {
        return null;
    }

    // Calculate which page numbers to show
    let pages = Math.min(totalPages, pageLimit);
    let startPoint = Math.max(1, currentPage - Math.floor(pageLimit / 2));

    // Adjust if we're near the end
    if (startPoint + pages - 1 > totalPages) {
        startPoint = Math.max(1, totalPages - pages + 1);
    }

    // Generate page numbers array
    const pageNumbers = [];
    for (let i = startPoint; i < startPoint + pages && i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    // Check if we need ellipsis and last page
    const showEllipsis = startPoint + pages - 1 < totalPages - 1;
    const showLastPage = showEllipsis;

    return (
        <div className="pagination-container1">

            <div>showing {((currentPage - 1) * 12 + 1)} to {Math.min(currentPage * 12, numberOfProducts)} out of {numberOfProducts} products</div>
            <div className="page-numbers">
                {pageNumbers.map(pageNum => {
                    const isActive = pageNum === currentPage;
                    return (
                        <button
                            key={pageNum}
                            className={`page-btn ${isActive ? "page-btn-active" : ""}`}
                            onClick={() => goToPage(pageNum)}
                        >
                            {pageNum}
                        </button>
                    );
                })}
                
                {showEllipsis && (
                    <>
                        <span className="page-ellipsis">...</span>
                        {showLastPage && (
                            <button
                                className={`page-btn ${totalPages === currentPage ? "page-btn-active" : ""}`}
                                onClick={() => goToPage(totalPages)}
                            >
                                {totalPages}
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default FixedPagination5;