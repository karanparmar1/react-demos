import React from 'react';
import { Grid, Typography, Hidden } from "@material-ui/core";

const Heading = ({ heading, headerStyle }) => {
    return (
        <Grid container item xs={12} wrap="nowrap" alignItems="center" className={headerStyle} >
            <Grid item xs style={{ maxWidth: "48px", marginRight: "16px" }}>
                <i className={heading.icon} ></i>
            </Grid>
            <Grid item xs className="text-left text-black" >
                <Grid item xs>
                    {/* <Typography variant="h4" component="span"> */}
                    <h1 style={{ display: "inline", margin: "0", lineHeight: 1.1, color: "black" }}>
                        {heading.title}
                    </h1>
                    {/* </Typography> */}

                    <Hidden xsDown>
                        {/* <Grid item xs={12}> */}
                        <p className="text-silver" style={{ margin: 0, lineHeight: 1 }}>
                            {heading.subtitle}
                        </p>
                        {/* <Typography variant="span" wrap="nowrap" component="span" className="text-silver">{heading.subtitle}</Typography> */}
                        {/* </Grid> */}
                    </Hidden>

                </Grid>

            </Grid>

        </Grid>
    )
}

export default Heading;
