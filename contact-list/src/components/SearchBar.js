import React from 'react';
import clsx from "clsx";
import { Grid, InputBase, Button, IconButton, Hidden, Tooltip, Zoom } from "@material-ui/core";
import { Add, Delete, Search } from "@material-ui/icons";
import { useTheme } from "@material-ui/core/styles";
import CommonStyle from "./CommonStyle";

const SearchBar = (props) => {
    const theme = useTheme();
    const classes = CommonStyle(theme);

    return (
        <Grid container item xs={12} lg={6} style={{ textAlign: "right" }} className={clsx(classes.removePadding)}>
            <Grid item xs={8} lg={6} style={{ textAlign: "left" }} >
                <Tooltip title="Search" arrow>
                    <div className={classes.searchbar}>
                        <InputBase
                            className={classes.input}
                            type="search"
                            value={props.search}
                            placeholder="Search Contacts"
                            onChange={props.onChange}
                            disabled={props.wannaCreateNew}
                            style={!props.data.length ? { color: "red" } : {}}
                        />
                        <IconButton type="submit" disabled aria-label="search">
                            <Search />
                        </IconButton>
                    </div>
                </Tooltip>
            </Grid>
            <Grid item xs={2} lg={3} >
                <Tooltip title="Add Contact" arrow TransitionComponent={Zoom}><span>
                    <Button
                        variant="contained"
                        className={clsx(classes.button, classes.bgGradient, classes.btnAdd)}
                        size="large"
                        fullWidth
                        disabled={props.wannaCreateNew}
                        onClick={() => props.handleAdd(true)} >
                        <Add /><Hidden smDown> &nbsp;Add </Hidden>
                    </Button> </span>
                </Tooltip>
            </Grid>
            <Grid item xs={2} lg={3}>
                <Tooltip title="Delete Selected" arrow TransitionComponent={Zoom}>
                    <div className={classes.btn}><Button
                        variant="contained"
                        // style={{paddingRight:"16px"}}
                        className={clsx(classes.button, classes.bgGradient, classes.btnDelete)}
                        size="large"
                        fullWidth
                        onClick={props.handleDelete}
                        disabled={!props.data.some(item => item.checked) || props.wannaCreateNew}
                    > <Delete /><Hidden smDown> &nbsp;Delete &nbsp; </Hidden>
                    </Button>
                    </div>
                </Tooltip>
            </Grid>
        </Grid >

    )
}

export default SearchBar
