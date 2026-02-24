import { useState, useEffect } from "react";
import { 
    PopularProducts, 
    KeywordSuggestions, 
    TrendingQueries, 
    TopQueries, 
    PromotedSuggestions 
} from "@unbxd-ui/react-search-components";

const AutosuggestNoResult = ({ autosuggestQuery }) => {
    return <div className="no-results">No results found for "{autosuggestQuery}"</div>;
};

// ✅ Default Header Component
const DefaultHeader = ({ headerText }) => {
    return <>{headerText}</>;
};

const AutosuggestComponent = ({ autosuggest, response, hideAutosuggest, setQuery }) => {
    const {
        LoaderComponent,
        inFields: { 
            noOfInfields = 2, 
            filterField = "category", 
            Component: InFields, 
            HeaderComponent: InFieldsHeader 
        } = {},
        popularProducts: { 
            Component: PopularProductsComp, 
            HeaderComponent: PopularProductsHeader 
        } = {},
        keywordSuggestions: { 
            Component: KeywordSuggestionsComp, 
            HeaderComponent: KeywordSuggestionsHeader 
        } = {},
        trendingSearches: { 
            Component: TrendingQueriesComp, 
            HeaderComponent: TrendingQueriesHeader 
        } = {},
        topQueries: { 
            Component: TopQueriesComp, 
            HeaderComponent: TopQueriesHeader 
        } = {},
        promotedSuggestions: { 
            Component: PromotedSuggestionsComp, 
            HeaderComponent: PromotedSuggestionsHeader 
        } = {},
        onItemClick,
        onItemHover
    } = autosuggest || {};
    
    // ✅ Use imported components as fallback, and ensure HeaderComponents are valid
    const PopularProductsComponent = PopularProductsComp || PopularProducts;
    const KeywordSuggestionsComponent = KeywordSuggestionsComp || KeywordSuggestions;
    const TrendingQueriesComponent = TrendingQueriesComp || TrendingQueries;
    const TopQueriesComponent = TopQueriesComp || TopQueries;
    const PromotedSuggestionsComponent = PromotedSuggestionsComp || PromotedSuggestions;
    
    // ✅ Ensure HeaderComponents are valid functions, use DefaultHeader as fallback
    const PopularProductsHeaderComp = typeof PopularProductsHeader === 'function' ? PopularProductsHeader : DefaultHeader;
    const KeywordSuggestionsHeaderComp = typeof KeywordSuggestionsHeader === 'function' ? KeywordSuggestionsHeader : DefaultHeader;
    const TrendingQueriesHeaderComp = typeof TrendingQueriesHeader === 'function' ? TrendingQueriesHeader : DefaultHeader;
    const TopQueriesHeaderComp = typeof TopQueriesHeader === 'function' ? TopQueriesHeader : DefaultHeader;
    const PromotedSuggestionsHeaderComp = typeof PromotedSuggestionsHeader === 'function' ? PromotedSuggestionsHeader : DefaultHeader;
    const InFieldsHeaderComp = typeof InFieldsHeader === 'function' ? InFieldsHeader : DefaultHeader;
    
    const {
        loading = false,
        autosuggestQuery = "",
        setAutosuggestQuery,
        response: { 
            trendingSearches = [], 
            popularProducts = [], 
            keywordSuggestions = [], 
            inFields = [], 
            topSearchSuggestions = [], 
            promotedSuggestions = [] 
        } = {},
        fetchSearchData,
        searchResults = {},
    } = response || {};

    const [hoveredQuery, setHoveredQuery] = useState(autosuggestQuery);
    const [products, setProducts] = useState(popularProducts);

    const handleHover = (query, item) => {
        if (onItemHover) {
            onItemHover(item);
        }
        if (hoveredQuery !== query) {
            if (searchResults[query]) {
                setProducts(searchResults[query]);
            } else if (fetchSearchData) {
                fetchSearchData({ query });
            }
        }
        setHoveredQuery(query);
    };

    useEffect(() => {
        setHoveredQuery(autosuggestQuery)
    }, [autosuggestQuery])

    useEffect(() => {
        if (hoveredQuery.length > 0) {
            setProducts(searchResults[hoveredQuery]?.length > 0 ? searchResults[hoveredQuery] : popularProducts);
        } else {
            setProducts(popularProducts);
        }
    }, [searchResults, hoveredQuery, popularProducts]);

    useEffect(() => {
        if (hoveredQuery === autosuggestQuery) {
            setProducts(popularProducts);
        }
    }, [popularProducts, hoveredQuery, autosuggestQuery]);

    if (loading) {
        return (
            <div className="autosuggest-wrapper">
                {LoaderComponent ? <LoaderComponent /> : <div>Loading...</div>}
            </div>
        );
    }

    const handleAllProductsClick = () => {
        if (hideAutosuggest) hideAutosuggest();
        if (setQuery) setQuery(autosuggestQuery);
    };

    return (
        <div className="autosuggest-wrapper">
            {trendingSearches.length > 0 && (autosuggestQuery === "*" || autosuggestQuery === "") && TrendingQueriesComponent && (
                <TrendingQueriesComponent
                    headerText="Trending Queries:"
                    trendingQueries={trendingSearches}
                    hideAutosuggest={hideAutosuggest}
                    setAutosuggestQuery={setAutosuggestQuery}
                    HeaderComponent={TrendingQueriesHeaderComp}
                    onItemClick={onItemClick}
                />
            )}
            {autosuggestQuery !== "*" && autosuggestQuery !== "" && (
                <>
                    <div className="inner-wrapper">
                        <div className="main-tpl">
                            {products.length > 0 && PopularProductsComponent && (
                                <PopularProductsComponent
                                    headerText="Popular Products:"
                                    autosuggestQuery={hoveredQuery}
                                    products={products}
                                    hideAutosuggest={hideAutosuggest}
                                    HeaderComponent={PopularProductsHeaderComp}
                                    onItemClick={onItemClick}
                                />
                            )}
                        </div>
                        <div className="side-tpl">
                            {promotedSuggestions.length > 0 && PromotedSuggestionsComponent && (
                                <PromotedSuggestionsComponent
                                    headerText="Promoted Suggestions:"
                                    hoveredQuery={hoveredQuery}
                                    promotedSuggestions={promotedSuggestions}
                                    onHover={handleHover}
                                    hideAutosuggest={hideAutosuggest}
                                    setAutosuggestQuery={setAutosuggestQuery}
                                    HeaderComponent={PromotedSuggestionsHeaderComp}
                                    onItemClick={onItemClick}
                                    onItemHover={onItemHover}
                                />
                            )}
                            {topSearchSuggestions.length > 0 && TopQueriesComponent && (
                                <TopQueriesComponent
                                    headerText="Top Search Suggestions:"
                                    topQueries={topSearchSuggestions}
                                    hideAutosuggest={hideAutosuggest}
                                    setAutosuggestQuery={setAutosuggestQuery}
                                    HeaderComponent={TopQueriesHeaderComp}
                                    onItemClick={onItemClick}
                                    hoveredQuery={hoveredQuery}
                                    onHover={handleHover}
                                />
                            )}
                            {keywordSuggestions.length > 0 && KeywordSuggestionsComponent && (
                                <KeywordSuggestionsComponent
                                    headerText="Keyword Suggestions:"
                                    keywordSuggestions={keywordSuggestions}
                                    onHover={handleHover}
                                    hoveredQuery={hoveredQuery}
                                    hideAutosuggest={hideAutosuggest}
                                    setAutosuggestQuery={setAutosuggestQuery}
                                    HeaderComponent={KeywordSuggestionsHeaderComp}
                                    onItemClick={onItemClick}
                                />
                            )}
                            {inFields.length > 0 && InFields && (
                                <InFields
                                    headerText="InField Suggestions:"
                                    inFields={inFields}
                                    filterField={filterField}
                                    onHover={handleHover}
                                    hoveredQuery={hoveredQuery}
                                    hideAutosuggest={hideAutosuggest}
                                    noOfInfields={noOfInfields}
                                    HeaderComponent={InFieldsHeaderComp}
                                    onItemClick={onItemClick}
                                />
                            )}
                        </div>
                        {(products.length == 0 &&
                            promotedSuggestions.length == 0
                            && topSearchSuggestions.length == 0
                            && keywordSuggestions.length == 0
                            && inFields.length == 0) && (
                            <AutosuggestNoResult autosuggestQuery={hoveredQuery} />
                        )}
                    </div>

                    {!(products.length == 0 && promotedSuggestions.length == 0 && topSearchSuggestions.length == 0 && keywordSuggestions.length == 0 && inFields.length == 0) && (
                        <div className="show-all-products" title={autosuggestQuery.replace(/>/g, " > ")} onMouseDown={handleAllProductsClick}>
                            Show all products for <span className="query">&nbsp;"<span className="query-text">{autosuggestQuery.replace(/>/g, " > ")}</span>"</span>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AutosuggestComponent;