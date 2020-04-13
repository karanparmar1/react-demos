import React from "react";
import MyLoader from "./MyLoader";
import MyApiWrapper from './MyApiWrapper';
import { createApolloFetch } from "apollo-fetch";

const query = `{
    jobs {
      id
      title
      userEmail
      postedAt
      locationNames
      isFeatured
      applyUrl
      company{
        name
        logoUrl
      }
    }
}`;
const uri = "https://api.graphql.jobs/";

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

  //Mentioning Rules for Editable Fields to be displayed
  let objRule = {
    title: { fieldname: "title", label: "Job Title", required: true, min: 1, max: 32, type: "title", error: "", placeholder: "Job Title" },
    userEmail: { fieldname: "userEmail", label: "Email", required: true, min: 6, max: 100, type: "email", error: "", placeholder: "mail@xyz.com", unique: true },
    locationNames: { fieldname: "locationNames", label: "Location", required: false, min: 2, max: 32, type: "text", error: "", placeholder: "Some Place" },
    isFeatured: { fieldname: "isFeatured", label: "is Featured", required: false, min: 2, max: 5, type: "boolean", error: "", placeholder: "True/False" },
    applyUrl: { fieldname: "applyUrl", label: "ApplyLink", required: false, min: 4, max: 5, type: "text", error: "", placeholder: "https://www.joburl.com", subtitle: true },
    company: { fieldname: "company", label: "Company", required: false, min: 2, max: 32, type: "text", error: "", placeholder: "ZURU Tech pvt" },
    logoUrl: { fieldname: "logoUrl", label: "Image", required: false, min: 2, max: 32, type: "image", error: "", placeholder: "Set Image" }
  };


  async function fetchApiData(uri) {
    try {
      let data = [];
      const apolloFetch = createApolloFetch({ uri });
      const res = await apolloFetch({ query })
      if (res && res.data) {
        data = res.data.jobs;
        data.forEach(job => {
          job.checked = false;
          job.company = job.company.name;
          job.logoUrl = job.company.logoUrl || "";
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
