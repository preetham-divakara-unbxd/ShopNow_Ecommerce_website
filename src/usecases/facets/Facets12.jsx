import { useFacets } from '@unbxd-ui/react-search-hooks';
import { useState } from 'react';
//with range facet same as facet10
const Facets12 = () => {
    const { facets, selectedFacets, addMultipleFacets, getFacetByName, clearFacet, removeFacet, addFacet  } = useFacets();
    const [tempSelections, setTempSelections] = useState({});

    console.log("selected", selectedFacets);
    const handleTempSelection = (facetName, value, checked) => {
        const isRangeValue = typeof value === 'object' && value !== null && value.start !== undefined && value.end !== undefined;
        if (!checked) {
            const isCurrentlySelected = isRangeValue
                ? selectedFacets[facetName]?.values?.some(v =>
                    typeof v === 'object' &&
                    typeof value === 'object' &&
                    parseFloat(v.start) === parseFloat(value.start) &&
                    parseFloat(v.end) === parseFloat(value.end)
                )
                : selectedFacets[facetName]?.values?.includes(value);

            if (isCurrentlySelected) {

                removeFacet(facetName, value);
            }
        }

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
       
        const merged = {};

        Object.entries(selectedFacets).forEach(([name, data]) => {
            if (data.values?.length > 0) {
                merged[name] = [...data.values];
            }
        });

        Object.entries(tempSelections).forEach(([name, values]) => {
            if (values.length > 0) {
                merged[name] = [...(merged[name] || []), ...values];
            }
        });
        const facetsToApply = Object.entries(merged)
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

                    if (!facet || !facet.values) {
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
                            {facet.values.map(option => {

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

export default Facets12;