import React from 'react';
import clsx from "clsx";
import { Grid, Button, Hidden, Tooltip, Zoom } from "@material-ui/core";
import { Add, Delete } from "@material-ui/icons";
import { useTheme } from "@material-ui/core/styles";
import CommonStyle from "./CommonStyle";
import SearchBar from "./SearchBar";

const ActionBar = (props) => {
    const theme = useTheme();
    const { keyword, search, wannaCreateNew } = props;
    let someSelected = props.data.some(item => item.checked); //props.someSelected; 
    const classes = CommonStyle(theme);
    return (
        <Grid container item xs={12} lg={6} className={classes.actionbar}>
            <Grid item xs={8} lg={6} style={{ textAlign: "left", }} >
                <SearchBar classes={classes} search={search} error={props.error} data={props.data} onChange={props.onChange} setActive={props.setActive} filterData={props.filterData}
                    wannaCreateNew={wannaCreateNew} keyword={keyword} />
            </Grid>
            <Grid item xs={2} lg={3}>
                <Tooltip title={wannaCreateNew ? "Adding..." : `Add ${keyword}`} arrow TransitionComponent={Zoom}>
                    <span className={clsx(classes.btn, { [classes.btnAdding]: wannaCreateNew })}>
                        <Button
                            variant="contained"
                            className={clsx(classes.button, classes.btnAdd)}
                            size="large"
                            fullWidth
                            disabled={wannaCreateNew}
                            onClick={() => props.handleAdd(true)} >
                            <Add /> <Hidden smDown>Add{wannaCreateNew && "ing"}</Hidden>

                        </Button> </span>
                </Tooltip>
            </Grid>
            <Grid item xs={2} lg={3}>
                <Tooltip title={someSelected ? `Delete ${keyword}` : `Select ${keyword} to Delete`} arrow TransitionComponent={Zoom}>
                    <span className={clsx(classes.btn, { [classes.cursorDisabled]: !someSelected })}>
                        <Button
                            variant="contained"
                            // style={{paddingRight:"16px"}}
                            className={clsx(classes.button, classes.btnDelete)}
                            size="large"
                            fullWidth
                            onClick={props.handleDelete}
                            disabled={!someSelected || wannaCreateNew}
                        > <Delete /> <Hidden smDown>Delete&nbsp;</Hidden>
                        </Button>
                    </span>
                </Tooltip>
            </Grid>
        </Grid >

    )
}

export default ActionBar;
