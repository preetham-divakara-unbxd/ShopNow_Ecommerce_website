import { useFacets } from '@unbxd-ui/react-search-hooks';
import { useState } from 'react';

const Facets1 = () => {
    const { facets, stats, selectedFacets, getFacetByName, addFacet, removeFacet } = useFacets();


    const [openDropdowns, setOpenDropdowns] = useState({});

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

    console.log("facets", facets);
    console.log("stats:", stats);
    return (
        <>
            {/* Basic facet display */}
            {(facets?.text?.list || []).map(textFacet => {
                const facetName = textFacet.facetName || textFacet.filterField;
                const facet = getFacetByName(facetName);

                
                const isOpen = openDropdowns[facetName] || false;

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


export default Facets1;