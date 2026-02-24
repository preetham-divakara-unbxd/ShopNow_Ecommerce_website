// This is a sample example. 
// Please go through the entire documentation for understanding different usecases and update as per your needs.

//doc version 
import { useFacets } from '@unbxd-ui/react-search-hooks';

const Facets11 = () => {
    const { facets, stats, selectedFacets, getFacetByName, addFacet, removeFacet, clearFacet } = useFacets();

    return (
        <div>
           
            {Object.keys(facets).flatMap(facetKey => {
                const facetList = facets[facetKey]?.list || [];

                return facetList.map(facetItem => {
                    const facetName = facetItem.facetName || facetItem.filterField;
                    const facet = getFacetByName(facetName);

                    if (!facet) return null;

                    return (
                        <div key={facetName}>
                            <h3>{facet.displayName}</h3>
                            {facet.values.map(option => (
                                <label key={option.value}>
                                    <input
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
                                </label>
                            ))}
                        </div>
                    );
                });
            })}
        </div>
    );
};

export default Facets11;