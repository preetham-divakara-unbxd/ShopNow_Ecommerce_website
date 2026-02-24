import { useSorting } from "@unbxd-ui/react-search-hooks";

const SortComponent = () => {
    const { sort, setSort } = useSorting();

    const options = [
        { label: "High to Low", value: "price desc" },
        { label: "Low to High", value: "price asc" }
    ]

    const handleSortClick = (value) => {
        setSort(value)
    }

    return (

        <div className="sort-root">
            <p>Sort By:</p>
            <div className="sort-container">
                {options.map(option => {
                    return (
                    <div className={`sort-button ${option.value === sort ? "selected" : ""}`} onClick={() => { handleSortClick(option.value) }}>
                        {option.label}
                    </div>);
                })}
            </div>
        </div>
    );
};

export default SortComponent;