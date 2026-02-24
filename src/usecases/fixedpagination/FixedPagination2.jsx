import { usePagination } from "@unbxd-ui/react-search-hooks";
 
const FixedPagination2 = () => {
    const {
        currentPage,
        totalPages,
        goToNextPage,
        goToPreviousPage,
        goToFirstPage,
        goToLastPage,
        isFirstPage,
        isLastPage,
    } = usePagination();

 
    return (
        <div className="fixed-pagination-wrapper">
            <button onClick={goToFirstPage} disabled={isFirstPage()}>
                First
            </button>
            <button onClick={goToPreviousPage} disabled={isFirstPage()}>
                Prev
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={goToNextPage} disabled={isLastPage()}>
                Next
            </button>
            <button onClick={goToLastPage} disabled={isLastPage()}>
                Last
            </button>
            {/* <p>Total Products: {numberOfProducts}</p> */}
          
        </div>
    );
};

export default FixedPagination2;