import React from 'react';
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { List, ListItem, ListItemIcon, ListItemText, IconButton, Drawer, Tooltip } from '@material-ui/core';
import { Backdrop, Hidden } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { Work, BugReport, PersonOutline, ClearAllRounded, ChevronLeft } from "@material-ui/icons";
import CommonStyle from "./CommonStyle";

const SideDrawer = (props) => {
    const { open } = props;
    const theme = useTheme();
    const classes = CommonStyle(theme);
    return (
        <React.Fragment>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open
                })}
                classes={{
                    paper: clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open
                    })
                }}
            // style={{overflow:"hidden"}}
            >
                <div className={classes.toolbar} >
                    {open ? <IconButton onClick={props.handleDrawerClose} className={classes.hoverEffect} >
                        <ChevronLeft fontSize="large" />
                    </IconButton>
                        : <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={props.handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, classes.textWhite, classes.hoverEffect, {
                                [classes.hide]: open
                            })}
                        >
                            <ClearAllRounded fontSize="large" />
                        </IconButton>}
                </div>

                <List className={classes.textWhite} style={{ marginTop: "40px" }}>

                    <NavLink exact activeClassName={classes.active} className="link" to={"/contact-app"} >
                        <ListItem button className={classes.hoverEffect}>
                            <Tooltip title={!open ? "Local" : ""} placement="right" arrow>
                                <ListItemIcon className={classes.textWhite}>
                                    <PersonOutline fontSize="large" />
                                </ListItemIcon>
                            </Tooltip>

                            <ListItemText primary="Local" />
                        </ListItem>
                    </NavLink>

                    <NavLink activeClassName={classes.active} className="link" to="/contact-app/covid19">
                        <ListItem button className={classes.hoverEffect}>
                            <Tooltip title={!open ? "Covid19" : ""} placement="right" arrow>
                                <ListItemIcon className={classes.textWhite}>
                                    <BugReport fontSize="large" />
                                </ListItemIcon>
                            </Tooltip>
                            <ListItemText primary="Covid19" />
                        </ListItem>
                    </NavLink>

                    <NavLink exact activeClassName={classes.active} className="link" to="/contact-app/jobs">
                        <ListItem button className={classes.hoverEffect}>
                            <Tooltip title={!open ? "Jobs" : ""} placement="right" arrow>
                                <ListItemIcon className={classes.textWhite}>
                                    <Work fontSize="large" />
                                </ListItemIcon>
                            </Tooltip>
                            <ListItemText primary="Jobs" />
                        </ListItem>
                    </NavLink>

                </List>
            </Drawer>
            <Hidden mdUp>
                <Backdrop className={classes.backdrop} open={open} onClick={props.handleDrawerClose} />
            </Hidden>
        </React.Fragment>
    )
}

export default SideDrawer;
