import React from 'react';
import 'font-awesome/css/font-awesome.min.css';

const SearchBar = (props) =>
    (
        <React.Fragment>
           
            <input
                type="text"
                className="form-control form-control-lg rounded-0"
                id="searchText"
                placeholder="Search For Image"
                onChange={props.onChange}
                style={{color:'blue'}}
            />
          
        </React.Fragment>
    );


export default SearchBar;
