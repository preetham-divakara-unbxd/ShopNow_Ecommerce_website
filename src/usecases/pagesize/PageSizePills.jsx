import { usePageSize } from "@unbxd-ui/react-search-hooks";

const PageSizePills = () => {
    const { pageSize, setPageSize } = usePageSize([12, 16, 24]);
    
    const handlePageSizeChange = (pageSizeValue) => {
        // const numericValue = Number(pageSizeValue);
        setPageSize(pageSizeValue);
    };

    const pageSizeOptions = [12, 16, 24];

    return (
        <div className="page-size-container">
            <label>Products per page: </label>
            <div className="page-size-pills">
                {pageSizeOptions.map((option) => {
                    const isSelected = pageSize === option;
                    return (
                        <button
                            key={option}
                            className={`page-size-pill ${isSelected ? 'selected' : ''}`}
                            onClick={() => handlePageSizeChange(option)}
                        >
                            {option}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default PageSizePills;