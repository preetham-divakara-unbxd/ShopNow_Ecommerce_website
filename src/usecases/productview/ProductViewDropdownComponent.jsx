import { useProductView } from "@unbxd-ui/react-search-hooks";

const ProductViewDropdownComponent = () => {
    const { view, setView } = useProductView();

    const handleViewChange = (event) => {
        setView(event.target.value);
    };

    return (
        <div className="view-root">
            <label className="view-label">View As:</label>
            <select
                value={view || "GRID"}
                onChange={handleViewChange}
                className="view-dropdown"
            >
                <option value="GRID">Grid</option>
                <option value="LIST">List</option>
            </select>
        </div>
    );
};

export default ProductViewDropdownComponent;