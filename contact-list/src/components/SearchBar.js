import React from "react";
import { InputBase, IconButton, Tooltip } from "@material-ui/core";
import { Search } from "@material-ui/icons";

const SearchBar = (props) => {

    return (
        <Tooltip title="Search" arrow disableFocusListener >
            <div>
                <div className={props.classes.searchWrapper}  style={props.search .length ?{ boxShadow: "0px 1px 6px 0px rgba(0, 0, 0, 0.5)",background:"white" }:{}}>
                    <div className={props.classes.searchbar}>
                        <InputBase
                            className={props.classes.input}
                            type="search"
                            value={props.search.slice(0, 32)}
                            placeholder={`Search ${props.keyword}`}
                            onChange={props.onChange}
                            disabled={props.wannaCreateNew}
                            style={!props.data.length ? { color: "red" } : {}}
                        />
                        <IconButton type="submit" disabled aria-label="search">
                            <Search />
                        </IconButton>
                    </div>

                </div>
                {props.error.length > 0 ?
                    <span>
                        <small style={{ color: "red", position: "absolute", paddingLeft: "16px", paddingTop: "4px" }}>{props.error}</small>
                    </span>
                    : props.search.length > 0 ?
                        <small style={{ position: "absolute", paddingLeft: "20px", paddingTop: "4px" }}> Found: {props.data.length} record(s) </small>
                        : ""
                }
            </div>
        </Tooltip >
    );
}

export default SearchBar;