import React from "react";
import clsx from "clsx";
import "font-awesome/css/font-awesome.min.css"
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Backdrop, Drawer, IconButton, Button,
  InputBase, Grid, Hidden, AppBar, Toolbar, CssBaseline, Divider,
  Typography
} from "@material-ui/core";
import { List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, ListItemAvatar, Avatar, Checkbox, } from '@material-ui/core';

import { Twitter, GitHub, Add, AddBox, Search, PersonOutline, Person, ClearAllRounded, ChevronLeft } from "@material-ui/icons";
import DetailCard from "./DetailCard";
import ContactList from "./ContactList";
import SearchBar from "./SearchBar";
import SideDrawer from "./SideDrawer";
import CommonStyle from "./CommonStyle"

const drawerWidth = 220;
const id = false;

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: "flex",
//   },
//   large: {
//     width: theme.spacing(6),
//     height: theme.spacing(6),
//     marginRight: theme.spacing(2)
//   },
//   larger: {
//     width: theme.spacing(10),
//     height: theme.spacing(10),
//     margin: theme.spacing(2)
//   },
//   backdrop: {
//     [theme.breakpoints.down("sm")]: {
//       zIndex: theme.zIndex.drawer - 1,
//       color: "black"
//     }
//   },
//   active: {
//     boxShadow: "inset 5px 0 0 0 white",
//     background: "rgba(240,240,240,0.1)",
//     color: "rgba(255,255,255,1)"
//   },
//   button: {
//     textTransform: "none",
//     minWidth: "150px",
//     maxWidth: "150px",
//     whiteSpace: "nowrap",
//     minHeight: "48px",
//     [theme.breakpoints.down("sm")]: {
//       minWidth: "44px",
//       maxWidth: "44px",
//       minHeight: "44px",
//       borderRadius: "50%"
//     }
//   },
//   searchbar: {
//     background: "rgb(230, 230, 230)",
//     display: "flex",
//     borderRadius: 25,
//     padding: "0 12px 0",
//     minWidth: "120px"
//   },
//   input: {
//     marginLeft: theme.spacing(1),
//     flex: 1
//   },
//   textWhite: {
//     color: "rgba(255,255,255,0.9)"
//   },
//   bgGradient: {
//     background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
//     color: "white",
//     fontWeight: "bold",
//   },

//   appBar: {
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen
//     }),
//     background: "white"
//   },
//   appBarShift: {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen
//     })
//   },
//   menuButton: {
//     marginRight: 29
//   },
//   hide: {
//     display: "none"
//   },
//   drawer: {
//     width: drawerWidth,
//     flexShrink: 0,
//     whiteSpace: "nowrap",
//     background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
//   },

//   drawerOpen: {
//     width: drawerWidth,
//     transition: theme.transitions.create("width", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen
//     }),
//     overflowX: "hidden"
//   },
//   drawerClose: {
//     transition: theme.transitions.create("width", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen
//     }),
//     overflowX: "hidden",
//     width: 0,
//     border: 0,
//     [theme.breakpoints.up('sm')]: {
//       width: theme.spacing(8) + 1,
//     },

//   },
//   toolbar: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "flex-end",
//     paddingLeft: "90px",
//     padding: theme.spacing(0, 1),
//     ...theme.mixins.toolbar
//   },
//   mainContent: {
//     [theme.breakpoints.down('xs')]: {
//       position: "absolute"
//     }
//   },
//   content: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     margin: "20px",
//     [theme.breakpoints.down('xs')]: {
//       margin: "0px"
//     },
//   }
// }));

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

      {/* <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft fontSize="large" />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, classes.textWhite, {
              [classes.hide]: open
            })}
          >
            <ClearAllRounded fontSize="large" />
          </IconButton>
        </div>

        <List className={classes.textWhite}>
          <ListItem button className={classes.active} >
            <ListItemIcon className={classes.textWhite}>
              <PersonOutline fontSize="large" />
            </ListItemIcon>
            <ListItemText primary="Local" />
          </ListItem>
          <ListItem button >
            <ListItemIcon className={classes.textWhite}>
              <Twitter fontSize="large" />
            </ListItemIcon>
            <ListItemText primary="Twitter" />
          </ListItem>

          <ListItem button>
            <ListItemIcon className={classes.textWhite}>
              <GitHub fontSize="large" />
            </ListItemIcon>
            <ListItemText primary="GitHub" />
          </ListItem>
        </List>
      </Drawer> */
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
        </Grid>
      </main>
    </div >
  );
}
