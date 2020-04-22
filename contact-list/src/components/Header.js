import React from 'react';
import { useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import CommonStyle from "./CommonStyle";
import Heading from "./Heading";
import { IconButton, AppBar, Toolbar } from "@material-ui/core";
import { ClearAllRounded } from "@material-ui/icons";

const Header = ({ heading, open, handleDrawerOpen }) => {
    const theme = useTheme();
    const classes = CommonStyle(theme);
    return (
        <AppBar className={clsx(classes.appBar, { [classes.appBarShift]: open })}>
            <Toolbar>
                <IconButton onClick={handleDrawerOpen} edge="start"
                    className={clsx({ [classes.invisible]: open, })} >
                    <ClearAllRounded fontSize="large" />
                </IconButton>
                <Heading heading={heading} headerStyle={classes.heading} />
            </Toolbar>
        </AppBar>
    );
};

export default Header;
