import { usePagination } from "@unbxd-ui/react-search-hooks";
import { useEffect } from "react";

const FixedPagination1 = () => {
    const {
        currentPage,
        totalPages,
        numberOfProducts,
        goToPage
    } = usePagination();

    //   useEffect(() => {
    //     document.querySelector(".product-container")?.scrollIntoView({ 
    //         behavior: "smooth", 
    //         block: "start", 
    //         inline: "start" 
    //     });
    // }, [currentPage]);  // this should be on products 

    const pageLimit = 4; // Show max 5 page numbers

    // Don't show pagination if no products or only one page
    if (numberOfProducts === 0 || totalPages <= 1) {
        return null;
    }

    // Calculate which page numbers to show
    let pages = Math.min(totalPages, pageLimit);
    let startPoint = 1;
    // let startPoint = Math.max(1, currentPage - Math.floor(pageLimit / 2));
    // console.log("startPoint before adjustment:", startPoint, "currentPage:", currentPage, "totalPages:", totalPages);

    // Adjust if we're near the end
    // if (startPoint + pages - 1 > totalPages) {
    //     startPoint = Math.max(1, totalPages - pages + 1);
    // }

    // Generate page numbers array
    // const pageNumbers = [];
    // for (let i = startPoint; i < startPoint + pages && i <= totalPages; i++) {
    //     pageNumbers.push(i);
    // }
    const pageNumbers = [];
    for (let i = startPoint; i <= pageLimit && i <= totalPages; i++) {
        pageNumbers.push(i);
    }
    // Check if we need ellipsis and last page
    // const showEllipsis = startPoint + pages - 1 < totalPages - 1;
    // const showLastPage = showEllipsis;
    const pageNumbers1 = [];
    for (let i = totalPages - pages + 1; i <= totalPages; i++) {
        pageNumbers1.push(i);
    }
    return (
        <div className="pagination-container">
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

                {/* {showEllipsis && ( */}

                <span className="page-ellipsis">...</span>

                {/* {showLastPage && ( */}
                {pageNumbers1.map(pageNum => {

                    return (
                        <button
                            key={pageNum}
                            className={`page-btn ${pageNum === currentPage ? "page-btn-active" : ""}`}
                            onClick={() => goToPage(pageNum)}
                        >
                            {pageNum}
                        </button>
                    );
                })}


                {/* )} */}

                {/* // )} */}
            </div>
        </div>
    );
};

export default FixedPagination1;