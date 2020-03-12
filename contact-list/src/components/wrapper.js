import React from "react";
import clsx from "clsx";
import "font-awesome/css/font-awesome.min.css"
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Drawer, List, Grid, Hidden, AppBar, Toolbar, CssBaseline, Divider, IconButton, ListItem, ListItemIcon, ListItemText, Typography } from "@material-ui/core";
import { Twitter, GitHub, PersonOutline, ClearAllRounded, ChevronLeft } from "@material-ui/icons";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  active: {
    boxShadow: "inset 5px 0 0 0 white",
    background: "rgba(240,240,240,0.1)",
    color: "rgba(255,255,255,1)"
  },

  textWhite: {
    color: "rgba(255,255,255,0.9)"
  },
  bgGradient: {

    fontSize: "100px",
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    webkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  },
  appBar: {
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    background: "white"
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 29
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  },

  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    overflowX: "hidden"
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: 0,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(8) + 1,
    },

  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingLeft: "90px",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  }
}));

export default function Wrapper() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      {/* <CssBaseline /> */}

      <Drawer
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
      </Drawer>

      <AppBar style={{ background: "white" }}>
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

        </Toolbar></AppBar>

      <Grid container >
        <main className={classes.content}>
          <div className={classes.toolbar} />

          <Grid container item xs={12} alignItems="center">
            <Grid item xs={4} sm={1}>
              <i className="fa fa-address-book fa-flip-horizontal fa-3x icon-gradient" ></i>
            </Grid>

            <Grid item xs={8} sm={11} className="text-left" style={{ paddingLeft: "5px" }}>
              <Grid item xs={12}>
                <Typography variant="h4" component="span">
                  Contacts </Typography>
              </Grid>

              <Grid item xs={12}> <Hidden xsDown>
                <Typography variant="subtitle1" component="span" className="text-silver"> Welcome to InstaConnect</Typography> </Hidden>
              </Grid>

            </Grid>
          </Grid>


        </main>
      </Grid>

    </div>
  );
}
