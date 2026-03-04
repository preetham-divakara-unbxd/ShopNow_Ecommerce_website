

import { useState, useEffect, useMemo,useCallback } from 'react';

const Counter = () => {


    const [count, setCount] = useState(0);
    const isLastPage = count === 10 ? true : false;
    // const handleIncrement = () => {
    //     if (!isLastPage) {
    //         setCount(count + 1);
    //     }
    // }
    const handleIncrement = useCallback(() => {
    if (!isLastPage) {
        setCount(c => c + 1);
    }
}, [isLastPage]);

    useEffect(() => {
        //console.log('Count updated:', count);
    }, [handleIncrement]);

    const squared = useMemo(() => {
        //console.log("Calculating...");
        return count * count;
    }, [count]);

    return (
        <div className="counter">


            <button onClick={handleIncrement} disabled={isLastPage}>Increment</button>

            <h2>Count: {count}</h2>
        </div>
    );
}

export default Counter;