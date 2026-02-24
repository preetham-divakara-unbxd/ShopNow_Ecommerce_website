import { useUtilities } from "@unbxd-ui/react-search-hooks";
 
const RefreshButton = () => {
    const { refresh } = useUtilities();
 
    const handleRefresh = () => {
        refresh();
    };
 
    return (
        <button onClick={handleRefresh} title="Refresh results">
            🔄 
        </button>
    );
};

export default RefreshButton;