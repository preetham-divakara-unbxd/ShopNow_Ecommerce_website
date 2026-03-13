import { usePagination ,useProducts} from '@unbxd-ui/react-search-hooks';
import { useEffect} from 'react';

const InfiniteScroll1 = () => {
    const { loadNextPage, isLastPage } = usePagination();
    const { loading } = useProducts();
    
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 
                && !isLastPage() ){ 
                loadNextPage();
            }
        };
        // console.log("triggerd");
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            
            {loading && (
                <div className="load-more-loader">
                    <img src="/blueLoader.svg" alt="Loading..." />
                </div>
            )}
        </>
                );
};

export default InfiniteScroll1;