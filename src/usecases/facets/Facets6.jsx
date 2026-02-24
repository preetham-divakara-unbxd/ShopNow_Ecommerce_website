import { useFacets } from '@unbxd-ui/react-search-hooks';
import { useState } from 'react';

const Facets6 = () => {
    const { facets, stats, selectedFacets, getFacetByName, addFacet, removeFacet } = useFacets();

    const [searchInputs, setSearchInputs] = useState({});

    const handleSearchChange = (facetName, value) => {
        setSearchInputs(prev => ({
            ...prev,
            [facetName]: value
        }));
    };

    console.log("facets", facets);
    console.log("stats:", stats);
    
    return (
        <div className="facets-sidebar">
            {(facets?.text?.list || []).map(textFacet => {
                const facetName = textFacet.facetName || textFacet.filterField;
                const searchStr = searchInputs[facetName] || '';
                const facet = getFacetByName(facetName, searchStr);
                const selectedValues = selectedFacets[facetName]?.values || [];
                const hasSelectedValues = selectedValues.length > 0;

                return (
                    <div className="UNX-dropdown facets-root" key={facetName}>
                        <div className="UNX-dropdown-activator facets-header">
                            <div className='facets-displayName'>{facet.displayName}</div>
                            <div className='facets-icon'>⌄</div>
                        </div>
                        <div className="UNX-dropdown-body facets-body" style={{ left: "0px", position: "relative" }}>
                            {hasSelectedValues && (
                                <div className="facet-selected-values">
                                    <span className="selected-label">Selected:</span>
                                    <span className="selected-values-text">
                                        {selectedValues.join(', ')}
                                    </span>
                                </div>
                            )}

                            <div className="facet-search-box">
                                <input
                                    type="text"
                                    placeholder={`Search ${facet.displayName}...`}
                                    value={searchStr}
                                    onChange={(e) => handleSearchChange(facetName, e.target.value)}
                                />
                            </div>
                            
                            {facet.values.map(option => (
                                <div className="checkbox-root" key={option.value}>
                                    <input
                                        className="checkbox-input"
                                        type="checkbox"
                                        checked={selectedFacets[facetName]?.values.includes(option.value)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                addFacet(facetName, [option.value], true);
                                            } else {
                                                removeFacet(facetName, option.value);
                                            }
                                        }}
                                    />
                                    {option.value} ({option.count})
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Facets6;