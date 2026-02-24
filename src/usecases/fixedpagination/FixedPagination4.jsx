import { usePagination } from "@unbxd-ui/react-search-hooks";

const FixedPagination4 = () => {
    const {
        currentPage,
        totalPages,
        goToPage
    } = usePagination();

    const pageLimit = 5; 

   
  
    let pages = Math.min(totalPages, pageLimit);
    let startPoint = Math.max(1, currentPage - Math.floor(pageLimit / 2));

    if (startPoint + pages - 1 > totalPages) {
        startPoint = Math.max(1, totalPages - pages + 1);
    }

    const pageNumbers = [];
    for (let i = startPoint; i < startPoint + pages && i <= totalPages; i++) {
        pageNumbers.push(i);
    }
    // // Generate array of page numbers
    // const pageNumbers = [];
    // for (let i = 1; i <= totalPages; i++) {
    //     pageNumbers.push(i);
    // }

    const handlePageChange = (event) => {
        const pageNum = Number(event.target.value);
        goToPage(pageNum);
    };

    return (
        <div className="fixed-pagination-wrapper">
            <label>Page: </label>
            <select
                value={currentPage || 1}
                onChange={handlePageChange}
                className="paginationdropdown"
            >
                {pageNumbers.map(pageNum => (
                    <option key={pageNum} value={pageNum}>
                        {pageNum} 
                    </option>
                ))}
            </select>
            <span> of {totalPages}</span>
        </div>
    );
};

export default FixedPagination4;