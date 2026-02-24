// This is a sample example. 
// Please go through the entire documentation for understanding different usecases and update as per your needs.
import { useVisualSearch } from "@unbxd-ui/react-search-hooks";

const VisualSearchComponent = () => {
    const { setImageQuery } = useVisualSearch();

    const onChange = (event) => {
        setImageQuery(event.target.value);
    };

    return (
        <div>
            <input
                type="text"
                onChange={onChange}
                placeholder="Enter image URL..."

            />
        </div>
    );
};

export default VisualSearchComponent;