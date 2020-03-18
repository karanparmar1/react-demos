import React from 'react';
import clsx from "clsx";
import { Grid, InputBase, Button, IconButton, Hidden } from "@material-ui/core";
import { Add, Delete, Search } from "@material-ui/icons";
import { useTheme } from "@material-ui/core/styles";
import CommonStyle from "./CommonStyle";

const SearchBar = (props) => {
    const theme = useTheme();
    const classes = CommonStyle(theme);
    const [enableDelete,setEnableDelete]=React.useState(false);
    // const [deleteStatus,setDeleteStatus] = false;

    React.useEffect(()=>{
        // setDeleteStatus (props.data.some(item=>item.checked));
        setEnableDelete(props.data.some(item=>item.checked))
    });
    return (
        <Grid container item xs={12} lg={6} className={clsx(classes.removePadding)}>
            <Grid item xs={8}  lg>
                <div className={classes.searchbar}>
                    <InputBase
                        className={classes.input}
                        type="search"
                        value={props.search}
                        placeholder="Search Contacts"
                        onChange={props.onChange}
                        style={!props.data.length?{color:"red"}:{}}
                    />
                    <IconButton type="submit" aria-label="search">
                        <Search />
                    </IconButton>
                </div>
            </Grid>
            <Grid container justify="center" item xs={4} lg>
                <Grid item xs>
                    <Button
                        variant="contained"
                        className={clsx(classes.button, classes.bgGradient)}
                        size="large"
                        fullWidth
                    ><Add /><Hidden smDown> &nbsp;Add </Hidden></Button>
                </Grid>
                <Grid item xs>
                    <Button
                        variant="contained"
                        className={clsx(classes.button, classes.bgGradient)}
                        size="large"
                        fullWidth
                        onClick={props.handleDelete}
                        disabled={!enableDelete}
                        style={!enableDelete?{boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)"}:{}}
                    > <Delete /><Hidden smDown> &nbsp;Delete &nbsp; </Hidden></Button>
                </Grid>
            </Grid>
        </Grid >

    )
}

export default SearchBar
