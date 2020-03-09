import React from 'react';
import { TextField, InputAdornment } from "@material-ui/core";
import { Search } from '@material-ui/icons';

const SearchBar = (props) => (

    <TextField id="outlined-search"
        label="Enter ItemName" type="search"
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <Search />
                </InputAdornment>
            ),
        }}
        variant="outlined"
        onChange={props.inputChanged} />


);

export default SearchBar;
