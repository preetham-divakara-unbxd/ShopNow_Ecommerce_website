import { Routes, Route, Outlet, useNavigate } from 'react-router'
import { UnbxdSearchCSRWrapper } from "@unbxd-ui/react-search-hooks"
import { useState } from 'react'
import Home from './pages/Home'
import Search from './pages/Search'
import Header from './components/Header'

function Layout() {

  const [activeUsecases, setActiveUsecases] = useState({
    pagination: 'LoadMore1',
    sorting: 'SortDropdownComponent',
    facets: 'Facets14',
    pageSize: 'PageSizeDropdown',
    productView: 'ProductViewSMLComponent'
  });
  return (
    <>
      <Header activeUsecases={activeUsecases} setActiveUsecases={setActiveUsecases} />
      <Outlet context={{ activeUsecases }} />
    </>
  )
}

function App() {

  const navigate = useNavigate();
  // //console.log("Site Key:", import.meta.env.VITE_UNBXD_SITE_KEY);
  return (
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
          key: "query"
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
        pagination: { addToUrl: true, key: "start", usePageNo: false },
        facets: {
          addToUrl: true,
          valuesSeparator: "|",
          keys: {
            manufacturer_uFilter: "brand",
            rmsAvFeatures_uFilter: "feature",
            rmsColourfin_uFilter: "color"

          },
          values: {
            manufacturer_uFilter: {Samsung: "Smg",Telstra: "Tel"}
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


          if (search.includes('query=') || pathname === '/search') {
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
        variants:{
          enabled: true, 
          count: 5, 
          attributes: ["title", "v_imageUrl","v_title"], 
          mapping: {image_url: "v_imageUrl"}
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
        </Route>
      </Routes>
    </UnbxdSearchCSRWrapper >
  )
}

export default App