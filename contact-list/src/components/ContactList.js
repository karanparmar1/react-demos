import React from 'react';
import {
    List, ListItem, ListItemIcon, ListItemText, ListItemAvatar,
    Avatar, Checkbox, IconButton, Hidden
} from '@material-ui/core';

import { AddBox, ShowChartRounded } from "@material-ui/icons";
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
    const [selectedContacts, setSelectedContacts] = React.useState([]);

    const handleCardClose = () => {
        setSelectedContact({});
        alert("HI");
    }
    const handleSelectAll = (contacts) => {
        if (selectAll) {
            contacts.map(contact => {
                setSelectedContacts([]);
                setSelectedContacts([...selectedContacts, contact.id]);
            })

        }
        else {
            setSelectedContacts([]);
        }
        setSelectAll(!selectAll);
    };


    const handleCheckedChange = (id) => {
        if (selectedContacts.includes(id)) {
            setSelectedContacts(selectedContacts.filter(item => item !== id));
            console.log("was in")
        }
        else {
            setSelectedContacts([...selectedContacts, id]);
            console.log("addedNow")
        }
        console.log(selectedContacts)
    }

    return (
        <List style={{ flexGrow: 1 }} disablePadding={true}>
            <ListItem className="bg-silver" >
                <IconButton edge="start" onClick={() => handleSelectAll(props.data)}>
                    <AddBox />
                </IconButton>
                <ListItemText primary="Basic Info" />
                <ListItemText primary="Company" style={{ display: 'flex', justifyContent: "center" }} />
            </ListItem>

            {
                props.data.map((contact, index) =>
                    <React.Fragment key={index}>
                        <ListItem dense button onClick={() => { setSelectedContact(contact); props.handleContactClick(contact) }} key={index}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    disableRipple
                                    color="primary"
                                    checked={selectAll || selectedContacts.includes(contact.id)}
                                    onChange={() => handleCheckedChange(contact.id)}

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
                                <DetailCard contact={contact} className={classes.hide} handleContactClick={handleCardClose} />
                            </Hidden> : <></>}
                    </React.Fragment>
                )

            }

        </List>
    )
}

export default ContactList
