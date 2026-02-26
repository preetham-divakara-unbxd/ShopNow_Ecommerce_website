import { SearchBox, Summary, Banner, Products, Image, Facets, RangeFacet, SelectedFacets, CheckboxFacet, MultilevelFacet, ProductViewRadioButtons, ProductViewButtons, PageSize, SortButtons, LoadMorePagination, FixedPagination, Breadcrumb } from "@unbxd-ui/react-search-components"
// import { useProductView } from "@unbxd-ui/react-search-hooks";
import { useOutletContext } from 'react-router';
import SummaryComponent from '../components/SummaryComponent'
import PaginationComponent from "../components/PaginationComponent";
import PageSizeComponent from "../components/PageSizeComponent";
import SortComponent from "../components/SortComponent";
import ProductViewComponent from "../components/ProductViewComponent";
import BannerComponent from "../components/BannerComponent";
import FacetComponent from "../components/FacetComponent";
import PageSizePills from "../usecases/pagesize/PageSizePills";
import PageSizeRadiobuttons from "../usecases/pagesize/PageSizeRadiobuttons";
import SortButtonsComponent from "../usecases/sort/SortButtonsComponent";
import SortDropdownComponent from "../usecases/sort/SortDropdownComponent";
import SortRadiobuttonsComponent from "../usecases/sort/SortRadiobuttonsComponent";
import SortIconsComponent from "../usecases/sort/SortIconsComponent";
import ProductViewButtonsComponent from "../usecases/productview/ProductViewButtonsComponent";
import ProductViewDropdownComponent from "../usecases/productview/ProductViewDropdownComponent";
import ProductViewSMLComponent from "../usecases/productview/ProductViewSMLComponent";
import FixedPagination2 from "../usecases/fixedpagination/FixedPagination2";
import FixedPagination1 from "../usecases/fixedpagination/FixedPagination1";
import FixedPagination3 from "../usecases/fixedpagination/FixedPagination3";
import FixedPagination4 from "../usecases/fixedpagination/FixedPagination4";
import FixedPagination5 from "../usecases/fixedpagination/FixedPagination5";
import LoadMore1 from "../usecases/loadmorepagination/LoadMore1";
import LoadMore2 from "../usecases/loadmorepagination/LoadMore2";
import LoadMore3 from "../usecases/loadmorepagination/LoadMore3";
import BreadcrumbComponent from "../components/BreadcrumbComponent";
import Facets1 from "../usecases/facets/Facets1";
import Facets8 from "../usecases/facets/Facets8";
import Facets4 from "../usecases/facets/Facets4";
import Facets10 from "../usecases/facets/Facets10";
import Facets2 from "../usecases/facets/Facets2";
import Facets3 from "../usecases/facets/Facets3";
import Facets6 from "../usecases/facets/Facets6";
import Facets11 from "../usecases/facets/Facets11";
import Facets12 from "../usecases/facets/Facets12";
import Facets13 from "../usecases/facets/Facets13";
import Facets14 from "../usecases/facets/Facets14";
import PageSizeDropdown from "../usecases/pagesize/PageSizeDropdown";
// import VisualSearchComponent from '../components/VisualSearchComponent';


import "@unbxd-ui/react-search-components/styles/searchbox.css";
import "@unbxd-ui/react-search-components/styles/summary.css";
import "@unbxd-ui/react-search-components/styles/products.css";
import "@unbxd-ui/react-search-components/styles/facets.css";
import "@unbxd-ui/react-search-components/styles/checkboxFacet.css";
import "@unbxd-ui/react-search-components/styles/productViewRadioButtons.css";
import "@unbxd-ui/react-search-components/styles/pageSize.css";
import "@unbxd-ui/react-search-components/styles/sortButtons.css";
import "@unbxd-ui/react-search-components/styles/loadMorePagination.css";
import "@unbxd-ui/react-search-components/styles/fixedPagination.css";
import "@unbxd-ui/react-search-components/styles/productViewButtons.css";
import "@unbxd-ui/react-search-components/styles/banner.css";
import "@unbxd-ui/react-search-components/styles/breadcrumb.css";
import "@unbxd-ui/react-search-components/styles/multilevelFacet.css";
import "@unbxd-ui/react-search-components/styles/selectedFacets.css";
// require.resolve("@unbxd-ui/react-search-components/styles/loadMorePagination.css");

const LoaderComponent = ({ className }) => {
    return <div className={className}>
        <img src={"/loader.gif"} alt="loader" />
    </div>
};
const LoaderComponent2 = ({ className }) => {
    return (
        <div className={className}>
            Loading...
        </div>
    );
};
const LoaderComponent3 = ({ className }) => {
    return <div className={className}>
        <img src={"/blueLoader.svg"} alt="loader" />
    </div>
};
const ProductHover = ({ product }) => {
    const { idx, uniqueId, title, price, imageUrl } = product;
    // console.log(product);
    // console.log(idx, uniqueId, title, price, imageUrl);

    return (
        <div
            data-prank={idx}
            key={uniqueId}
            className="product-card"
            onClick={(event) => {
                event.stopPropagation();
            }}
            style={{ cursor: "pointer" }}>
            <Image imageUrl={imageUrl[0]} hoverImageUrl={imageUrl[0]} />
            <div className="product-description">
                <h3 className="product-title">{title}</h3>
                <div className="product-price">${price}</div>
            </div>
        </div>
    );
}

