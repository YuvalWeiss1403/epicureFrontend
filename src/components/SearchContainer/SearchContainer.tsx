import React from 'react';
import "./SearchContainer.css";


const SearchContainer:React.FC=()=>{
    return (
        <div className='hero'>
            <div className='search-div'>
                <div className='hero-heading'>Epicure works with the top chef restaurants in Tel Aviv</div>
                <div className="search-input-container">
                <button className='search-hero'></button>
                <input className='input-search' placeholder='Search for restaurant cuisine, chef'></input>
                </div>
            </div>
        </div>
    )
}

export default SearchContainer;