
// import analyticsConfig from './metadata.json';

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
            // console.log("srcValue:", srcValue);
            const filename = srcValue.split('/').pop();
            const match = filename.match(/S\d{3}(\d{7})R/);
            // console.log("extracted pid:", match ? match[1] : 'NO MATCH');
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

    addToCartFromCartPage: {
        cartItemWrapper: ".cart-items-list .cart-item",
        pidSelector: ".cart-items-list .cart-item .cart-item-img",
        productPidAttr: "src",
        getPidFromCB: (srcValue) => {
            const filename = srcValue.split('/').pop();
            const match = filename.match(/S\d{3}(\d{7})R/);
            return match ? match[1] : '';
        },

        qtySelector: ".cart-items-list .cart-item .cart-qty-value",
        qtyMinusSelector: ".cart-qty-controls .cart-qty-btn:first-child",
        qtyPlusSelector: ".cart-qty-controls .cart-qty-btn:last-child",
        qtyDelay: 2000, // for 2sec
        source: "ADD_TO_CART_FROM_CART_PAGE",
    },
    addToCartFromCartPopup: {
        cartItemWrapper: ".cart-popup-items .cart-popup-item",
        pidSelector: ".cart-popup-items .cart-popup-item .cart-popup-item-img",
        productPidAttr: "src",
        getPidFromCB: (srcValue) => {
            const filename = srcValue.split('/').pop();
            const match = filename.match(/S\d{3}(\d{7})R/);
            return match ? match[1] : '';
        },

        qtySelector: ".cart-popup-items .cart-popup-item .cart-popup-qty-value",
        qtyMinusSelector: ".cart-popup-qty-controls .cart-popup-qty-btn:first-child",
        qtyPlusSelector: ".cart-popup-qty-controls .cart-popup-qty-btn:last-child",
        qtyDelay: 2000, // for 2sec
        source: "ADD_TO_CART_FROM_CART_POPUP"
    },
    orderFromCheckoutPage: {
        orderItemWrapper: ".cart-items-list .cart-item",
        buyButtonSelector: '.cart-footer-btns .cart-place-order-btn',
        pidSelector: ".cart-items-list .cart-item .cart-item-img",
        productPidAttr: "src",
        getPidFromCB: (srcValue) => {
            const filename = srcValue.split('/').pop();
            const match = filename.match(/S\d{3}(\d{7})R/);
            return match ? match[1] : '';
        },

        qtySelector: ".cart-items-list .cart-item .cart-qty-value",
        qtyMinusSelector: ".cart-qty-controls .cart-qty-btn:first-child",
        qtyPlusSelector: ".cart-qty-controls .cart-qty-btn:last-child",
        qtyDelay: 2000, // for 2sec
        priceSelector: '.cart-item-details .cart-item-price',
        source: "ORDER_FROM_CHECKOUT",

    },
    facets: [
        {
            elemWrapper: ".multi-select-facets .facet-group",
            triggers: {
                facetElem: ".multi-select-facets .facet-group label ",
                clearAll: ".multi-select-facets .facets10-clear-btn",
                applyAll: ".multi-select-facets .facets10-apply-btn",

            },
            selected: {
                selector: ".multi-select-facets .facet-group label input[type='checkbox']:checked"
            },
            name: {
                selector: ".multi-select-facets .facets-displayName"
            },
            value: {
                selector: "label .facet-value-text",
                getDataFromCB: function (data) {
                    console.log("data coming", data);
                    return data.replace(/\s*\(\d+\)\s*$/g, '').trim();
                }
            },

        },
        {
            elemWrapper: ".facets-row .UNX-dropdown",
            triggers: {
                facetElem: ".UNX-dropdown .checkbox-root",

            },
            selected: {
                selector: ".facets-row .UNX-dropdown .checkbox-root input[type='checkbox']:checked"
            },
            name: {
                selector: ".UNX-dropdown .facets-displayName"
            },
            value: {
                selector: ".checkbox-root .facet-value-text",

            },

        },
        {
            elemWrapper: ".facets-row .UNX-dropdown",
            triggers: {
                facetElem: ".UNX-dropdown .facet-swatch-row ",

            },
            selected: {
                selector: ".facets-row .UNX-dropdown .facet-swatch-row.selected"
            },
            name: {
                selector: ".UNX-dropdown .facets-displayName"
            },
            value: {
                selector: ".facet-swatch-row .swatch-label",
                getDataFromCB: function (data) {
                    console.log("data coming", data);
                    return data.replace(/\s*\(\d+\)\s*$/g, '').trim();
                }
            },

        },
        {
            elemWrapper: ".facets-row .UNX-dropdown",
            triggers: {
                facetElem: ".UNX-dropdown .facet-pill",

            },
            selected: {
                selector: ".facets-row .UNX-dropdown .facet-pill.selected"
            },
            name: {
                selector: ".UNX-dropdown .facets-displayName"
            },
            value: {
                selector: ".facet-pill .facet-value-text",
            },

        },
        {
            elemWrapper: ".facets-sidebar .UNX-dropdown",
            triggers: {
                facetElem: ".UNX-dropdown .checkbox-root",

            },
            selected: {
                selector: ".UNX-dropdown .checkbox-root input[type='checkbox']:checked"
            },
            name: {
                selector: ".UNX-dropdown .facets-displayName"
            },
            value: {
                selector: ".checkbox-root .facet-value-text",
            },

        },


    ],
    autosuggest: [
        {
            // config to track Trending_queries
            // eventListener: "click",
            elemWrapper: ".trending-queries .query",
            type: {
                attr: "data-type",
              
            },
            suggestion: {

                attr: "data-value",
            },
            prank: {
                attr: "data-index",

            },
            internalQuery: {
                selector: ".searchbox-root .searchbox-input",
                starQuery: ["TRENDING_QUERIES", "KEYWORD_SUGGESTION", "TOP_SEARCH_QUERIES", "PROMOTED_SUGGESTION"]
            }
        },
        {
            // config to track PROMOTED_SUGGESTIONS
            // eventListener: "click",
            elemWrapper: ".promoted-suggestions .body .promoted-suggestion",
           type: {
                attr: "data-type",
                
            },
            suggestion: {

                attr: "data-value",
            },
            prank: {
                attr: "data-index",

            },
            internalQuery: {
                selector: ".searchbox-root .searchbox-input",
                starQuery: ["TRENDING_QUERIES", "KEYWORD_SUGGESTION", "TOP_SEARCH_QUERIES", "PROMOTED_SUGGESTION"]
            }
        },
        {
            // config to track TOP_SEARCH_QUERIES
            // eventListener: "click",
            elemWrapper: ".top-queries .body .top-query",
            type: {
                
                attr: "data-type",
            },
            suggestion: {
                attr: "data-value",
            },
            prank: {
                attr: "data-index",
            },
            internalQuery: {
                selector: ".searchbox-root .searchbox-input",
                starQuery: ["TRENDING_QUERIES", "KEYWORD_SUGGESTION", "TOP_SEARCH_QUERIES", "PROMOTED_SUGGESTION"]
            }
        },
        {
            // config to track KEYWORD_SUGGESTION
            // eventListener: "click",
            elemWrapper: ".keyword-suggestions .body .keyword",
            type: {
                
                attr: "data-type",
            },
            suggestion: {
                attr: "data-value",
            },
            prank: {
                attr: "data-index",
            },
            internalQuery: {
                selector: ".searchbox-root .searchbox-input",
                starQuery: ["TRENDING_QUERIES", "KEYWORD_SUGGESTION", "TOP_SEARCH_QUERIES", "PROMOTED_SUGGESTION"]
            }
        },
        {
            // config to track Infield suggestions
            // eventListener: "click",
            elemWrapper: ".infields-wrapper .body .infield",
            type: {
                
                attr: "data-type",
            },
            suggestion: {
                attr: "data-value",
            },
            prank: {
                attr: "data-index",
            },
            internalQuery: {
                selector: ".searchbox-root .searchbox-input",
                starQuery: ["TRENDING_QUERIES", "KEYWORD_SUGGESTION", "TOP_SEARCH_QUERIES", "PROMOTED_SUGGESTION","IN_FIELD"]
            }
        },
      


    ],
    sorts: [
        {
            isSelectTag: true,
            triggers: {
                sortElem: ".sort-root .sort-dropdown",
            },
        },
        {
            triggers: {
                sortElem: ".sort-root .sort-radio-label",
            },
            value: {
                selector: ".sort-root .sort-radio-label span"
            }
        },
        {
            triggers: {
                sortElem: ".sort-root .sort-button",
            },

        },
        {
            triggers: {
                sortElem: ".sort-root .sort-button1 ",
            },
            value: {
                attr: "title",
            }

        },
        {
            triggers: {
                sortElem: ".facet-group .sort-radio-label",
            },
            value: {
                selector: ".facet-group .facet-value-text"
            }

        },
       
    ],
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
                    selectors: [".cart-page"],
                    operation: "or"
                },
            },
            order: {

                urlIdentifiers: {
                    urls: ["http://localhost:5173/order"],
                    exactMatch: true,
                },

            },

        }
    }




}
// window.UnbxdSiteName= analyticsConfig.siteName;
// window.UnxAnalyticsConfig = { ...siteConfig, metadata: analyticsConfig }; 

export default siteConfig;
