import { useSorting } from "@unbxd-ui/react-search-hooks";

const SortIconsComponent = () => {
    const { sort, setSort } = useSorting();

    const options = [
        { value: "price asc", label: "Price: Low to High", icon: "/icons/ascending-sort.png" },
        { value: "price desc", label: "Price: High to Low", icon: "/icons/descending-sort.png" }
    ];

    return (
        <div className="sort-root">
            <p>Sort By:</p>
            <div className="sort-container">
                {options.map(option => {
                    const isSelected = option.value === sort;
                    return (
                        <button
                            key={option.value}
                            className={`sort-button1 ${isSelected ? "selected1" : ""}`}
                            onClick={() => setSort(option.value)}
                            title={option.label}
                        >
                            <img 
                                src={option.icon} 
                                alt={option.label}
                                className="sort-icon"
                            />
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default SortIconsComponent;