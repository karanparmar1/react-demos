import React from 'react';
import clsx from "clsx";
import { Grid, InputBase, Button, IconButton, Hidden } from "@material-ui/core";
import { Add, Search } from "@material-ui/icons";
import { useTheme } from "@material-ui/core/styles";
import CommonStyle from "./CommonStyle";

const SearchBar = (props) => {
    const theme = useTheme();
    const classes = CommonStyle(theme);
    return (
        <Grid container item xs={12} md={6} spacing={1} style={{ marginBottom: "20px" }}>
            <Grid item xs={10} sm={11} md={9} >
                <div className={classes.searchbar}>
                    <InputBase
                        className={classes.input}
                        type="search"
                        placeholder="Search Contacts"
                        onChange={props.onChange}
                    />
                    <IconButton type="submit" className={classes.iconButton} aria-label="search">
                        <Search />
                    </IconButton>
                </div>
            </Grid>
            <Grid item xs={1} md={3}>
                <Button
                    variant="contained"
                    className={clsx(classes.button, classes.bgGradient)}
                    size="large"
                    fullWidth
                ><Add /><Hidden smDown> &nbsp;Add Contact</Hidden></Button>
            </Grid>
        </Grid>

    )
}

export default SearchBar
