import React from 'react';
import axios from "axios";
import MyLoader from "./MyLoader";
import MyApiWrapper from './MyApiWrapper';
import { v4 as uuidv4 } from "uuid";

// const uri = "https://api.github.com/search/users?q=a&per_page=100";
// const uri = "https://api.covid19api.com/summary";
const uri = "https://corona.lmao.ninja/v2/countries";


let localData = {};
let error = {}

const Covid = ({ classes, handleDrawerOpen, open }) => {

    console.log("rendered Covid");
    const [loading, setLoading] = React.useState(true);
    const heading = {
        keyword: "Country",
        title: "Covid19Global",
        subtitle: "Covid19 Global stats",
        icon: "fa fa-bug fa-3x icon-gradient"
    };

    //Mentioning Rules Editable Fields to be displayed
    // let objRule = {
    //     Country: { fieldname: "Country", label: "Country", required: true, min: 3, max: 32, type: "title", error: "", placeholder: "New York" },
    //     CountryCode: { fieldname: "CountryCode", label: "Country Code", required: true, min: 2, max: 3, type: "text", error: "", placeholder: "XY", unique: true },
    //     NewConfirmed: { fieldname: "NewConfirmed", label: "New Confirmed", required: false, min: 1, max: 9, type: "number", error: "", placeholder: "99" },
    //     TotalConfirmed: { fieldname: "TotalConfirmed", label: "Total Confirmed", required: false, min: 1, max: 9, type: "number", error: "", placeholder: "99" },
    //     TotalDeaths: { fieldname: "TotalDeaths", label: "Total Deaths", required: false, min: 1, max: 9, type: "number", error: "", placeholder: "99" },
    //     TotalRecovered: { fieldname: "TotalRecovered", label: "Total Recovered", required: false, min: 1, max: 9, type: "number", error: "", placeholder: "99" },
    //     Date: { fieldname: "Date", label: "Last Update", required: false, min: 4, max: 50, type: "date", error: "", placeholder: "Date - Time", subtitle: true },

    //     // login: { fieldname: "login", label: "UserName", required: true, min: 6, max: 32, type: "title", error: "", placeholder: "ABC-123" },
    //     // id: { fieldname: "id", label: "User ID", required: true, min: 6, max: 36, type: "text", error: "", placeholder: "12345" },
    //     // html_url: { fieldname: "html_url", label: "Profile", required: false, min: 4, max: 50, type: "text", error: "", placeholder: "Someplace" },
    //     flag: { fieldname: "flag", label: "Image", required: false, min: 0, max: 1, type: "image", error: "" },
    // };

    let objRule = {
        country: { fieldname: "country", label: "Country", required: true, min: 2, max: 32, type: "title", error: "", placeholder: "Country Name" },
        iso2: { fieldname: "iso2", label: "Country Code", required: true, min: 2, max: 3, type: "text", error: "", placeholder: "IND", unique: true },
        cases: { fieldname: "cases", label: "Total Cases", required: false, min: 1, max: 9, type: "number", error: "", placeholder: "Total Cases" },
        active: { fieldname: "active", label: "Active Cases", required: false, min: 1, max: 9, type: "number", error: "", placeholder: "Active Cases" },
        deaths: { fieldname: "deaths", label: "Total Deaths", required: false, min: 1, max: 9, type: "number", error: "", placeholder: "Total Deaths" },
        recovered: { fieldname: "recovered", label: "Recovered", required: false, min: 1, max: 9, type: "number", error: "", placeholder: "Total Recovered" },
        todayCases: { fieldname: "todayCases", label: "Today Cases", required: false, min: 1, max: 9, type: "number", error: "", placeholder: "Today Cases" },
        todayDeaths: { fieldname: "todayDeaths", label: "Today Deaths", required: false, min: 1, max: 9, type: "number", error: "", placeholder: "Today Deaths" },
        updated: { fieldname: "updated", label: "Updated on", required: false, min: 4, max: 50, type: "date", error: "", placeholder: "DATE", subtitle: true },
        flag: { fieldname: "flag", label: "Image", required: false, min: 2, max: 32, type: "image", error: "", placeholder: "Set Image" }
    };

    async function fetchApiData(uri) {
        try {
            let data = [];
            const res = await axios.get(uri).then((response) => {
                return response;
            }).catch((e) => { console.log("Err occured :", e); error = e; });

            if (res && res.data) {
                data = res.data;
                data.forEach(country => {
                    let { iso2, flag } = country.countryInfo;
                    if (!country.id) { country.id = uuidv4(); }
                    country.checked = false;
                    country.iso2 = iso2;
                    country.flag = flag; // || "https://www.countryflags.io/" + country.CountryCode + "/shiny/64.png" || "";
                });
            }
            return data;
        } catch (e) { console.log("Err occured :", e); error = e; }
    }

    (async function () {
        try {
            const fetchData = await fetchApiData(uri);
            localData = fetchData;
            console.log("localData After Fetch:");
            console.log(localData);
            setLoading(false);
        } catch (e) { console.log("Err occured :", e); error = e; }
    })()

    return (loading) ?
        (<MyLoader heading={heading} open={open} handleDrawerOpen={handleDrawerOpen} />)
        : <MyApiWrapper apiData={localData} objRule={objRule} classes={classes} heading={heading} open={open} handleDrawerOpen={handleDrawerOpen} error={error} />;


};

export default Covid;
