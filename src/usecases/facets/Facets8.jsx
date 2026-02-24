import { useFacets } from '@unbxd-ui/react-search-hooks';

const Facets8 = () => {
    const { selectedFacets, removeFacet, clearFacet } = useFacets();


    const hasSelectedFacets = selectedFacets && Object.keys(selectedFacets).length > 0;
    console.log("selectedFacets:", selectedFacets);
    console.log("hasSelectedFacets:", Object.keys(selectedFacets));
    if (!hasSelectedFacets) {
        return null;
    }

    return (
        <div className="selected-filters-wrapper">
            <div className="selected-facets-label">Selected filters:</div>

            <div className="selected-facets">
                {Object.entries(selectedFacets).map(([facetName, facetData]) => {
                
                    const values = facetData.values || [];
                    console.log("facetdata:", facetData);

                    return values.map((value, index) => {
                        

                        let displayValue = '';
                        if (typeof value === 'string') {
                            displayValue = value;
                        } else if (value && typeof value === 'object' && value.start && value.end) {
                            // Range facet
                            displayValue = `${value.start} - ${value.end}`;
                        }

                        return (
                            <span key={`${facetName}-${index}`} className="selected-item">
                                <span className="filter-pill-text">
                                    {facetData.displayName}: {displayValue}
                                </span>
                                <button
                                    className="filter-pill-remove"
                                    onClick={() => removeFacet(facetName, value)}
                                    aria-label={`Remove ${facetData.displayName} filter`}
                                >
                                    ×
                                </button>
                            </span>
                        );
                    });
                })}
                <button
                    className="clear-all-selected"
                    onClick={() => clearFacet()}
                >
                    Clear all
                </button>
            </div>


        </div>
    );
};

export default Facets8;