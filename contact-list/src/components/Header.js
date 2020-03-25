import React from 'react';
import {Grid,Typography,Hidden} from "@material-ui/core";

const Header = ({ title, subtitle,headerStyle,iconClass }) => {
    return (
        <Grid container item xs={12} wrap="nowrap" alignItems="center" className={headerStyle} >
            <Grid item xs style={{ maxWidth: "48px", marginRight: "16px" }}>
                <i className={iconClass} ></i>
            </Grid>
            <Grid item xs className="text-left" >
                <Grid item xs>
                    <Typography variant="h4" component="span">
                        {title} </Typography>
                </Grid>
                <Hidden xsDown>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" component="span" className="text-silver">{subtitle}</Typography>
                    </Grid>
                </Hidden>
            </Grid>

        </Grid>
    )
}

export default Header
