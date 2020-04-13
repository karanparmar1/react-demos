import React from "react";
import MyLoader from "./MyLoader";
import MyApiWrapper from './MyApiWrapper';
import { createApolloFetch } from "apollo-fetch";


const query = `{
  countries{
    name
    info{
      flag
    }
    cases
    active
    critical
    deaths
    recovered
    todayCases
    todayDeaths
    updated
  }
}`;
const uri = "http://covid.quintero.io/";

let localData = {};
let error = {}

const Jobs = ({ classes, handleDrawerOpen, open }) => {
  console.log("rendered Jobs");
  const [loading, setLoading] = React.useState(true);

  const heading = {
    keyword: "Job",
    title: "graphQLjobs",
    subtitle: "Explore Jobs",
    icon: "fa fa-suitcase fa-3x icon-gradient"
  };

  

  //Mentioning Rules Editable Fields to be displayed
  let objRule = {
    name: { fieldname: "namd", label: "Country", required: true, min: 2, max: 32, type: "title", error: "", placeholder: "Country Name" },
    iso2: { fieldname: "iso2", label: "CodeName", required: true, min: 2, max: 3, type: "text", error: "", placeholder: "IND", unique: true },
    cases: { fieldname: "cases", label: "Total Cases", required: false, min: 1, max: 9, type: "number", error: "", placeholder: "Total Cases" },
    active: { fieldname: "active", label: "Active Cases", required: false, min: 1, max: 9, type: "number", error: "", placeholder: "Active Cases" },
    deaths: { fieldname: "deaths", label: "Total Deaths", required: false, min: 1, max: 9, type: "number", error: "", placeholder: "Total Deaths" },
    recovered: { fieldname: "recovered", label: "Recovered", required: false, min: 1, max: 9, type: "number", error: "", placeholder: "Total Recovered" },
    todayCases: { fieldname: "todayCases", label: "Today Cases", required: false, min: 1, max: 9, type: "number", error: "", placeholder: "Today Cases" },
    todayDeaths: { fieldname: "todayDeaths", label: "Today Deaths", required: false, min: 1, max: 9, type: "number", error: "", placeholder: "Today Deaths" },
    updated: { fieldname: "updated", label: "Updated on", required: false, min: 4, max: 50, type: "date", error: "", placeholder: "DATE", subtitle:true },
    flag: { fieldname: "flag", label: "Image", required: false, min: 2, max: 32, type: "image", error: "", placeholder: "Set Image" }
  };


  //Mentioning Rules Editable Fields to be displayed
  // let objRule = {
  //   mission_name: { fieldname: "mission_name", label: "Mission Name", required: true, min: 1, max: 32, type: "title", error: "", placeholder: "Mission Name" },
  //   id: { fieldname: "id", label: "job id", required: true, min: 6, max: 36, type: "text", error: "", placeholder: "XXX-XXX" },
  //   rocket: { fieldname: "rocket", label: "Rocket", required: false, min: 4, max: 20, type: "text", error: "", placeholder: "Rocket Name" },
  //   job_success: { fieldname: "job_success", label: "Success Status", required: false, min: 3, max: 5, type: "text", error: "", placeholder: "true" },
  //   job_year: { fieldname: "job_year", label: "job Year", required: false, min: 4, max: 4, type: "text", error: "", placeholder: "2020" },
  //   job_site: { fieldname: "job_site", label: "job Site", required: false, min: 3, max: 50, type: "text", error: "", placeholder: "Someplace" },
  //   links: { fieldname: "links", label: "Image", required: false, min: 0, max: 1, type: "image", error: "" },
  // };


  async function fetchApiData(uri) {
    try {
      let data = [];
      const apolloFetch = createApolloFetch({ uri });
      const res = await apolloFetch({ query })
      if (res && res.data) {
        data = res.data.countrys;
        data.forEach(country => {
          country.checked = false;
          country.iso2=country.info.iso2;
          country.flag = country.info.flag || "";
        });
      }
      return data;
    } catch (e) { console.error("Err occured :", e); error = e; }
  }

  (async function () {
    try {
      const fetchData = await fetchApiData(uri);
      localData = fetchData;
      console.log("localData After Fetch:");
      console.log(localData);
      setLoading(false);
    } catch (e) { console.error("Err occured :", e); error = e; }
  })()

  return (loading) ? <MyLoader heading={heading} open={open} handleDrawerOpen={handleDrawerOpen} />
    : <MyApiWrapper apiData={localData} objRule={objRule} classes={classes} open={open} handleDrawerOpen={handleDrawerOpen} heading={heading} error={error} />;
};

export default Jobs;
