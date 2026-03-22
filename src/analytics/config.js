
import analyticsConfig from './metadata.json';

const siteConfig = {
    search: {
        inputBox: ".searchbox-root .searchbox-input",
        queryBtn: ".searchbox-root .searchbox-btn",
        urlParam: "q",

    },

    addToCartFromPDP: {
        addToCartBtnSelector: ".product-page-details .product-page-add-to-cart",
        // pidLocatorFromUrl: {
        //     // afterLocator: "product",
        //     endOfUrlPath: true,

        // },
        getPidFromCB: () => {
            const path = window.location.pathname;
            return path.split('/product/')[1] || '';
        },
        isVariant: false,

        source: "ADD_TO_CART_PDP",

    },

    addToCartFromSRP: {
        addToCartBtnSelector: ".product-container .search-page-add-to-cart",
        source: "ADD_TO_CART_SRP",
    },
    productClickGrid: {
        productElemWrapper: ".load-more-pagination-wrapper .product-container .product-card",
        pidSelector: ".load-more-pagination-wrapper .product-container .product-card .main-image",
        productPidAttr: "src",
      
        getPidFromCB: (srcValue) => {
            console.log("srcValue:", srcValue);
            const filename = srcValue.split('/').pop();
            const match = filename.match(/S\d{3}(\d{7})R/);
            console.log("extracted pid:", match ? match[1] : 'NO MATCH');
            return match ? match[1] : '';
        },
        excludeSelectors: [".product-container .search-page-add-to-cart"],
        source: "PRODUCT_CLICK_GRID"
    },
    // productClickGrid: {
    //     productElemWrapper: "[data-unxitem='product']",
    //     productPidAttr: "data-unxid",
    //     excludeSelectors: [],
    //     source: "PRODUCT_CLICK_GRID"
    // },
    pageView: {
        delay: "1500",
        events: {
            home: {
                uniqueSelectors: {
                    selectors: [".home-content"],
                },
                urlIdentifiers: {
                    urls: ["http://localhost:5173/"],
                    exactMatch: true,
                },


            },
            search: {
                uniqueSelectors: {
                    selectors: [".search-page"],
                },
            },
            productDisplay: {
                uniqueSelectors: {
                    selectors: [".product-page"],
                },
            },
            cart: {
                uniqueSelectors: {
                    selectors: [".cart-page",".cart-empty"],
                    operation: "or" 
                },
            },

        }
    }




}
// window.UnbxdSiteName= analyticsConfig.siteName;
// window.UnxAnalyticsConfig = { ...siteConfig, metadata: analyticsConfig }; 

export default siteConfig;
