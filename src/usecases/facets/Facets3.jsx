import { useFacets } from '@unbxd-ui/react-search-hooks';
import { useState } from 'react';

const FacetSwatch = ({ item, isSelected, onToggle }) => {
    return (
        <div 
            className={`facet-swatch-row ${isSelected ? 'selected' : ''}`}
            onClick={onToggle}
        >
            <div className="facet-swatch" style={{ backgroundColor: item.value }} />
            <span className="swatch-label">{item.value} ({item.count})</span>
        </div>
    );
};

const FacetPill = ({ item, isSelected, onToggle }) => {
    return (
        <button
            className={`facet-pill ${isSelected ? 'selected' : ''}`}
            onClick={onToggle}
        >
            {item.value} ({item.count})
        </button>
    );
};

const Facets3 = () => {
    const { facets, stats, selectedFacets, getFacetByName, addFacet, removeFacet } = useFacets();

    const [openDropdowns, setOpenDropdowns] = useState({});
    const [searchInputs, setSearchInputs] = useState({});

    const toggleDropdown = (facetName) => {
        setOpenDropdowns(prev => {
            if (prev[facetName]) {
                return { [facetName]: false };
            } else {
                return { [facetName]: true };
            }
        });
    };

    const handleSearchChange = (facetName, value) => {
        setSearchInputs(prev => ({
            ...prev,
            [facetName]: value
        }));
    };

    // Check for color facet
    const isColorFacet = (facetName, displayName) => {
        const name = (facetName || '').toLowerCase();
        const display = (displayName || '').toLowerCase();
        return name.includes('color') || name.includes('colour') || 
               display.includes('color') || display.includes('colour');
    };

    // Check for brand facet
    const isBrandFacet = (facetName, displayName) => {
        const name = (facetName || '').toLowerCase();
        const display = (displayName || '').toLowerCase();
        return name.includes('brand') || name.includes('manufacturer') || 
               display.includes('brand') || display.includes('manufacturer');
    };

    console.log("facets", facets);
    console.log("stats:", stats);
    
    return (
        <>
            {(facets?.text?.list || []).map(textFacet => {
                const facetName = textFacet.facetName || textFacet.filterField;
                const searchStr = searchInputs[facetName] || '';
                const facet = getFacetByName(facetName, searchStr);
                const isOpen = openDropdowns[facetName] || false;
                const selectedValues = selectedFacets[facetName]?.values || [];
                const hasSelectedValues = selectedValues.length > 0;
                const isColor = isColorFacet(facetName, facet?.displayName);
                const isBrand = isBrandFacet(facetName, facet?.displayName);

                return (
                    <div className="UNX-dropdown facets-root" key={facetName}>
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
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </div>
                                
                                {isColor ? (
                                    // Color swatches
                                    facet.values.map(option => {
                                        const isSelected = selectedFacets[facetName]?.values.includes(option.value);
                                        return (
                                            <FacetSwatch
                                                key={option.value}
                                                item={option}
                                                isSelected={isSelected}
                                                onToggle={() => {
                                                    if (isSelected) {
                                                        removeFacet(facetName, option.value);
                                                    } else {
                                                        addFacet(facetName, [option.value], true);
                                                    }
                                                }}
                                            />
                                        );
                                    })
                                ) : isBrand ? (
                                    // Brand pills
                                    <div className="facet-pills-container">
                                        {facet.values.map(option => {
                                            const isSelected = selectedFacets[facetName]?.values.includes(option.value);
                                            return (
                                                <FacetPill
                                                    key={option.value}
                                                    item={option}
                                                    isSelected={isSelected}
                                                    onToggle={() => {
                                                        if (isSelected) {
                                                            removeFacet(facetName, option.value);
                                                        } else {
                                                            addFacet(facetName, [option.value], true);
                                                        }
                                                    }}
                                                />
                                            );
                                        })}
                                    </div>
                                ) : (
                                    // Regular checkboxes
                                    facet.values.map(option => (
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
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                );
            })}
        </>
    );
};

export default Facets3;