import React from 'react';
import clsx from 'clsx';
import { Edit, Save, Close, ArrowBack, AddAPhoto, Delete } from "@material-ui/icons";
import { Grid, Avatar, Fab, Badge, TextField, Select, MenuItem, IconButton, Tooltip, Fade } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { DropzoneDialog } from 'material-ui-dropzone';
import CommonStyle from "./CommonStyle";

function display(data) {
    return (data) ? data
        : <span style={{ color: "dimgray" }}>Info Not Provided</span>;
}

const displayDate = (dateString) => {
    let d = new Date(dateString);
    return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + ", " + d.toLocaleTimeString();
};

function stringToColor(string) {
    let hash = 0, i = 0, color = "#";
    const adjustBrightness = (color, amount) => {
        return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
    };
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.substr(-2);
    }
    color = adjustBrightness(color, -25); //Minus value to darken,positive for light
    return color;
}
let timeoutId = 111;
const DetailCard = ({ contact, data, editable, handleEdit, handleUpdate, setActive, objRule, imgField, titleField, uniqueField, descriptionField }) => {
    const theme = useTheme();
    const classes = CommonStyle(theme);

    const [state, setState] = React.useState(contact);
    const [dropzoneOpen, setDropzoneOpen] = React.useState(false);
    const [formError, setFormError] = React.useState(false);
    const [currentError, setCurrentError] = React.useState(false);


    const updateContact = (updatedContact) => {

        // Handling Dates if Any
        if (updatedContact.Date) {
            updatedContact.Date = displayDate(new Date().toISOString());
        }
        if (updatedContact.updated) {
            updatedContact.updated = displayDate(new Date().toISOString());
        }
        updatedContact.lastUpdated = displayDate(new Date());
        handleUpdate(updatedContact);
    };

    const handleFileSubmit = (files) => {
        console.log("submitted File")
        setState({
            ...state,
            [imgField.fieldname]: URL.createObjectURL(files[0])
        });
        setDropzoneOpen(false);
    };


    const handleCancel = () => {
        handleEdit(false);
        setState(contact);
        Object.entries(objRule).forEach(obj => obj[1].error = "");
    };

    const setValue = (field, value) => {
        // if (fieldTimer) clearTimeout(fieldTimer);
        //fieldTimer = setTimeout(() =>
        setState({
            ...state,
            [field]: value,
        })
        //     , 500);
    };

    const validateForm = () => {
        setFormError(Object.entries(objRule).reduce((sum, next) => sum + next[1].error, "").length > 0);
    };

    // Validations [not Refactored]
    const validateField = (e, field) => {
        let value = e.target.value || "";
        const { fieldname, type, label, required, min, max } = field;
        if (value.length) {

            if (type === "phone") {
                let invalidPhone = !/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(value);
                setValue(field.fieldname, value);
                objRule[fieldname].error = invalidPhone ? "Invalid Phone number" : "";
            }
            else if (field.type === "number") {
                let invalid = !/^[0-9]+$/.test(value);
                if (invalid && value.length <= max) {
                    if (timeoutId) clearTimeout(timeoutId);
                    timeoutId = setTimeout(() => {
                        objRule[fieldname].error = "";
                        setCurrentError(false);
                        validateForm();
                    }, 1500);
                    objRule[fieldname].error = "Enter Numbers Only";
                    setCurrentError(true);
                }
                else if (value.length > max) {
                    if (timeoutId) clearTimeout(timeoutId);
                    timeoutId = setTimeout(() => {
                        objRule[fieldname].error = "";
                        setCurrentError(false);
                        validateForm();
                    }, 1500);
                    objRule[fieldname].error = "You can enter max " + max + " chars";
                    setCurrentError(true);
                }
                else {
                    if (!invalid && value.length <= max) {
                        objRule[fieldname].error = "";
                        setValue(field.fieldname, value);
                    }
                }
            }

            else if (type === "email") {
                let invalidEmail = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
                if (invalidEmail && value.length <= max) {
                    objRule[fieldname].error = "Invalid Email address";
                    setValue(field.fieldname, value);
                }
                else if (value.length > max) {
                    if (timeoutId) clearTimeout(timeoutId);
                    timeoutId = setTimeout(() => {
                        objRule[fieldname].error = invalidEmail ? "Invalid Email address" : "";
                        setCurrentError(false);
                        validateForm();
                    }, 1500);
                    objRule[fieldname].error = "You can enter max " + max + " chars";
                    setCurrentError(true);
                }
                else {
                    objRule[fieldname].error = "";
                    setValue(field.fieldname, value);
                }
            }
            else {
                let invalidId = (!/^([a-zA-Z])[a-zA-Z0-9-]*$/i.test(value));
                if (field.fieldname === "id" && invalidId) {
                    if (timeoutId) clearTimeout(timeoutId);
                    timeoutId = setTimeout(() => {
                        objRule[fieldname].error = "Enter AlphaNumeric with \"-\"";
                        setCurrentError(false);
                        validateForm();
                    }, 1000);
                    objRule[fieldname].error = "Invalid " + label;
                    setValue(field.fieldname, value);
                    setCurrentError(true);
                }
                else if (value.length < min) {
                    objRule[fieldname].error = "Enter ateleast " + min + " chars";
                    setValue(field.fieldname, value);
                }
                else if (value.length > max) {
                    if (timeoutId) clearTimeout(timeoutId);
                    timeoutId = setTimeout(() => {
                        objRule[fieldname].error = "";
                        setCurrentError(false);
                        validateForm();
                    }, 1000);
                    objRule[fieldname].error = "You can enter max " + max + "  chars";
                    setCurrentError(true);
                }
                else {
                    objRule[fieldname].error = "";
                    setValue(fieldname, value);
                }
            }
            if (field.unique) {
                let found = data.find(obj => (obj[fieldname]) ? obj.id !== contact.id && obj[fieldname].toLowerCase() === value.toLowerCase() : false);
                if (found) {
                    objRule[fieldname].error = label + " already exist";
                    setValue(fieldname, value);
                }
            }
        }
        else {
            objRule[fieldname].error = required ? (label + " is required") : "";
            setValue(fieldname, value);
        }
        validateForm();
    };

    const handleChangeInput = (e, field) => { validateField(e, field); };

    React.useEffect(() => {
        setState(contact);
        Object.entries(objRule).forEach(obj => obj[1].error = "");
        setFormError(false);
    }, [contact, objRule]);



    return (
        contact.id !== undefined && contact.id !== null ?
            <Grid container item xs={12} justify="center" className={`${classes.detailCard} ${classes.bgSilver}`} >
                {/* BACK - EDIT BUTTONS */}
                <Grid container item xs={12} justify="space-between">
                    <Grid item xs style={{ textAlign: "left" }}>
                        <Tooltip title="Back">
                            <IconButton color="secondary" className={classes.hoverEffect} style={{ padding: "8px 0px" }} onClick={() => setActive({})}><ArrowBack />  </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item xs style={{ textAlign: "right" }}>  {!editable ?
                        <Tooltip title="Edit">
                            <Fab size="medium" variant="extended" className={classes.btnEdit} onClick={() => handleEdit()}><Edit fontSize="small" /> &nbsp;EDIT </Fab>
                        </Tooltip> : <></>}
                    </Grid>
                </Grid>

                {/* DETAILS */}
                <Grid container item spacing={editable ? 1 : 3}>
                    {/* Image, Title, Subtitle/Description Text */}
                    < Grid container item xs={12} justify="center" >
                        <Grid item>
                            <DropzoneDialog showPreviewsInDropzone={true} showPreviews={false} filesLimit={1} acceptedFiles={["image/*"]} showFileNamesInPreview={true} showFileNames={true}
                                open={dropzoneOpen} onClose={() => setDropzoneOpen(false)} onSave={handleFileSubmit}
                            />
                            <Badge overlap="circle" invisible={!editable}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                badgeContent=
                                {<Tooltip title={state[imgField.fieldname] ? "Delete Photo" : "Upload Photo"} arrow><span><IconButton
                                    onClick={() => { state[imgField.fieldname] ? setValue(imgField.fieldname, "") : setDropzoneOpen(true) }}
                                    className={classes.btnUploadWrapper}
                                    disabled={!editable}
                                    size="small">
                                    {state[imgField.fieldname] ? <Delete className={classes.btnUpload} style={{ top: 0, left: 0 }} /> : <AddAPhoto className={classes.btnUpload} />}
                                </IconButton></span></Tooltip>}
                            >
                                <Avatar src={state[imgField.fieldname]} variant={imgField.fieldname === "flag" ? "square" : "circle"}
                                    className={classes.larger} style={{ background: stringToColor(contact.id) }}>
                                    {contact[titleField.fieldname].split(" ").map((n, i) => i < 2 ? n[0] : "")}
                                </Avatar>
                            </Badge>
                        </Grid>

                        <Grid container item justify="center" style={{ textAlign: "center" }}>
                            <Grid item xs={12}>
                                <h1 style={{ lineHeight: 1, margin: "10px auto", color: "black", maxWidth: "100%", overflowWrap: "anywhere", }}>
                                    {contact[titleField.fieldname]}
                                </h1>
                            </Grid>
                            <Grid item xs={12} md={8} className={classes.aboutGrid}>
                                {
                                    descriptionField.type === "date" ?
                                        <TextField multiline type="text" disabled={true} label={descriptionField.label} variant="filled" className={classes.contactField}
                                            value={state[descriptionField.fieldname] ? displayDate(state[descriptionField.fieldname]) : displayDate(state.lastUpdated)} name={descriptionField.fieldname}
                                            onChange={(e) => handleChangeInput(e, descriptionField)} autoFocus helperText={descriptionField.error || " "}
                                        />

                                        :
                                        editable ?
                                            <TextField multiline type="text" label={descriptionField.label} variant="filled" className={classes.contactField}
                                                value={state[descriptionField.fieldname]} name={descriptionField.fieldname} onChange={(e) => handleChangeInput(e, descriptionField)} autoFocus
                                                helperText={descriptionField.error || " " /*  OR " " is used cuz want to display blank so it takes space */} error={descriptionField.error.length > 0} rowsMax={3}
                                            /> : contact[descriptionField.fieldname]}
                                {/* : display(contact[descriptionField.fieldname])} */}
                            </Grid>
                        </Grid>
                    </Grid>
                    {
                        Object.entries(objRule).map((keyValuePair, index) => {
                            //keyValuePair has-> [0] as fieldname(as Key) and [1] as Value of Single Field, i.e., fullname:"karan paramar"
                            let fieldname = keyValuePair[0];
                            let field = objRule[fieldname];  //Getting rule of field ,objRule is passed from props
                            // if (field.unique) {
                            //     objRule[fieldname].error = field.required ? !contact[fieldname].length ? field.label + " is Required" : objRule[fieldname].error : objRule[fieldname].error;
                            // }
                            return !(field.type === "image" || field.subtitle) &&

                                <Grid container item xs={12} key={index} className={classes.fieldGrid}>
                                    <Grid item xs={12} md={4}>{field.label.concat((editable && field.required) ? "*" : "")}</Grid>
                                    <Grid item xs={12} md={8} className={classes.inputGrid} >
                                        {
                                            field.type === "boolean" ?
                                                (editable ? <>
                                                    <Select
                                                        value={state[fieldname] || false}
                                                        onChange={(e) => handleChangeInput(e, field)}
                                                        autoWidth
                                                        className={classes.selectEmpty}>
                                                        <MenuItem value={true}>Yes</MenuItem>
                                                        <MenuItem value={false}>No</MenuItem>
                                                    </Select> <br />&nbsp;</>
                                                    : display(contact[fieldname] ? "Yes" : "No"))
                                                : (editable ?
                                                    <TextField multiline type="text" className={classes.contactField}
                                                        value={state[fieldname]} name={fieldname} placeholder={field.placeholder} onChange={(e) => handleChangeInput(e, field)}
                                                        helperText={objRule[fieldname].error || " "} error={objRule[fieldname].error.length > 0}
                                                    />
                                                    // field.error not used but accessing objRule[fieldname].error cuz objRule is global and is modified in validation fxn
                                                    //If I am making TextField Uncontrolled i.e. removing value attr, maxLength prob.
                                                    : display(contact[fieldname]))
                                        }
                                    </Grid>
                                </Grid>
                        })
                    }

                </Grid>

                {/* SAVE - CANCEL BUTTONS */}
                <Fade in={editable}>
                    <Grid container item justify="center" spacing={1}>
                        <Grid item>
                            <Tooltip title={formError ? "Saving requires valid values" : "Save"} arrow>
                                <div className={clsx({ [classes.cursorDisabled]: formError })}>
                                    <Fab variant="extended" size="medium" color="primary" disabled={formError} onClick={() => { updateContact(state); handleEdit(false); setState(contact) }}><Save /> &nbsp;Save </Fab>
                                </div>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <Tooltip title="Cancel" arrow>
                                <Fab variant="extended" size="medium" color="secondary" onClick={handleCancel}><Close /> &nbsp;Cancel </Fab>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Fade>

            </Grid >
            : <></>
        // : <Grid container item xs={12} justify="center" className={`${classes.detailCard} ${classes.bgSilver}`} >
        //     "Contact Details will be displayed over here"</Grid>
    )
}

export default DetailCard;