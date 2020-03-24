import React from 'react';
import {
    List, ListItem, ListItemIcon, ListItemText, ListItemAvatar,
    Checkbox, Hidden, IconButton, Fab, Avatar, Tooltip
} from '@material-ui/core';

import { AddBox, IndeterminateCheckBox } from "@material-ui/icons";
import CommonStyle from "./CommonStyle";
import NewContact from "./NewContact";
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
    const classes = CommonStyle();
    const [selectAll, setSelectAll] = React.useState(false);


    React.useEffect(() => { setSelectAll(props.data.some(contact => contact.checked)); });
    return (
        <List style={{ flexGrow: 1 }} disablePadding={true}>
            <ListItem className="bg-silver" style={{ padding: "1px 12px" }}>
                <Tooltip title={selectAll ? "DeSelectAll" : "SelectAll"} arrow><span>
                    <IconButton edge="start" disabled={props.wannaCreateNew || props.data.length < 1}
                        onClick={() => { props.handleSelectAll(!selectAll); setSelectAll(!selectAll); }} >
                        {selectAll ? <IndeterminateCheckBox /> : <AddBox />}
                    </IconButton></span>
                </Tooltip>
                <ListItemText primary="Basic Info" className={classes.listHeaderItem} />
                <Hidden smDown> <ListItemText primary="Email" className={classes.listHeaderItem} /> </Hidden>
            </ListItem>
            {
                props.wannaCreateNew ?
                    <NewContact data={props.data} handleAdd={props.handleAdd} addNewContact={props.addNewContact} />
                    : <></>
            }
            {
                props.data.length ?
                    props.data.map((contact, index) =>
                        <React.Fragment key={index}>
                            <ListItem dense selected={props.activeContact.id === contact.id} disabled={props.wannaCreateNew}
                                button onClick={() => { props.handleContactClick(contact); }} key={index}
                                style={{ padding: "6px 16px" }}>
                                <ListItemIcon className={classes.Checkbox}>
                                    <Checkbox
                                        edge="start"
                                        // disableRipple
                                        color="primary"
                                        checked={contact.checked}
                                        onClick={(e) => { props.handleCheckedChange(contact); e.stopPropagation(); }}
                                    />
                                </ListItemIcon>
                                <ListItemAvatar>
                                    <Avatar src={contact.image} alt={contact.fullname} className={classes.large} style={{ background: stringToColor(contact.id + contact.fullname) }}>
                                        {contact.fullname.split(" ").map((n, i) => i < 2 ? n[0] : "")}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={<h3 style={{ minWidth: "17ch", maxWidth: "17ch", whiteSpace: "normal", lineHeight: "1", margin: "6px 0px 4px", fontSize: "120%" }}>{contact.fullname}</h3>}
                                    secondary={<Hidden mdUp>{contact.email ? <small style={{ fontWeight: "600" }}>{contact.email}</small> : <small>&nbsp;</small>}</Hidden>}
                                    className={classes.basicInfo}
                                />
                                <Hidden smDown>
                                    <ListItemText className={classes.basicInfo}
                                        primary={contact.email ?
                                            <h4 style={{ minWidth: "18ch", maxWidth: '18ch', overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                {contact.email}</h4> : <h4>&nbsp;</h4>} />
                                </Hidden>

                            </ListItem>

                            {(props.activeContact.id === contact.id) ?
                                <Hidden lgUp>
                                    <DetailCard contact={props.activeContact} editable={props.editable} setActive={props.setActive} handleEdit={props.handleEdit} handleUpdate={props.handleUpdate} />
                                </Hidden> : <></>
                            }

                        </React.Fragment>

                    )
                    : <h3 style={{ color: "red", fontWeight: "normal" }}>NO CONTACTS !</h3>
            }

        </List>
    )
}

export default ContactList
