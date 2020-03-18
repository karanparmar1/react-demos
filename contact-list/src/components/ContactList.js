import React from 'react';
import {
    List, ListItem, ListItemIcon, ListItemText, ListItemAvatar,
    Avatar, Checkbox, IconButton, Hidden
} from '@material-ui/core';

import { AddBox, IndeterminateCheckBox } from "@material-ui/icons";
import { useTheme } from "@material-ui/core/styles";
import CommonStyle from "./CommonStyle";
import DetailCard from "./DetailCard"

function stringToColor(string) {
    let hash = 0, i = 0, color = "#";
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.substr(-2);
    }
    return color;
}
const ContactList = (props) => {
    const theme = useTheme();
    const classes = CommonStyle(theme);
    let [selectedContact, setSelectedContact] = React.useState({});
    const [selectAll, setSelectAll] = React.useState(false);
    const [checkedChanged, setCheckedChanged] = React.useState(false);

    React.useEffect(() => { setSelectAll(props.data.every(contact => contact.checked)); });
    return (
        <List style={{ flexGrow: 1 }} disablePadding={true}>
            <ListItem className="bg-silver" >
                <IconButton edge="start" onClick={() => { props.handleSelectAll(!selectAll); setSelectAll(!selectAll); }}>
                    {selectAll ? <IndeterminateCheckBox /> : <AddBox />}
                </IconButton>
                <ListItemText primary="Basic Info" />
                <ListItemText primary="Company" style={{ display: 'flex', justifyContent: "center" }} />
            </ListItem>

            {
                props.data.length?props.data.map((contact, index) =>
                    <React.Fragment key={index}>
                        <ListItem selected={props.activeContact.id === contact.id} onClick={() => { setSelectedContact(contact); props.handleContactClick(contact); }} dense button key={index}>
                            <ListItemIcon >
                                <Checkbox
                                    edge="start"
                                    disableRipple
                                    color="primary"
                                    checked={contact.checked}
                                    onClick={(e) => {  props.handleCheckedChange(contact); e.stopPropagation(); }}
                                />
                            </ListItemIcon>
                            <ListItemAvatar>
                                <Avatar src={contact.image} alt={contact.fullname} className={classes.large} style={{ background: stringToColor(contact.fullname) }}>
                                    {contact.fullname.split(" ").map(n => n[0])}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={<h3 style={{ lineHeight: "1", margin: "12px auto" }} >{contact.fullname}</h3>} secondary={contact.email} />
                            <ListItemText primary={<h4 style={{ lineHeight: "1", display: 'flex', justifyContent: "center" }}>{contact.company}</h4>} />

                        </ListItem>

                        {(selectedContact.id === contact.id) ?
                            <Hidden mdUp>
                                <DetailCard contact={props.activeContact} editable={props.editable} handleEdit={props.handleEdit} handleSave={props.handleSave} />
                            </Hidden> : <></>
                        }

                    </React.Fragment>
                    
                )
                :<h3 style={{color:"red"}}>NO CONTACTS FOUND !</h3>
            }

        </List>
    )
}

export default ContactList
