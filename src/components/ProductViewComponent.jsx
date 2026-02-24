import { useProductView } from "@unbxd-ui/react-search-hooks";

const ProductView = () => {
    const { view, setView } = useProductView()

    const handleViewClick = (value) => {
        setView(value)
    }

    return (
        <div className="view-root">
            <label className="view-label">View As:</label>
            <div id="view-options" className="view-option-container">
                <button className={`view-option ${view === "GRID" ? "selected" : ""}`} onClick={() => { handleViewClick("GRID") }}>Grid</button>
                <button className={`view-option ${view === "LIST" ? "selected" : ""}`} onClick={() => { handleViewClick("LIST") }}>List</button>
            </div>
        </div>
    );
};

export default ProductView;