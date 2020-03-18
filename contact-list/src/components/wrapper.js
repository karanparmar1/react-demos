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

const originalData = LocalData();
let localData = LocalData();

export default function Wrapper() {

  const theme = useTheme();
  const classes = CommonStyle(theme);

  const [open, setOpen] = React.useState(false);
  const [editable, setEditable] = React.useState(false);
  const [activeContact, setActiveContact] = React.useState({});
  const [data, setData] = React.useState(localData);
  const [search,setSearch] = React.useState(""); 
  const searchFilter = search => item =>item.fullname.toLowerCase().includes(search.toLowerCase())
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleCheckedChange = (changedContact) => {
    let temp = data;
   temp.forEach(item => {
       item.checked = (item.id === changedContact.id) ?!changedContact.checked:item.checked;
    });
    setData([...temp]);
  }

  const handleSelectAll = (selectAll) => {
  let temp=data;
  temp.forEach(contact => {
      contact.checked = selectAll
    })
    setData([...temp]);
  };

  const handleDelete = () => {
    localData =localData.filter(item => !item.checked);
    setData([...localData]);
    if (activeContact.checked) { setActiveContact({}) }
    setSearch("");
  }

  const handleContactClick = (clickedContact) => {
    setActiveContact(clickedContact);
    setEditable((editable) ? clickedContact.id === activeContact.id : false);
  }

  const onChange = (e) => {
    setActiveContact({});
    setData([...localData.filter(searchFilter(e.target.value))]);
    setSearch(e.target.value);
  }

  const handleEdit = () => {
    setEditable(true);
  }

  const handleSave = (contact) => {
    console.dir(contact);
    setEditable(false);
  }

  React.useEffect(() => {
    console.log("Rendered");
  });

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
            <Grid item xs={3} sm={2} md={1} style={{ maxWidth: "48px", marginRight: "16px" }}>
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
          <Grid container item xs={12} justify="center">
            {/* MAIN CONTENT SEARCHBAR AND LIST STARTS HERE */}
            <Grid container item xs={12} spacing={6} className={classes.innerContent} >

              {/* SearchBar */}
              <SearchBar search={search} onChange={onChange}  handleDelete={handleDelete} data={data} />
              {/* SearchBar Ends ; Wrapper for List starts here*/}

              <Grid container item xs={12} className={clsx(classes.removePadding)}>
                <Grid item xs={12} md >
                  <ContactList  data={data} activeContact={activeContact} editable={editable} handleContactClick={handleContactClick} handleCheckedChange={handleCheckedChange} handleSelectAll={handleSelectAll} handleEdit={handleEdit} handleSave={handleSave} />
                </Grid>
                <Hidden smDown>
                  <Grid container item xs={12} md>
                    <DetailCard contact={activeContact} editable={editable} handleEdit={handleEdit} handleSave={handleSave} />
                  </Grid>
                </Hidden>
              </Grid>
            </Grid>
          </Grid>

        </Grid>
      </main>
    </div >
  );
}
