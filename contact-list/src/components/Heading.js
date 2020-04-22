import React from 'react';
import { Grid, Hidden } from "@material-ui/core";

const Heading = ({ heading, headerStyle }) => {
    return (
        <Grid container item xs={12} wrap="nowrap" alignItems="center" className={headerStyle} >
            <Grid item xs style={{ maxWidth: "48px", marginRight: "16px" }}>
                <i className={heading.icon} ></i>
            </Grid>

            <Grid item xs className="text-left text-black" >
                <Grid item xs>
                    <h1 style={{ display: "inline", margin: "0", lineHeight: 1.1, color: "black" }}>
                        {heading.title}
                    </h1>

                    <Hidden xsDown>
                        <p className="text-silver" style={{ margin: 0, lineHeight: 1 }}>
                            {heading.subtitle}
                        </p>
                    </Hidden>
                </Grid>
            </Grid>

        </Grid>
    )
}

export default Heading;
