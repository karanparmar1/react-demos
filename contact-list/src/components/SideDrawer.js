import React from 'react';
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import {
    List, ListItem, ListItemIcon, ListItemText, IconButton, Drawer,
} from '@material-ui/core';

import { useTheme } from "@material-ui/core/styles";
import { Twitter, GitHub, PersonOutline, ClearAllRounded, ChevronLeft } from "@material-ui/icons";
import CommonStyle from "./CommonStyle";

const SideDrawer = (props) => {
    let open = props.open;
    const theme = useTheme();
    const classes = CommonStyle(theme);
    return (
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
        >
            <div className={classes.toolbar}>
                <IconButton onClick={props.handleDrawerClose}>
                    <ChevronLeft fontSize="large" />
                </IconButton>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={props.handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, classes.textWhite, {
                        [classes.hide]: open
                    })}
                >
                    <ClearAllRounded fontSize="large" />
                </IconButton>
            </div>

            <List className={classes.textWhite} style={{ marginTop: "40px" }}>

                <NavLink exact activeClassName={classes.active} className="link" to="/contact-app" >
                    <ListItem button>
                        <ListItemIcon className={classes.textWhite}>
                            <PersonOutline fontSize="large" />
                        </ListItemIcon>
                        <ListItemText primary="Local" />
                    </ListItem>
                </NavLink>

                <NavLink  activeClassName={classes.active} className="link" to="/contact-app/twitter">
                    <ListItem button >
                        <ListItemIcon className={classes.textWhite}>
                            <Twitter fontSize="large" />
                        </ListItemIcon>
                        <ListItemText primary="Twitter" />
                    </ListItem>
                </NavLink>

                <NavLink  activeClassName={classes.active} className="link" to="/contact-app/github">
                    <ListItem button>
                        <ListItemIcon className={classes.textWhite}>
                            <GitHub fontSize="large" />
                        </ListItemIcon>
                        <ListItemText primary="GitHub" />
                    </ListItem>
                </NavLink>
            </List>
        </Drawer>

    )
}

export default SideDrawer
