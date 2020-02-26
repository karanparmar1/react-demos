import React from 'react';

const SearchBar = (props) =>
    (
        <input
            type="text"
            className="form-control form-control-lg"
            id="searchText"
            placeholder="Search For Image"
            onChange={props.onChange}
        />
    );


export default SearchBar;
