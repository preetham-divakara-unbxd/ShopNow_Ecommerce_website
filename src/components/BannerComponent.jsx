// This is a sample example. 
// Please go through the entire documentation for understanding different usecases and update as per your needs.
import { useBanner } from "@unbxd-ui/react-search-hooks";
 
const BannerComponent = () => {
    const { banners, onBannerClick } = useBanner();
    console.log("banners:", banners);
    return (
        <div className="banners-container">
            {banners.map((banner, index) => (
                <div key={index} className="banner-item" onClick={onBannerClick}>
                    {banner.imageUrl && (
                        <a href={banner.landingUrl} target="_blank" rel="noopener noreferrer">
                            <img className="banner-image" src={banner.imageUrl} alt="Banner" />
                        </a>
                    )}
                    {banner.bannerHtml && (
                        <div dangerouslySetInnerHTML={{ __html: banner.bannerHtml }} />
                    )}
                </div>
            ))}
        </div>
    );
};

export default BannerComponent;