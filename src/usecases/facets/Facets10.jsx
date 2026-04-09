import { useFacets } from '@unbxd-ui/react-search-hooks';
import { useState } from 'react';
//without range facet
const Facets10 = () => {
    const { facets, selectedFacets, addMultipleFacets, getFacetByName, clearFacet } = useFacets();
    const [tempSelections, setTempSelections] = useState({});

    //console.log("selected", selectedFacets);
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
    //console.log("object keys:", Object.keys(facets)); 
    const hasPendingSelections = Object.values(tempSelections).some(values => values.length > 0);
    const hasAppliedFacets = Object.keys(selectedFacets).length > 0;

    return (
        <div className="multi-select-facets">
            <div className="facets10-filters-heading">Filters</div>
            <div className="facet-actions">
                {hasPendingSelections && (
                    <button className="facets10-apply-btn" onClick={applyAllFilters}>Apply Filters</button>
                )}
                {hasAppliedFacets && (
                    <button className="facets10-clear-btn" onClick={clearAllFilters}>Clear All</button>
                )}
            </div>

            {(facets?.text?.list || []).map(facetKey => {
                // const facet = facets[facetKey];
                //console.log("facetkey:", facetKey);
                const facetName = facetKey.facetName || facetKey.filterField;
                //console.log("facetname:", facetName);
                const facet = getFacetByName(facetName);
                //console.log("facet:", facet);
                const selectedValues = selectedFacets[facetName]?.values || [];
                const hasSelectedValues = selectedValues.length > 0;

                return (
                    <div key={facetName} className="facet-group">
                        <div className='facets-displayName'>{facet.displayName}</div>
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
                                 <span className="facet-value-text">{option.value}</span> ({option.count})
                            </label>
                        )})}
                    </div>
                );
            })}


        </div>
    );
};

export default Facets10;