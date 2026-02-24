import { useProductView } from "@unbxd-ui/react-search-hooks";

const ProductViewSMLComponent = () => {
    const { view, setView } = useProductView();

    const sizes = [
        { value: "SMALL", label: "Small", gridSize: "small" },
        { value: "MEDIUM", label: "Medium", gridSize: "medium" },
        { value: "LARGE", label: "Large", gridSize: "large" }
    ];

    const handleViewClick = (value) => {
        setView(value);
    };

    return (
        <div className="view-root1">
            <label className="view-label">View As:</label>
            <div className="view-options">
                {sizes.map(size => {
                    const isSelected = view === size.value;
                    return (
                        <button
                            key={size.value}
                            className={`view-pill ${isSelected ? "selected-view" : ""}`}
                            onClick={() => handleViewClick(size.value)}
                        >
                            {size.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default ProductViewSMLComponent;