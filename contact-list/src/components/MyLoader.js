import React from "react";
import ContentLoader from "react-content-loader";
import { Grid, Hidden } from "@material-ui/core";

const MyLoader = () => (
  <Grid container  style={{margin:"16px"}}>
    <Grid item sm={11} md={12}>
      <ContentLoader
        speed={0.7}
        width="100%"
        height="100%"
        viewBox="0 0 400 300"
        backgroundColor="#cecece"
        foregroundColor="#ecebeb"
      >
        <circle cx="10" cy="20" r="8" />
        <rect x="25" y="15" rx="5" ry="5" width="90%" height="10" />
        <circle cx="10" cy="50" r="8" />
        <rect x="25" y="45" rx="5" ry="5" width="90%" height="10" />
        <circle cx="10" cy="80" r="8" />
        <rect x="25" y="75" rx="5" ry="5" width="90%" height="10" />
        <circle cx="10" cy="110" r="8" />
        <rect x="25" y="105" rx="5" ry="5" width="90%" height="10" />
        <circle cx="11" cy="140" r="8" />
        <rect x="25" y="135" rx="5" ry="5" width="90%" height="10" />
        <circle cx="11" cy="170" r="8" />
        <rect x="25" y="165" rx="5" ry="5" width="90%" height="10" />
        <circle cx="11" cy="200" r="8" />
        <rect x="25" y="195" rx="5" ry="5" width="90%" height="10" />
        <circle cx="11" cy="230" r="8" />
        <rect x="25" y="225" rx="5" ry="5" width="90%" height="10" />
        <circle cx="11" cy="260" r="8" />
        <rect x="25" y="255" rx="5" ry="5" width="90%" height="10" />
        <circle cx="11" cy="290" r="8" />
        <rect x="25" y="285" rx="5" ry="5" width="90%" height="10" />
      </ContentLoader>
    </Grid>
  </Grid>
);

export default MyLoader;