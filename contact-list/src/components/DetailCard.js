import React from 'react';
import { Grid, Avatar } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import CommonStyle from "./CommonStyle";

const DetailCard = ({ id, open }) => {
    const theme = useTheme();
    const classes = CommonStyle(theme);
    return (
        id ? <Grid container item xs={12} spacing={3} className="bg-silver" style={{ margin: "8px 16px", padding: "16px 32px", textAlign: "left" }}>

            <Grid container item xs={12} justify="center">
                <Grid item>
                    <Avatar src="broken.png" className={classes.larger}>
                        <h2>KP</h2>
                    </Avatar>
                </Grid>
                <Grid container item style={{ textAlign: "center" }}>
                    <Grid item xs={12}>
                        <h1 style={{ display: "inline", lineHeight: 1, color: "black" }}>
                            Karan Parmar
                          </h1>
                    </Grid>
                    <Grid item xs={12} style={{ minHeight: "100px" }}>
                        Intern at ZURU Tech India Pvt LtZ
                       </Grid>
                </Grid>
            </Grid>

            <Grid container item xs={12}>
                <Grid item xs={4}>Full Name</Grid>
                <Grid item xs={8} className="text-black">Karan Parmar</Grid>
            </Grid>
            <Grid container item xs={12}>
                <Grid item xs={4}>Email</Grid>
                <Grid item xs={8} className="text-black">k123parmar@gmail.com</Grid>
            </Grid>
            <Grid container item xs={12}>
                <Grid item xs={4}>Phone</Grid>
                <Grid item xs={8} className="text-black">+91 85119 18322</Grid>
            </Grid>
            <Grid container item xs={12}>
                <Grid item xs={4}>Company</Grid>
                <Grid item xs={8} className="text-black">Zuru Tech India pvt ltd</Grid>
            </Grid>
            <Grid container item xs={12}>
                <Grid item xs={4}>Address</Grid>
                <Grid item xs={8} className="text-black">No Info Provided</Grid>
            </Grid>

        </Grid>
            : "Contact Details will be displayed over here"
    )
}

export default DetailCard
