import React from 'react'
import clsx from 'clsx';
import { ListItem, ListItemAvatar, ListItemText, Fab, InputAdornment, TextField, Tooltip } from "@material-ui/core";
import { DoneOutline, Close, AccountBox, Email } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles"
import { v4 as uuidv4 } from "uuid";

const NewContact = (props) => {
    let { titleField, uniqueField } = props;
    console.log("New Contact Rendered.");
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
    let timeoutId = newContactName;
    const handleOnChange = e => {
        let value = e.target.value;
        if (e.target.name === titleField.fieldname) {
            let { max, min, label } = titleField;
            if (value.trim().length) {
                if (value.length > max) {
                    if (timeoutId) clearTimeout(timeoutId);
                    timeoutId = setTimeout(() => {
                        setNameError("");
                    }, 1500);
                    setNameError("You can enter max" + max + " chars");
                }
                else if (value.length < min) {
                    setNameError("Enter atleast " + min + " chars");
                    setNewContactName(value);
                }
                else {
                    setNameError("");
                    setNewContactName(value);
                }
            }
            else {
                setNameError(label + " is required");
                setNewContactName(value);
            }

        }
        if (e.target.name === uniqueField.fieldname) {
            let { fieldname, max, min, type, required, label } = uniqueField;
            let value = e.target.value.trim();
            if (value.length) {
                let found = props.data.find(obj => (obj[fieldname]) ? obj[fieldname].toLowerCase() === value.toLowerCase() : false);
                if (type === "email" && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                    setEmailError("Invalid " + label);
                    setNewContactEmail(value);
                }
                else if (value.length < min) {
                    setEmailError("min " + min + " chars");
                    setNewContactEmail(value);
                }
                else if (value.length > max) {
                    if (timeoutId) clearTimeout(timeoutId);
                    timeoutId = setTimeout(() => {
                        setEmailError("");
                    }, 1500);
                    setEmailError("max " + max + " chars");
                }
                else if (found) {
                    setEmailError(label + " already exists");
                    setNewContactEmail(value);
                }
                else {
                    setEmailError("");
                    setNewContactEmail(value);
                }
            } else {
                setNewContactEmail(value);
                setEmailError(required ? label + " is required" : ""); //fieldname==="id"?setEmailError(label+" is required"):setEmailError("");
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
            id: uuidv4(), //props.data.length ? props.data.reduce((max, next) => Math.max(max, next.id), props.data[0].id) + 1 : 0,
            [props.titleField.fieldname]: newContactName,
            [props.uniqueField.fieldname]: newContactEmail,
            created: Date.now(),
            lastUpdated: new Date().toISOString(),
            checked: false
        });
        setNewContactName("");
        setNewContactEmail("");
        props.gotoLastPage();
    }

    return (
        <ListItem className={clsx(classes.newListItem)}>

            <ListItemAvatar>
                <Tooltip title="Save New Contact" arrow><span>
                    <Fab color="primary" size="medium"
                        onClick={saveContact}
                        disabled={(!newContactName.length > 0 || nameError.length > 0 || emailError.length > 0) || (uniqueField.fieldname === "CountryCode" ? !newContactEmail.length > 0 : false)}
                    >
                        <DoneOutline />
                    </Fab>
                </span></Tooltip>
            </ListItemAvatar>


            <ListItemText primary={
                <form align="center">
                    <TextField required autoFocus multiline
                        value={newContactName}
                        label=" FullName" name={titleField.fieldname}
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
                        placeholder={uniqueField.placeholder}
                        label={uniqueField.label} name={uniqueField.fieldname}
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
                <Tooltip title="Cancel" arrow>
                    <Fab color="secondary" size="medium"
                        onClick={() => {
                            props.handleAdd(false); setNewContactName(""); setNewContactEmail("");
                            setNameError(""); setEmailError("");
                        }}>
                        <Close />
                    </Fab>
                </Tooltip>
            </ListItemAvatar>
        </ListItem>

    )
}

export default NewContact
