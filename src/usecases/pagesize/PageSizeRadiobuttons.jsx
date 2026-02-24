import { usePageSize } from "@unbxd-ui/react-search-hooks";

const PageSizeRadiobuttons = () => {
    const { pageSize, setPageSize } = usePageSize([12, 16, 24]);
    
    const pageSizeOptions = [12, 16, 24];

    return (
        <div className="page-size-container">
            <label>Products per page: </label>
            <div className="page-size-radio-group">
                {pageSizeOptions.map((option) => {
                    const isSelected = pageSize === option;
                    return (
                        <label key={option} className="page-size-radio-label">
                            <input
                                type="radio"
                                name="pageSize"
                                value={option}
                                checked={isSelected}
                                onChange={() => setPageSize(option)}
                            />
                            <span>{option}</span>
                        </label>
                    );
                })}
            </div>
        </div>
    );
};

export default PageSizeRadiobuttons;