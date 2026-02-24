import { usePagination } from "@unbxd-ui/react-search-hooks";

const FixedPagination3 = () => {
    const {
        currentPage,
        totalPages,
        numberOfProducts,
        goToPage,
        goToFirstPage,
        goToLastPage,
        goToNextPage,
        goToPreviousPage,
        isFirstPage,
        isLastPage
    } = usePagination();

    const pageLimit = 5;

    if (numberOfProducts === 0 || totalPages <= 1) {
        return null;
    }


    let pages = Math.min(totalPages, pageLimit);
    let startPoint = Math.max(1, currentPage - Math.floor(pageLimit / 2));

    if (startPoint + pages - 1 > totalPages) {
        startPoint = Math.max(1, totalPages - pages + 1);
    }

    const pageNumbers = [];
    for (let i = startPoint; i < startPoint + pages && i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const showEllipsis = startPoint + pages - 1 < totalPages - 1;

    return (
        <div className="pagination-container">
            <div className="page-numbers">
               
                <button
                    className="pagination-nav-btn"
                    onClick={goToFirstPage}
                    disabled={isFirstPage()}
                >
                    First
                </button>

      
                <button
                    className="pagination-nav-btn"
                    onClick={goToPreviousPage}
                    disabled={isFirstPage()}
                >
                    Previous
                </button>

     
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
                        <button
                            className={`page-btn ${totalPages === currentPage ? "page-btn-active" : ""}`}
                            onClick={() => goToPage(totalPages)}
                        >
                            {totalPages}
                        </button>
                    </>
                )}

                <button
                    className="pagination-nav-btn"
                    onClick={goToNextPage}
                    disabled={isLastPage()}
                >
                    Next
                </button>

           
                <button
                    className="pagination-nav-btn"
                    onClick={goToLastPage}
                    disabled={isLastPage()}
                >
                    Last
                </button>
            </div>
        </div>
    );
};

export default FixedPagination3;