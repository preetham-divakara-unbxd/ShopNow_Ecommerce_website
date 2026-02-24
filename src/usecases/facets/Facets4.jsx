import { useFacets } from '@unbxd-ui/react-search-hooks';
import { useState } from 'react';

const Facets4 = () => {
    const { facets, stats, selectedFacets, getFacetByName, addFacet, removeFacet } = useFacets();

    const [openDropdowns, setOpenDropdowns] = useState({});
    const [searchInputs, setSearchInputs] = useState({});

    const toggleDropdown = (facetName) => {
        setOpenDropdowns(prev => {
           
            if (prev[facetName]) {
                return {
                    [facetName]: false  
                };
            } else {
                return {
                    [facetName]: true  
                };
            }
        });
    };
    const handleSearchChange = (facetName, value) => {
        setSearchInputs(prev => ({
            ...prev,
            [facetName]: value
        }));
    };
    console.log("facets", facets);
    console.log("stats:", stats);
    return (
        <>
            {/* Basic facet display */}
            {(facets?.text?.list || []).map(textFacet => {
                const facetName = textFacet.facetName || textFacet.filterField;
    
                const searchStr = searchInputs[facetName] || '';
             
                const facet = getFacetByName(facetName, searchStr);
                const isOpen = openDropdowns[facetName] || false;

                  
                const selectedValues = selectedFacets[facetName]?.values || [];
                const hasSelectedValues = selectedValues.length > 0;
                //   console.log("selectedValues:", selectedValues);
                //   console.log("hasSelectedValues:", hasSelectedValues);

                return (
                    <div 
                    className="UNX-dropdown facets-root"
                    key={facetName}
                    >
                        <div 
                        className="UNX-dropdown-activator facets-header"
                        onClick={() => toggleDropdown(facetName)}
                        style={{ cursor: 'pointer' }}
                        >
                            <div className='facets-displayName'>{facet.displayName}</div>
                            <div className='facets-icon'>⌄</div>
                        </div>
                        {isOpen && (
                        <div className="UNX-dropdown-body facets-body" style={{ left: "0px" }}>
                             
               
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
                                        onClick={(e) => e.stopPropagation()} // Prevent dropdown from closing
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
                        )}
                    </div>
                );
            })}
        </>
    );
};


export default Facets4;