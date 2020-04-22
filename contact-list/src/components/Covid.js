import React from 'react';
import axios from "axios";
import MyLoader from "./MyLoader";
import MainContent from './MainContent';
import { v4 as uuidv4 } from "uuid";

// const uri = "https://api.github.com/search/users?q=a&per_page=100";
// const uri = "https://api.covid19api.com/summary";
const uri = "https://corona.lmao.ninja/v2/countries";

const Covid = ({ classes, handleDrawerOpen, open }) => {

    console.log("rendered Covid");
    const [loading, setLoading] = React.useState(false);
    const [localData, setLocalData] = React.useState([]);
    const [error, setError] = React.useState(null);
    const changeData = (records) => setLocalData([...records]);

    const heading = {
        keyword: "Country",
        title: "Covid19Global",
        subtitle: "Covid19 Global stats",
        icon: "fa fa-bug fa-3x icon-gradient"
    };

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
        console.log("Fetching Covid Data from: " + uri);
        setLoading(true);
        let data = [];
        await axios.get(uri)
            .then((res) => {
                if (res && res.data) {
                    data = res.data;
                    data.forEach(country => {
                        let { iso2, flag } = country.countryInfo;
                        if (!country.id) { country.id = uuidv4(); }
                        country.created = Date.now();
                        country.checked = false;
                        country.iso2 = iso2;
                        country.flag = flag;
                    });
                }
            })
            .catch((e) => { console.error("Error occured :", e); setError(e); });

        setLocalData(data);
        setLoading(false);
    }


    React.useEffect(() => {
        fetchApiData(uri);
    }, []);

    return loading ? <MyLoader heading={heading} open={open} handleDrawerOpen={handleDrawerOpen} />
        : <MainContent localData={localData} setLocalData={changeData} error={error} objRule={objRule} heading={heading} classes={classes} open={open} handleDrawerOpen={handleDrawerOpen} />;

};

export default Covid;
