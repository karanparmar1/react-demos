import React from "react";
import clsx from "clsx";
import "font-awesome/css/font-awesome.min.css"
import { useTheme } from "@material-ui/core/styles";
import {
  Backdrop, IconButton, Grid, Hidden, AppBar, Toolbar, Typography
} from "@material-ui/core";

import { ClearAllRounded } from "@material-ui/icons";
import LocalData from "../data/LocalData";
import Header from "./Header";
import DetailCard from "./DetailCard";
import ContactList from "./ContactList";
import SearchBar from "./SearchBar";
import SideDrawer from "./SideDrawer";
import CommonStyle from "./CommonStyle";

let localData = LocalData();

export default function Wrapper() {

  const theme = useTheme();
  const classes = CommonStyle(theme);

  const [open, setOpen] = React.useState(false);
  const [editable, setEditable] = React.useState(false);
  const [activeContact, setActiveContact] = React.useState({});
  const [data, setData] = React.useState(localData);
  const [search, setSearch] = React.useState("");
  const [wannaCreateNew, setWannaCreateNew] = React.useState(false);
  const searchFilter = search => item => item.fullname.toLowerCase().includes(search.toLowerCase())

  const handleDrawerOpen = () => setOpen(true);

  const handleDrawerClose = () => setOpen(false);

  const setActive = (contact) => setActiveContact(contact);

  const handleEdit = (editable = true) => setEditable(editable);

  const handleCheckedChange = (changedContact) => {
    let temp = data;
    temp.forEach(item => {
      item.checked = (item.id === changedContact.id) ? !changedContact.checked : item.checked;
    });
    setData([...temp]);
  }

  const handleSelectAll = (selectAll) => {
    let temp = data;
    temp.forEach(contact => {
      contact.checked = selectAll
    })
    setData([...temp]);
  };

  const handleDelete = () => {
    localData = localData.filter(item => !item.checked);
    setData([...localData]);
    if (activeContact.checked) { setActiveContact({}) }
    setSearch("");
  }

  const handleAdd = (status = true) => {
    setActiveContact({});
    handleSelectAll(false);
    setSearch("");
    filterData("");
    setWannaCreateNew(status);
  }

  const addNewContact = (contact) => {
    localData.push(contact);
    setData([...localData]);
    setWannaCreateNew(false);
    setActiveContact(contact);
  }

  const handleContactClick = (clickedContact) => {
    setActiveContact(clickedContact);
    setEditable((editable) ? clickedContact.id === activeContact.id : false);
  }

  const filterData = (value) => {
    setData([...localData.filter(searchFilter(value))]);
  }

  const onChange = (e) => {
    setActiveContact({});
    filterData(e.target.value);
    setSearch(e.target.value);
  }

  const handleUpdate = (updatedContact) => {
    localData.forEach((item, index) => {
      if (item.id === updatedContact.id) {
        localData[index] = updatedContact;
      }
    });
    setData([...localData]);
    setActiveContact(updatedContact);

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
        <Grid container spacing={5}>
         
          <Header title="Contacts" subtitle=" Welcome to InstaConnect" classes={classes} iconClass="fa fa-address-book fa-flip-horizontal fa-3x icon-gradient" />
         
          <Grid container item xs={12} justify="center">
            {/* MAIN CONTENT SEARCHBAR AND LIST STARTS HERE */}
            <Grid container item xs={12} spacing={6} className={classes.innerContent} >

              {/* SearchBar */}
              <SearchBar data={data} search={search} onChange={onChange} handleDelete={handleDelete} handleAdd={handleAdd} wannaCreateNew={wannaCreateNew} />
              {/* SearchBar Ends ; Wrapper for List starts here*/}

              <Grid container item xs={12} className={clsx(classes.removePadding)}>
                <Grid item xs={12} lg >

                  <ContactList data={data} activeContact={activeContact} editable={editable} setActive={setActive}
                    handleContactClick={handleContactClick} handleCheckedChange={handleCheckedChange}
                    handleSelectAll={handleSelectAll} handleAdd={handleAdd} handleEdit={handleEdit} handleUpdate={handleUpdate}
                    wannaCreateNew={wannaCreateNew} addNewContact={addNewContact}
                  />
                </Grid>
                <Hidden mdDown>
                  <Grid container item xs={12} lg>

                    <DetailCard contact={activeContact} setActive={setActive} editable={editable} handleEdit={handleEdit} handleUpdate={handleUpdate}
                    />
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
