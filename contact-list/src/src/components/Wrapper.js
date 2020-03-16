import React from "react";
import clsx from "clsx";
import "font-awesome/css/font-awesome.min.css"
import { useTheme } from "@material-ui/core/styles";
import {
  Backdrop, IconButton, Grid, Hidden, AppBar, Toolbar, Typography
} from "@material-ui/core";

import { ClearAllRounded } from "@material-ui/icons";
import LocalData from "../data/LocalData";
import DetailCard from "./DetailCard";
import ContactList from "./ContactList";
import SearchBar from "./SearchBar";
import SideDrawer from "./SideDrawer";
import CommonStyle from "./CommonStyle";

const id = false;
const localData = LocalData();

export default function Wrapper() {

  const theme = useTheme();
  const classes = CommonStyle(theme);

  // const classes = useStyles();
  // const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleContactClick = (currentId) => {
    setId(currentId);
  }

  const onChange = (e) => {
    console.log("hi")
    console.log(e.target.value);
  }

  return (
    <div className={classes.root}>
      {/* <CssBaseline /> */}
      <SideDrawer open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
      }

      <AppBar className={clsx(classes.appBar, { [classes.appBarShift]: open })}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <ClearAllRounded fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Hidden smUp>
        <Backdrop className={classes.backdrop} open={open} onClick={() => setOpen(false)} />
      </Hidden>

      <main className={clsx({ [classes.mainContent]: open }, classes.content)}>
        <div className={classes.toolbar} />
        <Grid container spacing={5} >
          {/* Heading-Contact starts here */}
          <Grid container item xs={12} alignItems="center" >
            <Grid item xs={3} sm={2} md={1}>
              <i className="fa fa-address-book fa-flip-horizontal fa-3x icon-gradient" ></i>
            </Grid>
            <Grid item xs={9} sm={10} md={11} className="text-left" >
              <Grid item xs={12}>
                <Typography variant="h4" component="span">
                  Contacts </Typography>
              </Grid>
              <Hidden xsDown>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" component="span" className="text-silver"> Welcome to InstaConnect</Typography>
                </Grid>
              </Hidden>
            </Grid>
          </Grid>
          {/* Heading-Contact Ends here */}

          <Grid container item xs={12}>
            {/* <Hidden smDown><Grid item md={1}></Grid> </Hidden> */}
            {/* MAIN CONTENT SEARCHBAR AND LIST STARTS HERE */}
            <Grid container item spacing={5} xs={12}>

              {/* SearchBar */}
              <SearchBar onChange={onChange} />
              {/* SearchBar Ends ; Wrapper for List starts here*/}

              <Grid container item xs={12} style={{ padding: "0px" }}>
                <Grid container item xs={12}>
                  <Grid container item xs={12} md={6} style={{ padding: "8px 16px" }}>
                    <Grid item xs={12}>
                      <ContactList handleContactClick={handleContactClick} />
                    </Grid>
                  </Grid>

                  <Grid container item xs={12} md={6} >
                    <DetailCard open={open} id={id} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

            <Grid container item xs={12}>
            <DetailCard open={open} id={id} />
            </Grid>

        </Grid>
      </main>
    </div >
  );
}
