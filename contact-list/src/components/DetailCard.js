import React from 'react';
import { Edit, Save, Close, ArrowBack, AddAPhoto } from "@material-ui/icons";
import { Grid, Avatar, Fab, Input, Badge, TextField, IconButton, Tooltip } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { DropzoneDialog } from 'material-ui-dropzone';
import axios from "axios";
import CommonStyle from "./CommonStyle";

function display(data) {
    if (data !== undefined) return (data.length > 0)
        ? <span style={{ overflowWrap: "break-word",maxWidth:"29ch" }}>{data}</span>
        : <span style={{ color: "dimgray" }}>Info Not Provided</span>;
}
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
let nameError = "", emailError = "", phoneError = "", companyError = "", addressError = "", aboutError = "";
let formError = false;
const DetailCard = ({ contact, editable, handleEdit, handleUpdate, setActive }) => {

    const theme = useTheme();
    const classes = CommonStyle(theme);
    const [state, setState] = React.useState(contact);
    let [dropzoneOpen, setDropzoneOpen] = React.useState(false);

    const validateField = (e) => {
        let value = e.target.value || "";
        let field = e.target.name;

        if (field === "fullname") {
            if (value.length) {
                if (value.length > 32) {
                    nameError = "max 32 chars";
                }
                else { nameError = ""; }
            }
            else {
                nameError = "fullname is required"
            }
        }
        if (field === "email") {
            if (value.length) {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                    emailError = "Invalid email address";
                }
                else if (value.length > 100) {
                    emailError = "max 100 chars";
                }
                else { emailError = ""; }
            }
            else {
                emailError = "email is required"
            }
        }
        if (field === "phone") {
            if (value.length) {
                if (!/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(value)) {
                    phoneError = "Invalid phone number";
                }
                else {
                    phoneError = "";
                }
            }
            else {
                phoneError = "phone is required"
            }
        }
        if (field === "company") {
            if (value.length) {
                companyError = value.length < 2 ? "atleast 2 chars" : value.length > 32 ? "max 32 chars" : "";
            }
            else {
                companyError = "";
            }
        }
        if (field === "address") {
            if (value.length) {
                addressError = value.length < 4 ? "atleast 4 chars" : value.length > 50 ? "max 50 chars" : "";
            }
            else {
                addressError = "";
            }
        }
        if (field === "about") {
            if (value.length) {
                aboutError = value.length < 1 ? "atleast 1 chars" : value.length > 100 ? "max 100 chars" : "";
            }
            else {
                aboutError = "";
            }
        }
        formError = (nameError + emailError + phoneError + aboutError + companyError + addressError).length > 0;
    };

    const handleFileSubmit = (files) => {
        console.log("submit")
        setState({
            ...state,
            image: URL.createObjectURL(files[0])
        });
        setDropzoneOpen(false);
    };

    const handleChangeInput = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
        validateField(e);
    };

    const handleCancel = () => {
        handleEdit(false);
        setState(contact);
    };

    React.useEffect(() => {
        setState(contact); console.log("state : " + state.fullname);
        nameError = ""; emailError = ""; phoneError = ""; companyError = ""; addressError = ""; aboutError = ""; formError = false;
    }, [contact]
    );
    return (
        contact.id !== undefined && contact.id !== null ?
            <Grid container item xs={12} justify="center" className={`${classes.detailCard} ${classes.bgSilver}`} >

                <Grid container item xs={12} justify="space-between">
                    <Grid item xs style={{ textAlign: "left" }}>
                        <Tooltip title="Back">
                            <IconButton color="secondary" style={{ padding: "8px 0px" }} onClick={() => setActive({})}><ArrowBack />  </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item xs style={{ textAlign: "right" }}>  {!editable ?
                        <Tooltip title="Edit">
                            <Fab size="medium" variant="extended" className={classes.btnEdit} onClick={() => handleEdit()}><Edit fontSize="small" /> &nbsp;EDIT </Fab>
                        </Tooltip> : <></>}
                    </Grid>
                </Grid>

                <Grid container item spacing={editable ? 1 : 3}>
                    <Grid container item xs={12} justify="center">
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
                                {<IconButton
                                    onClick={() => setDropzoneOpen(true)}
                                    style={{
                                        position: "relative", top: "-5px", left: "-5px", padding: "4px", background: "white", border: "3px solid darkgray"
                                    }}
                                    size="medium">
                                    <AddAPhoto color="primary" />
                                </IconButton>}
                            >
                                <Avatar src={state.image} className={classes.larger} style={{ background: stringToColor(contact.id + contact.fullname) }}>
                                    {contact.fullname.split(" ").map((n, i) => i < 2 ? n[0] : "")}
                                </Avatar>
                            </Badge>
                        </Grid>
                        <Grid container item justify="center" style={{ textAlign: "center" }}>
                            <Grid item xs={12}>
                                <h1 style={{ lineHeight: 1, margin: "10px auto", color: "black", maxWidth: "100%", overflowWrap: "anywhere", }}>
                                    {contact.fullname}
                                </h1>
                            </Grid>
                            <Grid item xs={12} md={8} style={{ minHeight: "3ch", maxWidth: "32ch" }}>
                                {editable ?
                                    <TextField multiline type="text" label="about" variant="filled" className={classes.contactField}
                                        value={state.about} name="about" onChange={handleChangeInput}
                                        helperText={aboutError || " "} error={aboutError.length > 0} rowsMax={3}
                                    />
                                    : display(contact.about)}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid item xs={12} sm={4}>Full Name</Grid>
                        <Grid item xs={12} sm={8} className="text-black">

                            {editable ? <TextField multiline type="text" className={classes.contactField}
                                value={state.fullname} name="fullname" onChange={handleChangeInput}
                                helperText={nameError || " "} error={nameError.length > 0}
                            /> : display(contact.fullname)}

                        </Grid>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid item xs={12} sm={4}>Email</Grid>
                        <Grid item xs={12} sm={8} className="text-black" >
                            {editable ?
                                <TextField multiline type="text" className={classes.contactField}
                                    value={state.email} name="email" onChange={handleChangeInput}
                                    helperText={emailError || " "} error={emailError.length > 0}
                                />
                                : display(contact.email)}
                        </Grid>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid item xs={12} sm={4}>Phone</Grid>
                        <Grid item xs={12} sm={8} className="text-black"> {editable ?
                            <TextField multiline type="number" className={classes.contactField}
                                value={state.phone} name="phone" onChange={handleChangeInput}
                                helperText={phoneError || " "} error={phoneError.length > 0}
                            />
                            : display(contact.phone)}</Grid>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid item xs={12} sm={4}>Company</Grid>
                        <Grid item xs={12} sm={8} className="text-black"> {editable ?
                            <TextField multiline type="text" className={classes.contactField}
                                value={state.company} name="company" onChange={handleChangeInput}
                                helperText={companyError || " "} error={companyError.length > 0}
                            />
                            : display(contact.company)}</Grid>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid item xs={12} sm={4}>Address</Grid>
                        <Grid item xs={12} sm={8} className="text-black"> {editable ?
                            <TextField multiline type="text" className={classes.contactField}
                                value={state.address} name="address" onChange={handleChangeInput}
                                helperText={addressError || " "} error={addressError.length > 0}
                            />
                            : display(contact.address)}</Grid>
                    </Grid>
                </Grid>

                {editable ? <Grid container item justify="center" spacing={1}>
                    <Grid item>
                        <Fab variant="extended" size="medium" color="primary" disabled={formError} onClick={() => { handleUpdate(state); handleEdit(false); setState(contact) }}><Save /> &nbsp;Save </Fab>
                    </Grid>
                    <Grid item>
                        <Fab variant="extended" size="medium" color="secondary" onClick={handleCancel}><Close /> &nbsp;Cancel </Fab>
                    </Grid>
                </Grid>
                    : <></>}



            </Grid >
            : <></>
        // : <Grid container item xs={12} justify="center" className={`${classes.detailCard} ${classes.bgSilver}`} >
        //     "Contact Details will be displayed over here"</Grid>
    )
}

export default DetailCard
