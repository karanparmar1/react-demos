import React from 'react';
import {
    List, ListItem, ListItemIcon, ListItemText, ListItemAvatar, ListItemSecondaryAction,
    Checkbox, TextField, InputAdornment, Hidden, IconButton, Fab, Avatar,
} from '@material-ui/core';

import { AddBox, IndeterminateCheckBox, AccountCircle, DoneOutline, Close } from "@material-ui/icons";
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
    const [selectAll, setSelectAll] = React.useState(false);
    const [newContactName, setNewContactName] = React.useState("");
    const handleOnChange = (e) => { setNewContactName(e.target.value); }
    const saveContact = (e) => {
        if (e.keyCode === 13 && newContactName.trim().length) {
            props.addNewContact({
                id: props.data.length ? props.data.reduce((max, next) => Math.max(max, next.id), props.data[0].id) + 1 : 0,
                fullname: newContactName,
                checked: false
            });
            setNewContactName("");
        }
    }
    React.useEffect(() => { setSelectAll(props.data.every(contact => contact.checked)); });
    return (
        <List style={{ flexGrow: 1 }} disablePadding={true}>
            <ListItem className="bg-silver">
                <IconButton edge="start" disabled={props.wannaCreateNew} onClick={() => { props.handleSelectAll(!selectAll); setSelectAll(!selectAll); }}>
                    {selectAll ? <IndeterminateCheckBox /> : <AddBox />}
                </IconButton>
                <ListItemText primary="Basic Info" style={{ marginLeft: "32px" }} />
                <Hidden smDown> <ListItemText primary="Email" style={{ display: 'flex', justifyContent: "flex-start" }} /> </Hidden>
            </ListItem>
            {
                props.wannaCreateNew ?
                    <form onSubmit={saveContact}>
                        <ListItem>
                            <ListItemAvatar>
                                <Fab type="submit" color="primary" size="medium"
                                    onClick={() => {
                                        props.addNewContact({
                                            id: props.data.length ? props.data.reduce((max, next) => Math.max(max, next.id), props.data[0].id) + 1 : 0,
                                            fullname: newContactName,
                                            checked: false
                                        });
                                        setNewContactName("");
                                    }}
                                    disabled={!newContactName.trim().length}
                                >
                                    <DoneOutline />
                                </Fab>
                            </ListItemAvatar>

                            <ListItemText primary={
                                <TextField required value={newContactName} label="Full Name"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircle />
                                            </InputAdornment>
                                        )
                                    }}
                                    helperText="max 20 chars"
                                    // onChange={handleOnChange}
                                    onKeyDown={saveContact}
                                    placeholder="Peter Parker"
                                    autoFocus required
                                    name="fullname" ref="fullname"
                                />
                            } style={{ margin: "10px 20px" }} />
                            <ListItemSecondaryAction>
                                <Fab color="secondary" size="medium" onClick={() => props.handleAdd(false)}><Close /></Fab>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </form>
                    : <></>
            }
            {
                props.data.length ?
                    props.data.map((contact, index) =>
                        <React.Fragment key={index}>
                            <ListItem selected={props.activeContact.id === contact.id} disabled={props.wannaCreateNew}
                                onClick={() => { props.handleContactClick(contact); }} dense button key={index}>
                                <ListItemIcon className={classes.Checkbox}>
                                    <Checkbox
                                        edge="start"
                                        disableRipple
                                        color="primary"
                                        checked={contact.checked}
                                        onClick={(e) => { props.handleCheckedChange(contact); e.stopPropagation(); }}
                                    />
                                </ListItemIcon>
                                <ListItemAvatar>
                                    <Avatar src={contact.image} alt={contact.fullname} className={classes.large} style={{ background: stringToColor(contact.fullname) }}>
                                        {contact.fullname.split(" ").map((n, i) => i < 2 ? n[0] : "")}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={<h3 style={{ lineHeight: "1", margin: "6px 0px", maxWidth: "10em", overflowWrap: "anywhere", }}>{contact.fullname}</h3>}
                                    secondary={<Hidden mdUp>{contact.email ? <small style={{ fontWeight: "600" }}>{contact.email}</small> : <small>&nbsp;</small>}</Hidden>}
                                    className={classes.basicInfo}
                                />
                                <Hidden smDown><ListItemText primary={<h4>{contact.email}</h4>} /> </Hidden>

                            </ListItem>

                            {(props.activeContact.id === contact.id) ?
                                <Hidden lgUp>
                                    <DetailCard contact={props.activeContact} editable={props.editable} handleEdit={props.handleEdit} handleSave={props.handleSave} />
                                </Hidden> : <></>
                            }

                        </React.Fragment>

                    )
                    : <h3 style={{ color: "red" }}>NO CONTACTS FOUND !</h3>
            }

        </List>
    )
}

export default ContactList
