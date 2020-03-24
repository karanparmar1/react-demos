import React from 'react'
import { ListItem, ListItemAvatar, ListItemText, Fab, InputAdornment, TextField, ListItemSecondaryAction } from "@material-ui/core";
import { DoneOutline, Close, AccountBox, Email } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles"


const NewContact = (props) => {
    const useStyles = makeStyles(theme => ({
        newListItem: {
            [theme.breakpoints.down("xs")]: {
                padding: 0,
            }
        },
        newContactField: {
            width: "46%",
            minWidth: "46%",
            margin: "10px 1.5%",
            [theme.breakpoints.down("sm")]: {
                minWidth: "96%",
            }
        },
    }));
    const classes = useStyles();

    const [newContactName, setNewContactName] = React.useState("");
    const [newContactEmail, setNewContactEmail] = React.useState("");
    const [emailError, setEmailError] = React.useState("");
    const [nameError, setNameError] = React.useState("");

    const handleOnChange = e => {
        let value = e.target.value;
        if (e.target.name === "fullname") {
            setNewContactName(value);
            if (value.trim().length) {
                if (value.length > 32) {
                    setNameError("max 32 chars")
                }
                else { setNameError(""); }
            }
            else {
                setNameError("name is required");
            }

        }
        if (e.target.name === "email") {
            value = value.trim();
            setNewContactEmail(value);
            if (value.length) {
                let found = props.data.find(obj => obj.email.toLowerCase() === value.toLowerCase()) || null;
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                    setEmailError("Invalid email address");
                }
                else if(value.length>100){
                    setEmailError("max 100 chars");
                }
                else if (found !== null) {
                    setEmailError("Email already exists");
                }
                else {
                    setEmailError("");
                }
            } else {
                setEmailError("");
            }
        }
    }

    const handleOnKeyDown = (e) => {
        if (e.keyCode === 13 && newContactName.trim().length && !nameError.length && !emailError.length) {
                saveContact();   
        }
    }

    const saveContact = () => {
        props.addNewContact({
            id: props.data.length ? props.data.reduce((max, next) => Math.max(max, next.id), props.data[0].id) + 1 : 0,
            fullname: newContactName,
            email: newContactEmail,
            checked: false
        });
        setNewContactName("");
        setNewContactEmail("");
    }

    return (
        <ListItem className={classes.newListItem}>
            <ListItemAvatar>
                <Fab color="primary" size="medium"
                    onClick={saveContact}
                    disabled={!newContactName.length > 0 || nameError.length > 0 || emailError.length > 0}
                >
                    <DoneOutline />
                </Fab>
            </ListItemAvatar>

            <ListItemText primary={
                <form align="center">
                    <TextField required autoFocus multiline
                        value={newContactName}
                        label=" FullName" name="fullname"
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <AccountBox /> </InputAdornment>
                            )
                        }}
                        error={nameError.length > 0}
                        helperText={nameError}
                        onChange={handleOnChange}
                        onKeyDown={handleOnKeyDown}
                        placeholder="Peter Parker"
                        className={classes.newContactField}
                    />
                    <TextField multiline value={newContactEmail}
                        placeholder="abc@xyz.com"
                        label="Email" name="email"
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Email /> </InputAdornment>
                            )
                        }}
                        error={emailError.length > 0}
                        helperText={emailError}
                        onChange={handleOnChange}
                        // onKeyDown={handleOnKeyDown}
                        className={classes.newContactField}
                    />
                </form>
            } />
            <ListItemAvatar style={{ textAlign: "right" }}>
                <Fab color="secondary" size="medium"
                    onClick={() => {
                        props.handleAdd(false); setNewContactName(""); setNewContactEmail(""); setNameError(""); setEmailError("");
                    }}>
                    <Close />
                </Fab>
            </ListItemAvatar>
        </ListItem>

    )
}

export default NewContact
