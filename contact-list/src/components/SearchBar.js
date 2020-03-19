import React from 'react';
import clsx from "clsx";
import { Grid, InputBase, Button, IconButton, Hidden } from "@material-ui/core";
import { Add, Delete, Search } from "@material-ui/icons";
import { useTheme } from "@material-ui/core/styles";
import CommonStyle from "./CommonStyle";

const SearchBar = (props) => {
    const theme = useTheme();
    const classes = CommonStyle(theme);

    return (
        <Grid container item xs={12} lg={6} className={clsx(classes.removePadding)}>
            <Grid item xs={8} lg>
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
                    <IconButton type="submit" aria-label="search">
                        <Search />
                    </IconButton>
                </div>
            </Grid>
            <Grid container justify="center" item xs={4} lg>
                <Grid item xs={6}>
                    <Button
                        variant="contained"
                        className={clsx(classes.button, classes.bgGradient)}
                        size="large"
                        fullWidth
                        disabled={props.wannaCreateNew}
                        onClick={() => props.handleAdd(true)}
                    ><Add /><Hidden smDown> &nbsp;Add </Hidden></Button>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        variant="contained"
                        className={clsx(classes.button, classes.bgGradient)}
                        size="large"
                        fullWidth
                        onClick={props.handleDelete}
                        disabled={!props.data.some(item => item.checked) || props.wannaCreateNew}
                    > <Delete /><Hidden smDown> &nbsp;Delete &nbsp; </Hidden></Button>
                </Grid>
            </Grid>
        </Grid >

    )
}

export default SearchBar
