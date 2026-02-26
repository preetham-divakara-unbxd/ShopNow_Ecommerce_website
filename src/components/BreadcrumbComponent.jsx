
import { useBreadcrumb } from "@unbxd-ui/react-search-hooks";

const BreadcrumbComponent = ({ name }) => {
    const { breadcrumbs, setBreadcrumb } = useBreadcrumb({ name: "categoryPath" });
    
    console.log("breadcrumbs:", breadcrumbs);


    const handleBreadcrumbClick = (level) => {
        setBreadcrumb(name, breadcrumbs.slice(0, level + 1))
    }
    if (!breadcrumbs || breadcrumbs.length === 0) {
        return null;
    }
    return (
        <div className="breadcrumb-container">
            
                <div className="breadcrumb-text">
                    <span className="breadcrumb-label">Category:</span>
                    {breadcrumbs.map((breadcrumb, index) => (
                        <span key={index}>
                            <span 
                                className="breadcrumb-item"
                                onClick={() => handleBreadcrumbClick(index)}
                            >
                                {breadcrumb}
                            </span>
                            {index < breadcrumbs.length - 1 && (
                                <span className="breadcrumb-separator">/</span>
                            )}
                        </span>
                    ))}
                </div>
         
        </div>
    );
};


/*import { useBreadcrumb } from "@unbxd-ui/react-search-hooks";
 
const BreadcrumbComponent = ({ name }) => {
    const { breadcrumbs, setBreadcrumb } = useBreadcrumb({ name: "categoryPath" });
    
    console.log("breadcrumbs:", breadcrumbs);
    const handleBreadcrumbClick = (level) => {
        setBreadcrumb(name, breadcrumbs.slice(0, level + 1))
    }
 
    return (
        <div className="breadcrumb-trail">
            {breadcrumbs.length > 0 ? (
                <ul>
                    {breadcrumbs.map((breadcrumb, index) => (
                        <li key={index} onClick={() => { handleBreadcrumbClick(index) }}>
                            {breadcrumb}
                        </li>
                    ))}
                </ul>
            ): (
                <p>No breadcrumbs available</p>
            )}
        </div>
    );
};
*/
export default BreadcrumbComponent;