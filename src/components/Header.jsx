import { Link } from 'react-router'
import shopnowLogo from '../assets/shopnow.png'
import { SearchBox } from "@unbxd-ui/react-search-components"   
import "@unbxd-ui/react-search-components/styles/searchbox.css"
import "@unbxd-ui/react-search-components/styles/autosuggest.css";
import SearchComponent from './SearchComponent'
import AutosuggestComponent from './AutosuggestComponent' 

function Header() {
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
                    <SearchBox
                        showSubmitButton={true}
                        submitOnEnter={true}
                        debounce={true}
                        delay={300}
                        showClear={true}
                       autosuggest={{ enabled: true }}
                     /> 
                </div>
                {/* Right side spacer */}
                <div className="header-right-spacer"></div>

            </div>
        </header>
    )
}

export default Header