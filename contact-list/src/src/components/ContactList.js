import React from 'react';
import {
    List, ListItem, ListItemIcon, ListItemText, ListItemAvatar,
    Avatar, Checkbox, IconButton,
} from '@material-ui/core';

import { AddBox } from "@material-ui/icons";
import { useTheme } from "@material-ui/core/styles";
import CommonStyle from "./CommonStyle";


const ContactList = (props) => {
    const theme = useTheme();
    const classes = CommonStyle(theme);
    return (
        <List style={{ flexGrow: 1 }} disablePadding={true}>
            <ListItem dense className="bg-silver" >
                <IconButton edge="start">
                    <AddBox />
                </IconButton>
                <ListItemText primary="Basic Info" />
                <ListItemText primary="Company" style={{ display: 'flex', justifyContent: "center" }} />
            </ListItem>

            <ListItem dense button onClick={() => props.handleContactClick(5)} >
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        disableRipple
                        color="primary"
                    />
                </ListItemIcon>
                <ListItemAvatar>
                    <Avatar src="broken.png" alt="karan parmar" className={classes.large}>
                        KP
            </Avatar>
                </ListItemAvatar>
                <ListItemText primary={<h2 style={{ lineHeight: "1", margin: "12px auto" }} >Karan Parmar</h2>} secondary="k123parmar@gmail.com" />
                <ListItemText primary={<h4 style={{ display: 'flex', justifyContent: "center" }}>ZURU TECH pvt ltd</h4>} />
            </ListItem>

        </List>
    )
}

export default ContactList
