import { useFacets, useProducts } from '@unbxd-ui/react-search-hooks';
import { useState } from 'react';
import { useSorting } from "@unbxd-ui/react-search-hooks";
//with range facet same as facet10
const Facets14 = () => {
    const { facets, selectedFacets, addMultipleFacets, getFacetByName, clearFacet, removeFacet, addFacet } = useFacets();
    const [tempSelections, setTempSelections] = useState({});
    const { numberOfProducts } = useProducts();

    const { sort, setSort, sortOptions } = useSorting()
    const [sortOpen, setSortOpen] = useState(false);

    const options = [
        { value: "price desc", label: "Price: High to Low" },
        { value: "price asc", label: "Price: Low to High" },
    ];
    const [openFacets, setOpenFacets] = useState({});
    const toggleFacet = (facetName) => {
        setOpenFacets(prev => ({
            ...prev,
            [facetName]: !prev[facetName]
        }));
    };

    if (numberOfProducts === 0) {
        return null;
    }
    // //console.log("selected", selectedFacets);
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
            <div className="facet-group">
                <div
                    className="UNX-dropdown-activator facets-header"
                    onClick={() => setSortOpen(!sortOpen)}
                    style={{ cursor: 'pointer' }}
                >
                    <div className="facets-displayName">Sort By</div>
                    <div className="facets-icon">⌄</div>
                </div>
                {sortOpen && (
                    <div>
                        {options.map(option => (
                            <label key={option.value} className="sort-radio-label">
                                <input
                                    type="radio"
                                    name="sort"
                                    checked={option.value === sort}
                                    onChange={() => setSort(option.value)}
                                />
                                <span className="facet-value-text">{option.label}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>
            {Object.keys(facets).map(facetKey => {
                const facetkey = facets[facetKey];
                // //console.log("facets[facetKey]", facetkey);
                const facetList = facets[facetKey]?.list || [];

                //console.log("facetList:", facetList);
                return facetList.map(facetItem => {
                    const facetName = facetItem.facetName || facetItem.filterField;
                    const facet = getFacetByName(facetName);
                    //console.log("facet:", facet);

                    if (!facet || !facet.values) {
                        return null;
                    }
                    const isRangeFacet = facet.type === 'range';
                    const isMultilevelFacet = facet.type === 'multilevel';
                    const selectedValues = selectedFacets[facetName]?.values || [];
                    const hasSelectedValues = selectedValues.length > 0;


                    const existingValue = isMultilevelFacet ? selectedFacets[facetName]?.values?.[0] : null;
                    const pathParts = existingValue ? existingValue.split('>') : [];
                    const lastPart = pathParts[pathParts.length - 1];
                    const isLeaf = pathParts.length > 0 && facet.values.some(v => v.name === lastPart);
                    const breadcrumbParts = isLeaf ? pathParts.slice(0, -1) : pathParts;
                    const optionsIndent = isLeaf ? pathParts.length - 1 : pathParts.length;
                    const basePath = isLeaf ? pathParts.slice(0, -1).join('>') : existingValue;

                    return (
                        <div key={facetName} className="facet-group">
                            {/* <h3>{facet.displayName}</h3> */}
                            <div
                                className="UNX-dropdown-activator facets-header"
                                onClick={() => toggleFacet(facetName)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="facets-displayName">{facet.displayName}</div>
                                <div className='facets-icon'>⌄</div>
                            </div>
                            {openFacets[facetName] && (<>


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
                                {isMultilevelFacet && (
                                    <div className="multilevel-facet-options">
                                        {breadcrumbParts.map((part, index) => (
                                            <div
                                                key={`breadcrumb-${index}`}
                                                className="multilevel-facet-item selected"
                                                style={{ paddingLeft: `${index * 20}px` }}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    if (index === 0) {
                                                        clearFacet(facetName);
                                                    } else {
                                                        const parentPath = pathParts.slice(0, index).join('>');
                                                        addFacet(facetName, [parentPath]);
                                                    }
                                                }}
                                            >
                                                <span className="multilevel-icon">−</span>
                                                <span className="multilevel-label bold">{part}</span>
                                            </div>
                                        ))}

                                        {facet.values.map((option, index) => {
                                            const isSelectedLeaf = isLeaf && option.name === lastPart;
                                            const fullPath = basePath
                                                ? basePath + '>' + option.name
                                                : option.name;

                                            return (
                                                <div
                                                    key={option.name || index}
                                                    className={`multilevel-facet-item ${isSelectedLeaf ? 'selected' : ''}`}
                                                    style={{ paddingLeft: `${optionsIndent * 20}px` }}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        if (isSelectedLeaf) {
                                                            const parentPath = pathParts.slice(0, -1).join('>');
                                                            if (parentPath) {
                                                                addFacet(facetName, [parentPath]);
                                                            } else {
                                                                clearFacet(facetName);
                                                            }
                                                        } else {
                                                            addFacet(facetName, [fullPath]);
                                                        }
                                                    }}
                                                >
                                                    <span className="multilevel-icon">
                                                        {isSelectedLeaf ? '−' : '+'}
                                                    </span>
                                                    <span className={isSelectedLeaf ? 'multilevel-label bold' : 'multilevel-label'}>
                                                        {option.name}
                                                    </span>
                                                    <span className="multilevel-count">({option.count})</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                                {!isMultilevelFacet && facet.values.map(option => {

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
                                            <span className="facet-value-text">{displayText}</span>
                                        </label>
                                    );
                                })}
                            </>)}
                        </div>
                    );
                });
            })}


        </div>
    );
};

export default Facets14;