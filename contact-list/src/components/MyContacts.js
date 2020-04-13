import React from 'react';
import MainContent from "./MainContent";
import LocalData from "../data/LocalData";

let localData = LocalData();

const MyContacts = ({ classes, handleDrawerOpen, open }) => {
    console.log("Rendered MyContacts.");
    const setLocalData = (records) => localData = [...records];
    const [data, setData] = React.useState(localData);
    const changeData = (records) => setData([...records]);

    const heading = {
        keyword: "Contact",
        title: "Contacts",
        subtitle: "Welcome to InstaConnect",
        icon: "fa fa-address-book fa-flip-horizontal fa-3x icon-gradient"
    };

    //Mentioning Rules Editable Fields to be displayed
    let objRule = {
        fullname: { fieldname: "fullname", label: "Full Name", required: true, min: 1, max: 32, type: "title", error: "", placeholder: "Bruce Wayne" },
        email: { fieldname: "email", label: "Email", required: true, min: 6, max: 100, type: "email", error: "", placeholder: "abc@xyz.com", unique: true },
        phone: { fieldname: "phone", label: "Phone", required: true, min: 10, max: 14, type: "phone", error: "", placeholder: "+91 1234567890" },
        company: { fieldname: "company", label: "Company", required: false, min: 2, max: 32, type: "text", error: "", placeholder: "Zuru pvt ltd" },
        about: { fieldname: "about", label: "About", required: false, min: 2, max: 100, type: "text", error: "", placeholder: "Something relevant", subtitle: true },
        address: { fieldname: "address", label: "Address", required: false, min: 4, max: 50, type: "text", error: "", placeholder: "Someplace" },
        image: { fieldname: "image", label: "Image", required: false, min: 0, max: 1, type: "image", error: "" },

    };


    return (
        <>
            <MainContent
                classes={classes}
                localData={localData}
                setLocalData={setLocalData}
                data={data}
                setData={changeData}
                objRule={objRule}
                open={open}
                handleDrawerOpen={handleDrawerOpen}
                heading={heading} />

        </>
    );
};

export default MyContacts;
