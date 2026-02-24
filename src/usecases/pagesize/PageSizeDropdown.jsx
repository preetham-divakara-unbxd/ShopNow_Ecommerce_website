import { usePageSize } from "@unbxd-ui/react-search-hooks";
 
const PageSizeDropdown = () => {
	const { pageSize, setPageSize } = usePageSize([12, 16, 24]);
	
	const handlePageSizeChange = (pageSizeValue) => {
        const numericValue = Number(pageSizeValue);
        console.log("pageSizeValue:", pageSizeValue, "numericValue:", numericValue);
		setPageSize(numericValue);  // ✅ Pass number, not string
		// setPageSize(12);   // some external code chnage 
	};
 
	const renderPageSizeComponent = () => {
		return (
			<div className="page-size-container">
                <p>Page Size:</p>
				<select
					id="pageSize"
                    value={pageSize}
					onChange={(event) => {
                        console.log("event:", event);
						handlePageSizeChange(event.target.value);
					}}>
					<option value={12}>12</option>
					<option value={16}>16</option>
					<option value={24}>24</option>
				</select>
			</div>
		);
	};
	
	return renderPageSizeComponent();
};

export default PageSizeDropdown;