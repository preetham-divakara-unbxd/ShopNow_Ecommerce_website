import { useState } from 'react';
import { useSorting } from "@unbxd-ui/react-search-hooks";
import Facets14 from './Facets14';

const Facets15 = ({ onClose }) => {
    

    return (
        <div className="facets15-wrapper">
            <div className="facets15-header">
                {onClose && (
                    <button className="facets15-close" onClick={onClose}>&times;</button>
                )}
            </div>
            <div className="facets15-facets">
                
                <Facets14 />
            </div>
        </div>
    );
};

export default Facets15;