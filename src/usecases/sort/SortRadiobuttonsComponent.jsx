import { useSorting } from "@unbxd-ui/react-search-hooks";

const SortRadiobuttonsComponent = () => {
    const { sort, setSort } = useSorting();

    const options = [
        { label: "High to Low", value: "price desc" },
        { label: "Low to High", value: "price asc" }
    ];

    return (
        <div className="sort-root">
            <p>Sort By:</p>
            <div className="sort-container">
                {options.map(option => {
                    const isSelected = option.value === sort;
                    return (
                        <label key={option.value} className="sort-radio-label">
                            <input
                                type="radio"
                                name="sort"
                                value={option.value}
                                checked={isSelected}
                                onChange={() => setSort(option.value)}
                            />
                            <span>{option.label}</span>
                        </label>
                    );
                })}
            </div>
        </div>
    );
};

export default SortRadiobuttonsComponent;