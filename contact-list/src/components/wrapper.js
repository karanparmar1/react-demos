import React from "react";
import clsx from "clsx";
import "font-awesome/css/font-awesome.min.css"
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Backdrop, Checkbox, Drawer, IconButton, Button,
  InputBase, Grid, Hidden, AppBar, Toolbar, CssBaseline, Divider,
  List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, ListItemAvatar, Avatar, Typography
} from "@material-ui/core";
import { Twitter, GitHub, Add, AddBox, Search, PersonOutline, Person, ClearAllRounded, ChevronLeft } from "@material-ui/icons";

const drawerWidth = 220;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginRight: theme.spacing(2)
  },
  backdrop: {
    [theme.breakpoints.down("sm")]: {
      zIndex: theme.zIndex.drawer - 1,
      color: "black"
    }
  },
  active: {
    boxShadow: "inset 5px 0 0 0 white",
    background: "rgba(240,240,240,0.1)",
    color: "rgba(255,255,255,1)"
  },
  button: {
    textTransform: "none",
    minWidth: "150px",
    maxWidth: "150px",
    whiteSpace: "nowrap",
    minHeight: "48px",
    [theme.breakpoints.down("sm")]: {
      minWidth: "44px",
      minHeight: "44px",
      borderRadius: "50%"
    }
  },
  searchbar: {
    background: "rgb(230, 230, 230)",
    display: "flex",
    borderRadius: 25,
    padding: "0 12px 0",
    minWidth: "120px"
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  textWhite: {
    color: "rgba(255,255,255,0.9)"
  },
  bgGradient: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    color: "white",
    fontWeight: "bold",
  },

  appBar: {
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    background: "white",
    position: "fixed"
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
  mainContent: {
    [theme.breakpoints.down('xs')]: {
      position: "fixed"
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    margin: "20px"
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

      <AppBar className={classes.appBar}>
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
          <Grid container item xs={12} alignItems="center" >
            <Grid item xs={3} sm={2} md={1}>
              <i className="fa fa-address-book fa-flip-horizontal fa-3x icon-gradient" ></i>
            </Grid>

            <Grid item xs={9} sm={10} md={11} className="text-left" style={{ paddingLeft: "0px" }}>
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

          <Grid container item xs={12}>
            <Hidden smDown><Grid item sm={1}></Grid> </Hidden>
            {/* MAIN CONTENT SEARCHBAR AND LIST STARTS HERE */}
            <Grid container item xs={12} sm={11} spacing={5} >

              {/* SearchBar */}
              <Grid container item xs={12} md={6} spacing={1}>
                <Grid item xs={11} md={9} >
                  <div className={classes.searchbar}>
                    <InputBase
                      className={classes.input}
                      type="search"
                      placeholder="Search Contacts"
                    />
                    <IconButton type="submit" className={classes.iconButton} aria-label="search">
                      <Search />
                    </IconButton>
                  </div>
                </Grid>
                <Grid item xs={1} md={3}>
                  <Button
                    variant="contained"
                    className={clsx(classes.button, classes.bgGradient)}
                    size="large"
                    fullWidth
                  ><Add /><Hidden smDown> &nbsp;Add Contact</Hidden></Button>
                </Grid>
              </Grid>

              <Grid container item spacing={0}>
                <Grid container item xs={12} md={6} >

                  <Grid container item spacing={3}>
                    <List style={{ flexGrow: 1 }}>
                      <ListItem className="bg-silver" dense >
                        <ListItemIcon>
                          <AddBox  />
                        </ListItemIcon>
                        <ListItemText primary="Basic Info" />
                        <ListItemText primary="Company" style={{ display: 'flex', justifyContent: "center" }} />
                      </ListItem>

                     <ListItem dense button>
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            disableRipple
                            color="primary"
                          />
                        </ListItemIcon>
                        <ListItemAvatar>
                          <Avatar src="brokesgf.png" className={classes.large}>
                            KP
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={<h3 style={{ display: "inline" }}>Karan Parmar</h3>} secondary={<small>k123parmar@gmail.com</small>} style={{ margin: '0px' }} />
                        <ListItemText primary={<h4>ZURU TECH</h4>} style={{ display: 'flex', justifyContent: "center" }} />
                      </ListItem>
                   </List>

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
