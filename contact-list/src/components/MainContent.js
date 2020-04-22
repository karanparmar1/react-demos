import React from 'react';
import { Grid, Hidden } from "@material-ui/core";
import clsx from "clsx";
import Header from "./Header";
import ActionBar from "./ActionBar";
import ContactList from "./ContactList";
import DetailCard from './DetailCard';

const MainContent = ({ classes, handleDrawerOpen, open, heading, localData, setLocalData, objRule = {}, error }) => {

    console.log("Rendered MainContent with LocalData:", localData);
    const [data, setData] = React.useState(localData);
    const [editable, setEditable] = React.useState(false);
    const [activeContact, setActiveContact] = React.useState({});
    const [search, setSearch] = React.useState("");
    const [page, setPage] = React.useState(1);
    const handlePageChange = (value) => { setPage(value); }
    const [wannaCreateNew, setWannaCreateNew] = React.useState(false);
    let titleField = {}, uniqueField = {}, imgField = {}, descriptionField = {};
    Object.entries(objRule).map((keyvalue) => {
        const { type } = keyvalue[1];
        if (type === "image") { imgField = keyvalue[1] }
        if (type === "title") { titleField = keyvalue[1] }
        if (keyvalue[1].subtitle) { descriptionField = keyvalue[1] }
        if (keyvalue[1].unique) { uniqueField = keyvalue[1] }
    });
    const setActive = (contact) => setActiveContact(contact);

    const handleEdit = (editable = true) => setEditable(editable);

    const handleCheckedChange = (changedContact) => {
        let temp = data;
        temp.forEach(item => {
            item.checked = (item.id === changedContact.id) ? !changedContact.checked : item.checked;
        });
        // someSelected = data.some(item => item.checked);
        setData([...temp]);

    };

    const handleSelectAll = (selectAll) => {
        let temp = data;
        temp.forEach(contact => {
            contact.checked = selectAll
        })
        setData([...temp]);
    };

    const handleDelete = () => {
        localData = localData.filter(item => !item.checked);
        setLocalData([...localData]);
        setData([...localData]);
        if (activeContact.checked) { setActiveContact({}) }
        setSearch("");
        console.log(data.length);
    };

    const handleAdd = (status = true) => {
        setPage(1);
        setActiveContact({});
        handleSelectAll(false);
        setSearch("");
        filterData("");
        handleEdit(false);
        setWannaCreateNew(status);
    };

    const addNewContact = (contact) => {
        // localData.push(contact);
        localData.splice(0, 0, contact)
        setLocalData([...localData]);
        setData([...localData]);
        setWannaCreateNew(false);
        setActiveContact(contact);

    };

    const handleContactClick = (clickedContact) => {
        setActiveContact(clickedContact);
        setEditable((editable) ? clickedContact.id === activeContact.id : false);
    };

    const handleUpdate = (updatedContact) => {
        localData.forEach((item, index) => {
            if (item.id === updatedContact.id) {
                localData[index] = updatedContact;
            }
        });
        setLocalData([...localData]);
        setData([...localData]);
        filterData(search);
        setActiveContact(updatedContact);

    };

    /*SEARCH FUNCTION*/
    const searchFilter = (search) => item => item[titleField.fieldname].toLowerCase().includes(search.toLowerCase());
    const filterData = (value) => { setData([...localData.filter(searchFilter(value))]); }
    const [searchError, setSearchError] = React.useState("");
    let timeoutId = searchError;
    const onChange = (e) => {
        setActiveContact({});
        filterData(e.target.value);
        setSearch(e.target.value);
        setPage(1);
        if (e.target.value.length > titleField.max) {
            if (timeoutId) clearTimeout(timeoutId);
            setSearchError("You can Enter Max " + titleField.max + " Character");
            timeoutId = setTimeout(() => {
                setSearchError("");
            }, 2000);
        }
    }

    return (
        <>
            <Header heading={heading} open={open} handleDrawerOpen={handleDrawerOpen} />

            <main className={clsx(classes.content, { [classes.absoluteAtSmall]: open })}>
                <div className={classes.toolbar} />
                <Grid container spacing={5}>

                    {error ? <Grid item xs={12} style={{ color: "red", background: "lightgrey", margin: "20px auto", fontSize: "200%", border: '1px solid red' }}>{error.name + " : " + error.message}</Grid>
                        :
                        <Grid container item xs={12} justify="center">
                            {/* MAIN CONTENT SEARCHBAR AND LIST STARTS HERE */}
                            <Grid container item xs={12} spacing={6} className={classes.innerContent} >

                                {/* ActioBar : SearchBar and Buttons*/}
                                <ActionBar data={data} search={search} error={searchError} onChange={onChange} setActive={setActive} filterData={filterData} handleDelete={handleDelete} handleAdd={handleAdd}
                                    wannaCreateNew={wannaCreateNew} keyword={heading.keyword} />
                                {/* ActionBar Ends ; Wrapper for List starts here*/}

                                <Grid container item xs={12} className={classes.removePadding}>
                                    <Grid item xs={12} lg >
                                        <ContactList data={data} page={page} setPage={handlePageChange} totalRecords={localData.length} objRule={objRule} activeContact={activeContact} editable={editable} setActive={setActive}
                                            handleContactClick={handleContactClick} handleCheckedChange={handleCheckedChange}
                                            titleField={titleField} imgField={imgField} uniqueField={uniqueField} descriptionField={descriptionField}
                                            handleSelectAll={handleSelectAll} handleAdd={handleAdd} handleEdit={handleEdit} handleUpdate={handleUpdate}
                                            wannaCreateNew={wannaCreateNew} addNewContact={addNewContact} keyword={heading.keyword}
                                        />
                                    </Grid>
                                    <Hidden mdDown>
                                        <Grid container item xs={12} lg style={{ height: "fit-content" }}>
                                            <DetailCard contact={activeContact} objRule={objRule} data={data}
                                                titleField={titleField} imgField={imgField} uniqueField={uniqueField} descriptionField={descriptionField}
                                                setActive={setActive} editable={editable} handleEdit={handleEdit} handleUpdate={handleUpdate} keyword={heading.keyword}
                                            />
                                        </Grid>
                                    </Hidden>
                                </Grid>
                            </Grid>
                        </Grid>}

                </Grid>
            </main>

        </>
    );
}

export default MainContent;
