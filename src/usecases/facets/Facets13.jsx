import { useFacets } from '@unbxd-ui/react-search-hooks';
import { useState } from 'react';
import RangeFacetComponent from './RangeFacetComponent';


//with range facet same as facet10 with rangeacetcomponent(slider)
const Facets13 = () => {
    const { facets, selectedFacets, addMultipleFacets, getFacetByName, clearFacet } = useFacets();
    const [tempSelections, setTempSelections] = useState({});

    console.log("selected", selectedFacets);
    const handleTempSelection = (facetName, value, checked) => {
        setTempSelections(prev => {
            const current = prev[facetName] || [];
            if (checked) {
                return { ...prev, [facetName]: [...current, value] };
            } else {

                return {
                    ...prev,
                    [facetName]: current.filter(v => {

                        if (typeof value === 'object' && typeof v === 'object' && value !== null && v !== null) {
                            return !(v.start === value.start && v.end === value.end);
                        } else {

                            return v !== value;
                        }
                    })
                };
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

            {Object.keys(facets).map(facetKey => {
                const facetkey = facets[facetKey];
                console.log("facets[facetKey]", facetkey);
                const facetList = facets[facetKey]?.list || [];

                console.log("facetList:", facetList);
                return facetList.map(facetItem => {
                    const facetName = facetItem.facetName || facetItem.filterField;
                    const facet = getFacetByName(facetName);
                    console.log("facet:", facet);
                    console.log("facetName", facetName);

                    if (!facet || !facet.values) {
                        return null;
                    }
                     if(facet.type === 'multilevel') {
                        return null;
                    }
                    
                    const isRangeFacet = facet.type === 'range';
                    const selectedValues = selectedFacets[facetName]?.values || [];
                    const hasSelectedValues = selectedValues.length > 0;

                    return (
                        <div key={facetName} className="facet-group">
                            <h3>{facet.displayName}</h3>
                            {hasSelectedValues && (
                                <div className="facet-selected-values">
                                    <span className="selected-label">Selected:</span>
                                    <span className="selected-values-text">
                                        {isRangeFacet
                                            ? selectedValues.map(v =>
                                                typeof v === 'object' && v.start && v.end
                                                    ? `$${v.start} - $${v.end}`
                                                    : v
                                            ).join(', ')
                                            : selectedValues.join(', ')
                                        }
                                    </span>
                                </div>
                            )}
               
                            {isRangeFacet && (
                                <RangeFacetComponent
                                    facetName={facetName}
                                    facet={facet}
                                    fireImmediate={true}
                                />
                            )}

                            {!isRangeFacet && facet.values.map(option => {

                                let displayText;
                                let optionValue;
                                if (isRangeFacet) {

                                    displayText = `$${option.start} - $${option.end} (${option.count})`;
                                    optionValue = option;
                                } else {

                                    displayText = `${option.value} (${option.count})`;
                                    optionValue = option.value;
                                }
                                // const isSelected = selectedFacets[facetName]?.values?.includes(option.value) || false;
                                // const isPending = tempSelections[facetName]?.includes(option.value) || false;
                                const isSelected = isRangeFacet
                                    ? selectedFacets[facetName]?.values?.some(v =>
                                        typeof v === 'object' && v.start === option.start && v.end === option.end
                                    ) || false
                                    : selectedFacets[facetName]?.values?.includes(option.value) || false;

                     
                                const isPending = isRangeFacet
                                    ? tempSelections[facetName]?.some(v =>
                                        typeof v === 'object' && v.start === option.start && v.end === option.end
                                    ) || false
                                    : tempSelections[facetName]?.includes(option.value) || false;


                                return (
                                    <label key={option.value}>
                                        <input
                                            type="checkbox"
                                            checked={isSelected || isPending}
                                            onChange={(e) => {
                                                e.stopPropagation();
                                                handleTempSelection(facetName, optionValue, e.target.checked);
                                            }}
                                        />
                                        {displayText}
                                    </label>
                                );
                            })}
                        </div>
                    );
                });
            })}


        </div>
    );
};

export default Facets13;