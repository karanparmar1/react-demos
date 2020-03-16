import React from 'react';
import { Grid, Avatar, IconButton } from "@material-ui/core";
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

const DetailCard = ({ contact, handleCardClose }) => {
    const theme = useTheme();
    const classes = CommonStyle(theme);

    return (
        contact.id !== undefined && contact.id !== null ?
            <Grid container item xs={12} justify="center" className={`${classes.detailCard} ${classes.bgSilver}`} >
                <Grid item xs={12} style={{ color: "red", textAlign: "right" }}><IconButton color="secondary" onClick={()=>handleCardClose()}>Close</IconButton></Grid>
                <Grid container item spacing={3}>
                    <Grid container item xs={12} justify="center">
                        <Grid item>
                            <Avatar src={contact.image} className={classes.larger} style={{ background: stringToColor(contact.fullname) }}>
                                <h2> {contact.fullname.split(" ").map(n => n[0])}</h2>
                            </Avatar>
                        </Grid>
                        <Grid container item style={{ textAlign: "center" }}>
                            <Grid item xs={12}>
                                <h1 style={{ display: "inline", lineHeight: 1, color: "black" }}>
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
                        <Grid item xs={8} className="text-black">{contact.fullname}</Grid>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid item xs={4}>Email</Grid>
                        <Grid item xs={8} className="text-black">{contact.email}</Grid>
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

            </Grid>
            : <Grid container item xs={12} justify="center" className={`${classes.detailCard} ${classes.bgSilver}`} >
                "Contact Details will be displayed over here"</Grid>
    )
}

export default DetailCard