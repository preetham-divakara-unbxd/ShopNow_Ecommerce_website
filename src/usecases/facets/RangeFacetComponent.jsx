// This is a sample example. 
// Please go through the entire documentation for understanding different usecases and update as per your needs.
import { useFacets } from '@unbxd-ui/react-search-hooks';
import { useState,useEffect } from 'react';

const RangeFacetComponent = ({ facetName, facet, fireImmediate = false }) => {
    const { stats, selectedFacets, addFacet, removeFacet } = useFacets();
    const [minValue, setMinValue] = useState('');
    const [maxValue, setMaxValue] = useState('');

    console.log("facetStats", stats);
    // console.log("facet", facet);
    // console.log("facetName", facetName);
 

    const facetStats = stats?.[facetName] || { min: facet?.start || 0, max: facet?.end || 1000 };
    console.log("facetStats", facetStats);

    const selectedRange = selectedFacets?.[facetName]?.values?.[0];

    console.log("selectedRange", selectedRange);

     const [minSlider, setMinSlider] = useState(facetStats.min);
     const [maxSlider, setMaxSlider] = useState(facetStats.max);

    useEffect(() => {
        setMinSlider(facetStats.min);
        setMaxSlider(facetStats.max);
    }, [facetStats.min, facetStats.max]);

    const applyPriceRange = () => {
        const min = parseFloat(minValue) || facetStats.min;
        const max = parseFloat(maxValue) || facetStats.max;

        const rangeValue = {
            start: min.toString(),
            end: max.toString(),
            dataId: `${min}-${max}`,
            count: 0
        };

        addFacet(facetName, [rangeValue]);
    };

    const clearPriceRange = () => {
        removeFacet(facetName, selectedRange);

          setMinSlider(facetStats.min);
          setMaxSlider(facetStats.max);
          setMinValue('');
          setMaxValue('');
    };


        const handleMinSliderChange = (e) => {
            const value = parseFloat(e.target.value);
            setMinSlider(value);
            setMinValue(value.toString());
            
            if (value > maxSlider) {
                setMaxSlider(value);
                setMaxValue(value.toString());
            }
        };
    

        const handleMaxSliderChange = (e) => {
            const value = parseFloat(e.target.value);
            setMaxSlider(value);
            setMaxValue(value.toString());

            if (value < minSlider) {
                setMinSlider(value);
                setMinValue(value.toString());
            }
        };

    return (
        <div className="price-range-facet">

            <div className="range-slider-container">
                <div className="range-slider-wrapper">
                    <input
                        type="range"
                        min={facetStats.min}
                        max={facetStats.max}
                        step="10"
                        value={minSlider}
                        onChange={handleMinSliderChange}
                        onMouseUp={fireImmediate ? applyPriceRange : null}
                        className="range-slider range-slider-min"
                    />
                    <input
                        type="range"
                        min={facetStats.min}
                        max={facetStats.max}
                        step="10"
                        value={maxSlider}
                        onChange={handleMaxSliderChange}
                        onMouseUp={fireImmediate ? applyPriceRange : null}
                        className="range-slider range-slider-max"
                    />
                </div>
                {/* <div className="range-slider-values">
                    <span>${minSlider}</span>
                    <span>${maxSlider}</span>
                </div> */}
            </div>
            
            <div className="price-range-facet-input">
                <input
                    type="number"
                    placeholder={`Min (${facetStats.min})`}
                    value={minValue}
                    onChange={(e) => setMinValue(e.target.value)}
                />
                <input
                    type="number"
                    placeholder={`Max (${facetStats.max})`}
                    value={maxValue}
                    onChange={(e) => setMaxValue(e.target.value)}
                />
            </div>
            <div className="price-range-facet-buttons">
                <button onClick={applyPriceRange}>Apply</button>
                {selectedRange && (
                    <button onClick={clearPriceRange}>Clear</button>
                )}
            </div>



        </div>
    );
};

export default RangeFacetComponent;