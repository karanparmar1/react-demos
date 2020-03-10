import React from 'react';
import { TextField, InputAdornment } from "@material-ui/core";
import { Search } from '@material-ui/icons';

const SearchBar = (props) => (

    <TextField id="outlined-search"
        label="Enter Task" type="search"
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <Search />
                </InputAdornment>
            ),
        }}
        variant="outlined"
        onChange={props.inputChanged}
        onKeyDown={props.handleKeyDown}
        value={props.value} />
);

export default SearchBar;
