import { Routes, Route ,Outlet,useNavigate} from 'react-router'
import { UnbxdSearchCSRWrapper } from "@unbxd-ui/react-search-hooks"
import Home from './pages/Home'
import Search from './pages/Search'
import Header from './components/Header'

function Layout() {
  return (
    <>
      <Header />
      <Outlet /> 
    </>
  )
}

function App() {

  const navigate = useNavigate();
  // console.log("Site Key:", import.meta.env.VITE_UNBXD_SITE_KEY);
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
        setWebUrl: (newUrl, redirect, replace) => {
       
          console.log("New URL:", newUrl, "Redirect:", redirect, "Replace:", replace);
          const url = new URL(newUrl, window.location.origin);
          const pathname = url.pathname;
          const search = url.search;
          console.log("Pathname:", pathname, "Search:", search);
          
        
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