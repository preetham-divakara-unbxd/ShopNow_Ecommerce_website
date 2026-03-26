import { Routes, Route, Outlet, useNavigate } from 'react-router'
import { UnbxdSearchCSRWrapper } from "@unbxd-ui/react-search-hooks"
import { UnbxdShoppingAssistantWrapper } from "@unbxd-ui/react-shopping-assistant-hooks";
import { useState, useEffect } from 'react'
import Home from './pages/Home'
import Search from './pages/Search'
import Header from './components/Header'
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import analyticsConfig from './analytics/metadata.json';
import siteConfig from './analytics/config';
import OrdersPage from './pages/OrdersPage';
import Order from "./pages/Order";





function Layout() {

  const [activeUsecases, setActiveUsecases] = useState({
    pagination: 'LoadMore1',
    sorting: 'SortDropdownComponent',
    facets: 'Facets14',
    pageSize: 'PageSizeDropdown',
    productView: 'ProductViewSMLComponent'
  });
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const addToCart = (product) => {
    setCartItems(prev => {
      const exists = prev.find(item => item.uniqueId === product.uniqueId);
      let updated;
      if (exists) {
        updated = prev.map(item =>
          item.uniqueId === product.uniqueId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updated = [...prev, { ...product, quantity: 1 }];
      }
      localStorage.setItem('cart', JSON.stringify(updated));
      return updated;
    });
  };
  const updateQuantity = (uniqueId, delta) => {
    setCartItems(prev => {
      const updated = prev.map(item => {
        if (item.uniqueId === uniqueId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      });
      localStorage.setItem('cart', JSON.stringify(updated));
      return updated;
    });
  };
  const removeFromCart = (uniqueId) => {
    setCartItems(prev => {
      const updated = prev.filter(item => item.uniqueId !== uniqueId);
      localStorage.setItem('cart', JSON.stringify(updated));
      return updated;
    });
  };
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <>
      <Header
        activeUsecases={activeUsecases}
        setActiveUsecases={setActiveUsecases}
        cartCount={cartCount}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />
      <Outlet context={{ activeUsecases, cartItems, addToCart, removeFromCart, clearCart, cartCount, updateQuantity }} />
    </>
  );
}

function App() {

  const navigate = useNavigate();
 

  useEffect(() => {
    window.UnbxdSiteName = analyticsConfig.siteName;
    window.UnxAnalyticsConfig = { ...siteConfig, metaData: analyticsConfig };

    const script = document.createElement('script');
    script.src = 'https://libraries.unbxdapi.com/ua/v6.3.2/uaLibrary.js';
    document.head.appendChild(script);
  });
  // //console.log("Site Key:", import.meta.env.VITE_UNBXD_SITE_KEY);

  return (
    <UnbxdShoppingAssistantWrapper
      siteKey={import.meta.env.VITE_UNBXD_SITE_KEY}
      apiKey={import.meta.env.VITE_UNBXD_API_KEY}
      convStorageType="LOCALSTORAGE"
      convStorageName="home-srp"
      extraParams={{
        uid: "user123",

      }}
      apiEndpoint="https://aus.assistant.unbxd.io"
      requestBody={() => {
        const pathname = window.location.pathname;
        if (pathname.startsWith('/product/')) {
          return { pagetype: "pdp" };
        }
        return { pagetype: "home" };
      }}


    >
      <UnbxdSearchCSRWrapper
        siteKey={import.meta.env.VITE_UNBXD_SITE_KEY}
        apiKey={import.meta.env.VITE_UNBXD_API_KEY}
        defaultValues={{
          pageSize: 12,
          query: "",
          currentPage: 1,
          view: "GRID",
          sort: "",
        }}
        webUrlConfig={{
          hashMode: false,
          queryParamSeperator: "&",
          keySeperator: "=",
          orderOfParams: ["sort", "view", "query", "color_uFilter"],
          query: {
            addToUrl: true,
            key: "q"
          },
          imageQuery: {
            addToUrl: true,
            key: "image"
          },
          category: {
            addToUrl: true,
            key: "p"
          },
          sort: {
            addToUrl: true,
            key: "sor",
            values: {
              "price asc": "low",
              "price desc": "high"
            }
          },
          view: {
            addToUrl: true,
            key: "veiw",
            values: {
              SMALL: "S",
              MEDIUM: "M"
            }
          },
          pageSize: { addToUrl: true, key: "rows" },
          pagination: { addToUrl: true, key: "start", usePageNo: true },
          facets: {
            addToUrl: true,
            valuesSeparator: "|",
            keys: {
              manufacturer_uFilter: "brand",
              rmsAvFeatures_uFilter: "feature",
              rmsColourfin_uFilter: "color"

            },
            values: {
              manufacturer_uFilter: { Samsung: "Smg", Telstra: "Tel" }
              // Samsung: "Smg", //not working
              // Telstra: "Tel"
            }
          },
          externalParams: ["location"],
          rangeFacets: ["prices"],
          categoryFacets: ["categories"],

          setWebUrl: (newUrl, redirect, replace) => {

            // console.log("New URL:", newUrl, "Redirect:", redirect, "Replace:", replace);
            const url = new URL(newUrl, window.location.origin);
            // console.log("URL:", url);
            const pathname = url.pathname;
            const search = url.search;
            // console.log("Pathname:", pathname, "Search:", search);
            // console.log(window.location.origin);


            if (search.includes('q=') || pathname === '/search') {
              const targetUrl = `/search${search}`;

              if (replace) {
                navigate(targetUrl, { replace: true });
              } else {
                navigate(targetUrl);
              }
            } else {
              //home or //about 
              if (replace) {
                navigate(newUrl, { replace: true });
              } else {
                navigate(newUrl);
              }
            }
          }
        }}
        apiUrlConfig={{
          spellCheck: { enabled: true },
          products: {
            fields: []
          },
          variants: {
            enabled: true,
            count: 5,
            attributes: ["title", "v_imageUrl", "v_title"],
            mapping: { image_url: "v_imageUrl" }
          },
          facetMultiSelect: true,
          // category: { browseQueryParam: 'p', page: '/category', page_type: true },// not understood
          uc_param: "",
          extraParams: { channel: "web" },
          headers: {
            "Unbxd-User-Id": "user123",
            "Unbxd-Device-Type": "mobile"
          }          //not understood

        }}


      >
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/order" element={<Order />} />
          </Route>
        </Routes>
      </UnbxdSearchCSRWrapper >
    </UnbxdShoppingAssistantWrapper>
  )
}

export default App