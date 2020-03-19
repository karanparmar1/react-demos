import React from 'react';
import { Edit, Save } from "@material-ui/icons";
import { Grid, Avatar, Fab, Input } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import CommonStyle from "./CommonStyle";

function display(data) {
    if (data !== undefined) return data.length > 0 ? data : "No Informarion Provided";
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

const DetailCard = ({ contact, editable, handleEdit, handleSave }) => {
    const theme = useTheme();
    const classes = CommonStyle(theme);
    const [state, setState] = React.useState(contact);

    const handleChangeInput = (e) => {
        console.log(state);
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }
    React.useEffect(() => { console.log(contact.fullname) }
    );
    return (
        contact.id !== undefined && contact.id !== null ?
            <Grid container item xs={12} justify="center" className={`${classes.detailCard} ${classes.bgSilver}`} >

                {!editable ?
                    <Grid item xs={12} style={{ color: "red", textAlign: "right" }}>
                        <Fab size="medium" className={classes.btnEdit} onClick={() => handleEdit()}><Edit /></Fab>
                    </Grid> : <></>
                }
                <Grid container item spacing={3}>
                    <Grid container item xs={12} justify="center">
                        <Grid item>
                            <Avatar src={contact.image} className={classes.larger} style={{ background: stringToColor(contact.fullname) }}>
                                {contact.fullname.split(" ").map((n, i) => i < 2 ? n[0] : "")}
                            </Avatar>
                        </Grid>
                        <Grid container item style={{ textAlign: "center" }}>
                            <Grid item xs={12}>
                                <h1 style={{lineHeight: 1, color: "black", maxWidth:"100%",overflowWrap:"anywhere",}}>
                                    {contact.fullname}
                                </h1>
                            </Grid>
                            <Grid item xs={12} style={{ minHeight: "100px" }}>
                                {contact.about}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid item xs={4}>Full Name</Grid>
                        <Grid item xs={8} className="text-black">

                            <Input disableUnderline={!editable} type="text" className={classes.contactField}
                                value={/*state.fullname ? state.fullname :*/ contact.fullname} name="fullname" onChange={handleChangeInput}
                                disabled={!editable}
                            />

                        </Grid>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid item xs={4}>Email</Grid>
                        <Grid item xs={8} className="text-black">

                            <Input disableUnderline={!editable} type="text" className={classes.contactField}
                                value={/*state.email ? state.email :*/ contact.email} name="email" onChange={handleChangeInput}
                                disabled={!editable}
                            />

                        </Grid>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid item xs={4}>Phone</Grid>
                        <Grid item xs={8} className="text-black">{display(contact.phone)}</Grid>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid item xs={4}>Company</Grid>
                        <Grid item xs={8} className="text-black">{contact.company}</Grid>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid item xs={4}>Address</Grid>
                        <Grid item xs={8} className="text-black">{contact.address}</Grid>
                    </Grid>
                </Grid>

                {editable ? <Grid item style={{ margin: "24px auto 0px" }}>
                    <Fab variant="extended" size="medium" color="primary" onClick={() => handleSave(state)}><Save /> &nbsp;Save </Fab>
                </Grid> : <></>}


            </Grid>
            : <></>
        // : <Grid container item xs={12} justify="center" className={`${classes.detailCard} ${classes.bgSilver}`} >
        //     "Contact Details will be displayed over here"</Grid>
    )
}

export default DetailCard
