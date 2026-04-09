import { usePagination } from "@unbxd-ui/react-search-hooks";
import { useEffect } from "react";

const FixedPagination1 = () => {
    const {
        currentPage,
        totalPages,
        numberOfProducts,
        goToPage
    } = usePagination();

      useEffect(() => {
        document.querySelector(".product-container")?.scrollIntoView({ 
            behavior: "smooth", 
            block: "start", 
            inline: "start" 
        });
    }, [currentPage]);  // this should be on products 

    const pageLimit = 4; 


    if (numberOfProducts === 0 || totalPages <= 1) {
        return null;
    }

    // Calculate which page numbers to show
      let pages = Math.min(totalPages, pageLimit);
    let startPoint = Math.max(1, currentPage - Math.floor(pageLimit / 2));
    // //console.log("startPoint before adjustment:", startPoint, "currentPage:", currentPage, "totalPages:", totalPages);

    // Adjust if we're near the end
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

               
            </div>
        </div>
    );
};

export default FixedPagination1;