function Search() {
    const { activeUsecases } = useOutletContext();

    const renderPagination = () => {
        switch (activeUsecases.pagination) {
            case 'LoadMore1': return <LoadMore1 />;
            case 'LoadMore2': return <LoadMore2 />;
            case 'LoadMore3': return <LoadMore3 />;
            case 'FixedPagination1': return <FixedPagination1 />;
            case 'FixedPagination2': return <FixedPagination2 />;
            case 'FixedPagination3': return <FixedPagination3 />;
            case 'FixedPagination4': return <FixedPagination4 />;
            case 'FixedPagination5': return <FixedPagination5 />;
            default: return <LoadMore1 />;
        }
    };
    const renderPageSize = () => {
        switch (activeUsecases.pageSize) {
            case 'PageSizeDropdown': return <PageSizeDropdown />;
            case 'PageSizePills': return <PageSizePills />;
            case 'PageSizeRadiobuttons': return <PageSizeRadiobuttons />;

            default: return <PageSizeDropdown />;
        }
    };

    const renderSort = () => {
        switch (activeUsecases.sorting) {
            case 'SortDropdownComponent': return <SortDropdownComponent />;
            case 'SortButtonsComponent': return <SortButtonsComponent />;
            case 'SortRadiobuttonsComponent': return <SortRadiobuttonsComponent />;
            case 'SortIconsComponent': return <SortIconsComponent />;

            default: return <SortDropdownComponent />;
        }
    }

    const renderProductView = () => {
        switch (activeUsecases.productView) {
            case 'ProductViewButtonsComponent': return <ProductViewButtonsComponent />;
            case 'ProductViewDropdownComponent': return <ProductViewDropdownComponent />;
            case 'ProductViewSMLComponent': return <ProductViewSMLComponent />;
            default: return <ProductViewSMLComponent />;
        }
    };
    const isDropdownFacet = ['Facets1', 'Facets2', 'Facets3', 'Facets4'].includes(activeUsecases.facets);

    const renderFacets = () => {
        switch (activeUsecases.facets) {
            case 'Facets1': return <Facets1 />;
            case 'Facets2': return <Facets2 />;
            case 'Facets3': return <Facets3 />;
            case 'Facets4': return <Facets4 />;
            case 'Facets6': return <Facets6 />;
            case 'Facets10': return <Facets10 />;
            case 'Facets12': return <Facets12 />;
            case 'Facets13': return <Facets13 />;
            case 'Facets14': return <Facets14 />;
            default: return <Facets14 />;
        }
    };
    return (
        <div className="search-page">


            {/* Search Content */}
            <div className="search-container">

                <div className="search-box-wrapper">
                    <SearchBox
                        showSubmitButton={true}
                        submitOnEnter={true}
                        debounce={true}
                        delay={300}
                        showClear={true}
                        autosuggest={{ enabled: true }}
                    />
                </div>
                <div className="breadcrumb-row">
                    {/* <Breadcrumb name="categoryPath" /> */}
                    <BreadcrumbComponent name="categoryPath" />
                </div>

                <div className="results-count-row">
                    <SummaryComponent />
                    {/* <Summary /> */}
                    {/* <RefreshButton /> */}
                </div>
                {/* <div className="visual-search-row">
                    <VisualSearchComponent />
                </div> */}


                <div className="controls-row">
                    <div className="view-control">
                        {/* <ProductViewRadioButtons
                            showLabel={true}
                            label={"View:"}
                            options={[{ label: "GRID", value: "GRID" }, { label: "LIST", value: "LIST" }]}
                            styles={{
                                root: "root",
                                label: "label",
                                container: "view-container",
                                radioItem: "view-radio-item",
                                inputBtn: "view-button",
                                inputLabel: "view-input-label",
                                selected: "selected"
                            }}
                        /> */}
                        {/* <ProductViewButtons
                            showLabel={true}
                            label={"View as"}
                            options={[{ value: "GRID", label: "GRID" }, { value: "LIST", label: "LIST" }]}
                            styles={{
                                root: "view-root",
                                label: "view-label",
                                optionContainer: "view-option-container",
                                option: "view-option",
                                selected: "selected",
                                text: "text"
                            }}
                        /> */}
                        {/* <ProductViewComponent /> */}
                        {/* <ProductViewButtonsComponent /> */}
                        {/* <ProductViewDropdownComponent /> */}
                        {/* <ProductViewSMLComponent /> */}

                        {/* <FixedPagination1 /> */}
                        {renderProductView()}

                    </div>
                    <div className="pagesize-control">
                        {/* <PageSize text={"Products per page:"} options={[12, 16, 24]} /> */}
                        {/* <PageSizeComponent /> */}
                        {/* <PageSizeDropdown /> */}
                        {/* <PageSizePills /> */}
                        {/* <PageSizeRadiobuttons /> */}
                        {renderPageSize()}
                    </div>
                    <div className="sort-control">
                        {/* <SortButtons
                            showLabel={true}
                            options={[
                                {
                                    value: "price desc",
                                    label: "High to Low",
                                },
                                {
                                    value: "price asc",
                                    label: " Low to High",
                                },
                            ]}
                            label={"Sort By:"}

                        /> */}
                        {/* <SortComponent /> */}
                        {/* <SortButtonsComponent /> */}
                        {/* <SortDropdownComponent /> */}
                        {/* <SortRadiobuttonsComponent /> */}
                        {/* <SortIconsComponent /> */}
                        {renderSort()}
                    </div>
                </div>
                <div className="selected-facets-row">
                    {/* <SelectedFacets /> */}
                    <Facets8 />
                    {/* <Facets10 /> */}
                </div>

                <div className="facets-row">


                    {/* <CheckboxFacet
                        name="size_uFilter"
                        renderAs="dropdown"
                        applyAll={true}
                        searchable={true}
                        multiselect={true}
                        clearBtn={true}
                        showSelectedFacets={true}
                    />
                    <CheckboxFacet
                        name="gender_uFilter"
                        renderAs="dropdown"
                        applyAll={true}
                        searchable={true}
                        multiselect={true}
                        clearBtn={true}
                        showSelectedFacets={true}
                        // CustomComponent={FacetIcons}
                    />*/}
                    {/* <CheckboxFacet
                        name="color_uFilter"
                        renderAs="dropdown"
                        applyAll={true}
                        searchable={true}
                        multiselect={true}
                        clearBtn={true}
                        showSelectedFacets={true}
                        // CustomComponent={FacetSwatch}
                    />  */}
                    {/* <Facets
                        configs={{
                            defaultOpen: false,
                            renderAs: "dropdown",
                            searchable: true,
                            placeholder: "Enter facet",
                            multiselect: true,
                            isCollapsible: true,
                            applyAll: true,
                            applyAllLabel: "all f",
                            clearBtn: true,
                            clearBtnLabel: "clear f",
                            showSelectedFacets: true,
                            viewMoreLimit: 4,
                            showRemainingNumber: true
                        }}
                    /> */}
                    {/* <FacetComponent /> */}
                    {/* <Facets1 /> */}
                    {/* <Facets4 /> */}
                    {/* <Facets2 /> */}
                    {/* <Facets3 /> */}
                    {/* <RangeFacet isMultiSlider={true} name="price" defaultOpen={false} renderAs="accordion" showSelectedFacets={true} /> */}
                    {isDropdownFacet && renderFacets()}




                </div>
                <div className="products-wrapper">
                    {/* <Banner /> */}
                    <BannerComponent />
                    {/* <Products ProductComponent={ProductHover}  /> */}

                    <div className="sidebar-content-wrapper">
                        <div>
                            {/* <Facets6 /> */}
                            {/* <Facets10 /> */}
                            {/* <Facets11/> */}
                            {/* <Facets12 /> */}

                            {/* <Facets13/> */}
                            {/* <Facets14 /> */}
                            {!isDropdownFacet && renderFacets()}
                        </div>
                        <div>
                            <Products ProductComponent={ProductHover} />
                        </div>
                    </div>

                    <div className="pagination-wrapper">
                        {/* <PaginationComponent /> */}

                        {/* <LoadMorePagination LoaderComponent={LoaderComponent3} >
                            <Products ProductComponent={ProductHover} />
                        </LoadMorePagination> */}

                        {/* <FixedPagination
                            onPaginate={() => {
                                document.querySelector(".product-container")?.scrollIntoView({ behavior: "smooth", block: "start", inline: "start" });
                            }}
                            viewAs="BUTTONS"
                            pageLimit={5}
                        /> */}
                        {/* <FixedPagination
                            onPaginate={() => {
                                document.querySelector(".product-container")?.scrollIntoView({ behavior: "smooth", block: "start", inline: "start" });
                            }}
                            viewAs="DROPDOWN"
                            pageLimit={5}
                        /> */}
                        {/* <FixedPagination1 /> */}
                        {/* <FixedPagination2 /> */}
                        {/* <FixedPagination3 /> */}
                        {/* <FixedPagination4 /> */}
                        {/* <FixedPagination5 /> */}
                        {/* for fixed pagination 6 is included inside  <FixedPagination1 /> */}
                        {/* for fixed pagination 7 uncomment <FixedPagination1 /> in product view */}

                        {/* <LoadMore1 /> */}
                        {/* <LoadMore2 /> */}
                        {/* <LoadMore3 /> */}
                        {renderPagination()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search;