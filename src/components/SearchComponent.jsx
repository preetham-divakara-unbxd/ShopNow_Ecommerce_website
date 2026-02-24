import { useQuery, useAutosuggest } from "@unbxd-ui/react-search-hooks";
import { useState } from 'react';

const SearchComponent = ({ autosuggest }) => {
    const { query, setQuery } = useQuery({
        delay: 0,
        forceReload: false
    });
    const [inputValue, setInputValue] = useState(query === '*' ? '' : query);

    const { AutosuggestComponent } = autosuggest;
    const autosuggestHookData = autosuggest ? useAutosuggest(autosuggest) : null;
    const { autosuggestQuery, setAutosuggestQuery } = useAutosuggest(autosuggest);


    console.log("Hook returns:", autosuggestHookData);
    console.log("Config has:", autosuggest);
    // console.log("AutosuggestComponent:", AutosuggestComponent);
    console.log("useAutosuggest:", useAutosuggest);


    // const handleInputChange = (event) => {
    //     setQuery(event.target.value);
    // };
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        if (autosuggest) {
            setAutosuggestQuery(event.target.value);
        }
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        // if (query && query !== '*') {
        //     setQuery(query); 
        // }
        const searchQuery = inputValue.trim();
        if (searchQuery) {
            setQuery(searchQuery);
            if (autosuggest) {
                setAutosuggestQuery('');
            }
        }
    };

    const handleClear = () => {
        setInputValue('');
        setQuery('');
        if (autosuggest) {
            setAutosuggestQuery('');
        }
    };


    // const displayValue = query === '*' ? '' : query;

    return (
        <div className="searchbox-wrapper">
            <form className="searchbox-root" onSubmit={handleSubmit}>
                <input
                    className="searchbox-input"
                    type="text"
                    // value={displayValue}
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSubmit(e);
                        }
                    }}
                    placeholder="Search for products..."
                />

                {inputValue && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="search-clear-btn"

                    >
                        ✕
                    </button>
                )}

                <button
                    type="submit"
                    className="searchbox-btn"
                >
                    Search
                </button>


            </form>
            {/* ✅ Autosuggest outside form */}
            {autosuggest && AutosuggestComponent && autosuggestHookData && (
                <AutosuggestComponent
                    autosuggest={autosuggest}
                    response={autosuggestHookData}
                    hideAutosuggest={() => setAutosuggestQuery('')}
                    setQuery={setQuery}
                />
            )}
        </div>

    );
};

export default SearchComponent;