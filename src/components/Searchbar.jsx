import React, { useState } from "react";
import '../styles/Searchbar.css';
const Searchbar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };
    const handleSearch = () => {
        if (onSearch) {
            onSearch(query);
        }
    };
    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search..."
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};
export default Searchbar;