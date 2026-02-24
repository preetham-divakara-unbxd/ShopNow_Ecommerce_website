import { useFacets } from '@unbxd-ui/react-search-hooks';
import { useState } from 'react';
//without range facet
const Facets10 = () => {
    const { facets, selectedFacets, addMultipleFacets, getFacetByName, clearFacet } = useFacets();
    const [tempSelections, setTempSelections] = useState({});

    console.log("selected", selectedFacets);
    const handleTempSelection = (facetName, value, checked) => {
        setTempSelections(prev => {
            const current = prev[facetName] || [];
            if (checked) {
                return { ...prev, [facetName]: [...current, value] };
            } else {
                return { ...prev, [facetName]: current.filter(v => v !== value) };
            }
        });
    };

    const applyAllFilters = () => {
        const facetsToApply = Object.entries(tempSelections)
            .filter(([, values]) => values.length > 0)
            .map(([name, values]) => ({ name, value: values }));

        addMultipleFacets(facetsToApply);
        setTempSelections({});
    };

    const clearAllFilters = () => {
        clearFacet(); 
        setTempSelections({});
    };
    console.log("object keys:", Object.keys(facets)); 
    return (
        <div className="multi-select-facets">
            <div className="facet-actions">
                <button onClick={applyAllFilters}>Apply All Filters</button>
                <button onClick={clearAllFilters}>Clear All</button>
            </div>

            {(facets?.text?.list || []).map(facetKey => {
                // const facet = facets[facetKey];
                console.log("facetkey:", facetKey);
                const facetName = facetKey.facetName || facetKey.filterField;
                console.log("facetname:", facetName);
                const facet = getFacetByName(facetName);
                console.log("facet:", facet);
                const selectedValues = selectedFacets[facetName]?.values || [];
                const hasSelectedValues = selectedValues.length > 0;

                return (
                    <div key={facetName} className="facet-group">
                        <h3>{facet.displayName}</h3>
                        {hasSelectedValues && (
                            <div className="facet-selected-values">
                                <span className="selected-label">Selected:</span>
                                <span className="selected-values-text">
                                    {selectedValues.join(', ')}
                                </span>
                            </div>
                        )}
                        {facet.values.map(option => {
                            
                            const isSelected = selectedFacets[facetName]?.values?.includes(option.value) || false;
                            
                            const isPending = tempSelections[facetName]?.includes(option.value) || false;
                            
                            
                            return (

                            <label key={option.value}>
                                <input
                                    type="checkbox"

                              
                                    checked={isSelected || isPending}
                                    onChange={(e) => {
                                        e.stopPropagation();
                                        handleTempSelection(facetName, option.value, e.target.checked)
                                    }}
                                />
                                {option.value} ({option.count})
                            </label>
                        )})}
                    </div>
                );
            })}


        </div>
    );
};

export default Facets10;