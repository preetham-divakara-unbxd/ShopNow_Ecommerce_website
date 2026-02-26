import { Link } from 'react-router'
import shopnowLogo from '../assets/shopnow.png'
import { SearchBox } from "@unbxd-ui/react-search-components"
import "@unbxd-ui/react-search-components/styles/searchbox.css"
import "@unbxd-ui/react-search-components/styles/autosuggest.css";
import SearchComponent from './SearchComponent'
import AutosuggestComponent from './AutosuggestComponent'
import { useState } from 'react'

function Header({ activeUsecases, setActiveUsecases }) {

    const [hoveredPill, setHoveredPill] = useState(null);

    const paginationOptions = [
        {
            group: 'LOAD MORE',
            items: [
                { key: 'LoadMore1', label: 'Load More Button', description: 'Click button to load next batch' },
                { key: 'LoadMore2', label: 'Load More with Page Info', description: 'Shows current page progress info' },
                { key: 'LoadMore3', label: 'Load More with Progress', description: 'Visual progress bar indicator' },
            ]
        },
        {
            group: 'FIXED PAGINATION',
            items: [
                { key: 'FixedPagination1', label: 'Numbered Buttons', description: 'Page number buttons with navigation' },
                { key: 'FixedPagination2', label: 'Prev / Next Only', description: 'Simple previous and next controls' },
                { key: 'FixedPagination3', label: 'With First / Last', description: 'Full navigation with boundary links' },
                { key: 'FixedPagination4', label: 'Dropdown', description: 'Page selector dropdown' },
                { key: 'FixedPagination5', label: 'Compact', description: 'Minimal compact pagination' },
            ]
        }
    ];

    const pageSizeOptions = [
        {
            group: 'PAGE SIZE CONTROLS',
            items: [
                { key: 'PageSizeDropdown', label: 'Dropdown', description: 'Select page size from dropdown' },
                { key: 'PageSizePills', label: 'Pills', description: 'Clickable pill buttons' },
                { key: 'PageSizeRadiobuttons', label: 'Radio Buttons', description: 'Radio button selection' },
            ]
        }
    ];

    const sortingOptions = [
        {
            group: 'SORT CONTROLS',
            items: [
                { key: 'SortDropdownComponent', label: 'Dropdown', description: 'Sort from dropdown menu' },
                { key: 'SortButtonsComponent', label: 'Buttons', description: 'Clickable sort buttons' },
                { key: 'SortRadiobuttonsComponent', label: 'Radio Buttons', description: 'Radio button sort options' },
                { key: 'SortIconsComponent', label: 'Icons', description: 'Icon-based sort controls' },
            ]
        }
    ];
    const productViewOptions = [
        {
            group: 'TOGGLE CONTROLS',
            items: [
                { key: 'ProductViewButtonsComponent', label: 'Button Toggle', description: 'Grid/List toggle buttons' },
                { key: 'ProductViewDropdownComponent', label: 'Dropdown Select', description: 'Dropdown view selector' },
            ]
        },
        {
            group: 'SIZE VARIANTS',
            items: [
                { key: 'ProductViewSMLComponent', label: 'Size Pills', description: 'Small, Medium, Large size pills' },
            ]
        }
    ];
    const facetsOptions = [
        {
            group: 'DROPDOWN STYLE',
            items: [
                { key: 'Facets1', label: 'Basic Checkbox', description: 'Simple checkbox facets only' },
                { key: 'Facets2', label: 'Search + Swatches', description: 'Searchbox, color swatches, selected shown' },
                { key: 'Facets3', label: 'Search + Swatches + Pills', description: 'Searchbox, color swatches, brand pills' },
                { key: 'Facets4', label: 'Search + Selected', description: 'Searchbox with selected facets shown' },
            ]
        },
        {
            group: 'ACCORDION STYLE',
            items: [
                { key: 'Facets6', label: 'Non-collapsible + Search', description: 'Search box, selected facets shown' },
                { key: 'Facets10', label: 'Apply & Clear', description: 'Selected facets, apply/clear buttons' },
                { key: 'Facets12', label: 'With Range Facet', description: 'Apply/clear buttons, range facet support' },
                { key: 'Facets13', label: 'Range Slider Bar', description: 'Apply/clear, range facet with slider' },
                { key: 'Facets14', label: 'Full Featured', description: 'Range, multilevel facet support' },
            ]
        }
    ];

    console.log("SearchBox:", SearchBox);
    const autosuggestConfig = {
        enabled: true,
        delay: 0,
        minChars: 2,
        AutosuggestComponent: AutosuggestComponent,
        trendingSearches: {
            enabled: true,
            count: 6
        },
        inFields: {
            enabled: true,
            count: 2,
            prefetch: false,
            filterField: "category",
            noOfInfields: 2
        },
        keywordSuggestions: {
            enabled: true,
            count: 5,
            prefetch: false
        },
        popularProducts: {
            enabled: true,
            count: 3,
            fields: []
        },
    };
    return (
        <header className="search-header">
            <div className="header-content">
                <Link to="/" className="header-logo-link">
                    <img
                        src={shopnowLogo}
                        alt="ShopNow Logo"
                        className="header-logo-image"
                    />
                    <div className="header-logo-text">
                        <span className="header-logo-brand">SHOP</span>
                        <span className="header-logo-main">Now</span>
                    </div>
                </Link>

                {/* SearchBox in Header */}
                <div className="header-search-box">
                    {/* <SearchComponent autosuggest={autosuggestConfig}/> */}
                    {/* <SearchBox
                        showSubmitButton={true}
                        submitOnEnter={true}
                        debounce={true}
                        delay={300}
                        showClear={true}
                       autosuggest={{ enabled: true }}
                     />  */}
                </div>
                <div className="header-usecase-pills">
                    <div
                        className={`usecase-pill ${hoveredPill === 'facets' ? 'active' : ''}`}
                        onMouseEnter={() => setHoveredPill('facets')}
                        onMouseLeave={() => setHoveredPill(null)}
                    >
                        Facets
                        {hoveredPill === 'facets' && (
                            <div className="usecase-dropdown usecase-dropdown-rich">
                                <div className="usecase-dropdown-title">Facets Variants</div>
                                {facetsOptions.map(group => (
                                    <div key={group.group}>
                                        <div className="usecase-dropdown-group">{group.group}</div>
                                        {group.items.map(opt => (
                                            <div
                                                key={opt.key}
                                                className={`usecase-dropdown-rich-item ${activeUsecases.facets === opt.key ? 'active' : ''}`}
                                                onClick={() => setActiveUsecases({ ...activeUsecases, facets: opt.key })}
                                            >
                                                <div className="item-title">{opt.label}</div>
                                                <div className="item-desc">{opt.description}</div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div
                        className={`usecase-pill ${hoveredPill === 'productView' ? 'active' : ''}`}
                        onMouseEnter={() => setHoveredPill('productView')}
                        onMouseLeave={() => setHoveredPill(null)}
                    >
                        Product View
                        {hoveredPill === 'productView' && (
                            <div className="usecase-dropdown usecase-dropdown-rich">
                                <div className="usecase-dropdown-title">Products Variants</div>
                                {productViewOptions.map(group => (
                                    <div key={group.group}>
                                        <div className="usecase-dropdown-group">{group.group}</div>
                                        {group.items.map(opt => (
                                            <div
                                                key={opt.key}
                                                className={`usecase-dropdown-rich-item ${activeUsecases.productView === opt.key ? 'active' : ''}`}
                                                onClick={() => setActiveUsecases({ ...activeUsecases, productView: opt.key })}
                                            >
                                                <div className="item-title">{opt.label}</div>
                                                <div className="item-desc">{opt.description}</div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div
                        className={`usecase-pill ${hoveredPill === 'pageSize' ? 'active' : ''}`}
                        onMouseEnter={() => setHoveredPill('pageSize')}
                        onMouseLeave={() => setHoveredPill(null)}
                    >
                        PageSize
                        {hoveredPill === 'pageSize' && (
                            <div className="usecase-dropdown usecase-dropdown-rich">
                                <div className="usecase-dropdown-title">Page Size Variants</div>
                                {pageSizeOptions.map(group => (
                                    <div key={group.group}>
                                        <div className="usecase-dropdown-group">{group.group}</div>
                                        {group.items.map(opt => (
                                            <div
                                                key={opt.key}
                                                className={`usecase-dropdown-rich-item ${activeUsecases.pageSize === opt.key ? 'active' : ''}`}
                                                onClick={() => setActiveUsecases({ ...activeUsecases, pageSize: opt.key })}
                                            >
                                                <div className="item-title">{opt.label}</div>
                                                <div className="item-desc">{opt.description}</div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div
                        className={`usecase-pill ${hoveredPill === 'sorting' ? 'active' : ''}`}
                        onMouseEnter={() => setHoveredPill('sorting')}
                        onMouseLeave={() => setHoveredPill(null)}
                    >
                        Sorting
                        {hoveredPill === 'sorting' && (
                            <div className="usecase-dropdown usecase-dropdown-rich">
                                <div className="usecase-dropdown-title">Sorting Variants</div>
                                {sortingOptions.map(group => (
                                    <div key={group.group}>
                                        <div className="usecase-dropdown-group">{group.group}</div>
                                        {group.items.map(opt => (
                                            <div
                                                key={opt.key}
                                                className={`usecase-dropdown-rich-item ${activeUsecases.sorting === opt.key ? 'active' : ''}`}
                                                onClick={() => setActiveUsecases({ ...activeUsecases, sorting: opt.key })}
                                            >
                                                <div className="item-title">{opt.label}</div>
                                                <div className="item-desc">{opt.description}</div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div
                        className={`usecase-pill ${hoveredPill === 'pagination' ? 'active' : ''}`}
                        onMouseEnter={() => setHoveredPill('pagination')}
                        onMouseLeave={() => setHoveredPill(null)}
                    >
                        Pagination
                        {hoveredPill === 'pagination' && (
                            <div className="usecase-dropdown usecase-dropdown-rich">
                                <div className="usecase-dropdown-title">Pagination Variants</div>
                                {paginationOptions.map(group => (
                                    <div key={group.group}>
                                        <div className="usecase-dropdown-group">{group.group}</div>
                                        {group.items.map(opt => (
                                            <div
                                                key={opt.key}
                                                className={`usecase-dropdown-rich-item ${activeUsecases.pagination === opt.key ? 'active' : ''}`}
                                                onClick={() => setActiveUsecases({ ...activeUsecases, pagination: opt.key })}
                                            >
                                                <div className="item-title">{opt.label}</div>
                                                <div className="item-desc">{opt.description}</div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header