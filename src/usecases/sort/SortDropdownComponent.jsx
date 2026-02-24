import { useSorting } from "@unbxd-ui/react-search-hooks";

const SortDropdownComponent = () => {
    const { sort, setSort } = useSorting();

    const options = [
        { label: "High to Low", value: "price desc" },
        { label: "Low to High", value: "price asc" },
        { label: "Title: A to Z" , value: "title asc" },
        { label: "Title: Z to A", value: "title desc" }
    ];

    const handleSortChange = (event) => {
        setSort(event.target.value);
    };

    return (
        <div className="sort-root">
            <label>Sort By: </label>
            <select
                value={sort}
                onChange={handleSortChange}
                className="sort-dropdown"
            >
                <option value="">Select sort option</option>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SortDropdownComponent;