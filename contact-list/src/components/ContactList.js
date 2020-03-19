import React from 'react';
import {
    List, ListItem, ListItemIcon, ListItemText, ListItemAvatar, ListItemSecondaryAction,
    Checkbox, TextField, InputAdornment, Hidden, IconButton, Fab, Avatar,
} from '@material-ui/core';

import { AddBox, IndeterminateCheckBox, Person, DoneOutline, Close, Email } from "@material-ui/icons";
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
    const [newContactEmail, setNewContactEmail] = React.useState("");
    const [emailError, setEmailError] = React.useState("");
    const handleOnChange = e => {
        let value = e.target.value;
        if (e.target.name === "fullname") {
            setNewContactName(value.length <= 32 ? value : newContactName);
        }
        if (e.target.name === "email") {
            setNewContactEmail(value.trim());
            if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                setEmailError("Invalid email address");
            }
            else {
                setEmailError("");
            }
        }
    }
    const saveContact = (e) => {
        if (e.keyCode === 13 && newContactName.trim().length) {
            props.addNewContact({
                id: props.data.length ? props.data.reduce((max, next) => Math.max(max, next.id), props.data[0].id) + 1 : 0,
                fullname: newContactName,
                email: newContactEmail,
                checked: false
            });
            setNewContactName("");
            setNewContactEmail("");
        }
    }
    React.useEffect(() => { setSelectAll(props.data.every(contact => contact.checked)); });
    return (
        <List style={{ flexGrow: 1 }} disablePadding={true}>
            <ListItem className="bg-silver" style={{ padding: "1px 12px" }}>
                <IconButton edge="start" disabled={props.wannaCreateNew} onClick={() => { props.handleSelectAll(!selectAll); setSelectAll(!selectAll); }}>
                    {selectAll ? <IndeterminateCheckBox /> : <AddBox />}
                </IconButton>
                <ListItemText primary="Basic Info" style={{ marginLeft: "32px" }} />
                <Hidden smDown> <ListItemText primary="Email" style={{ display: 'flex', justifyContent: "center" }} /> </Hidden>
            </ListItem>
            {
                props.wannaCreateNew ?
                    <ListItem>
                        <ListItemAvatar>
                            <Fab color="primary" size="medium"
                                onClick={() => {
                                    props.addNewContact({
                                        id: props.data.length ? props.data.reduce((max, next) => Math.max(max, next.id), props.data[0].id) + 1 : 0,
                                        fullname: newContactName,
                                        email: newContactEmail,
                                        checked: false
                                    });
                                    setNewContactName("");
                                    setNewContactEmail("");
                                }}
                                disabled={!newContactName.trim().length > 0 || emailError.length > 0}
                            >
                                <DoneOutline />
                            </Fab>
                        </ListItemAvatar>

                        <ListItemText primary={
                            <form>
                                <TextField required autoFocus multiline
                                    value={newContactName}
                                    label="Full Name" name="fullname"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Person />
                                            </InputAdornment>
                                        )
                                    }}
                                    onChange={handleOnChange}
                                    onKeyDown={saveContact}
                                    placeholder="Peter Parker"
                                    className={classes.newContactField}
                                />
                                <TextField multiline value={newContactEmail}

                                    placeholder="person@mail.com"
                                    label="Email" type="email" name="email"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Email />
                                            </InputAdornment>
                                        )
                                    }}
                                    error={emailError.length > 0}
                                    helperText={emailError}
                                    onChange={handleOnChange}
                                    className={classes.newContactField}
                                />
                            </form>
                        } style={{ margin: "10px 5px" }} />
                        <ListItemSecondaryAction>
                            <Fab color="secondary" size="medium" onClick={() => {
                                props.handleAdd(false); setNewContactName(""); setNewContactEmail(""); setEmailError("");
                            }}><Close /></Fab>
                        </ListItemSecondaryAction>
                    </ListItem>
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
                                    primary={<h3 style={{ lineHeight: "1", margin: "6px 0px 4px", maxWidth: "10em", overflowWrap: "anywhere", }}>{contact.fullname}</h3>}
                                    secondary={<Hidden mdUp>{contact.email ? <small style={{ fontWeight: "600" }}>{contact.email}</small> : <small>&nbsp;</small>}</Hidden>}
                                    className={classes.basicInfo}
                                />
                                <Hidden smDown><ListItemText primary={contact.email ? <h4>{contact.email}</h4> : <h4>&nbsp;</h4>} /> </Hidden>

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
