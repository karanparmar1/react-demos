import React from "react";
import MyLoader from "./MyLoader";
import MyApiWrapper from './MyApiWrapper';
import { createApolloFetch } from "apollo-fetch";

// const query = `{
//   jobes {
//     id
//     mission_name
//     rocket {
//       rocket_name
//     }
//     job_success 
//     job_year
//     job_site {
//       site_name
//     }
//     links {
//       flickr_images
//     }
//   }
// }`;

// const uri = "https://api.spacex.land/graphql/";

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

  //Mentioning Rules Editable Fields to be displayed
  let objRule = {
    title: { fieldname: "title", label: "Job Title", required: true, min: 1, max: 32, type: "title", error: "", placeholder: "Job Title" },
    userEmail: { fieldname: "userEmail", label: "Email", required: true, min: 6, max: 100, type: "email", error: "", placeholder: "mail@xyz.com", unique: true },
    locationNames: { fieldname: "locationNames", label: "Location", required: false, min: 2, max: 32, type: "text", error: "", placeholder: "Some Place" },
    isFeatured: { fieldname: "isFeatured", label: "is Featured", required: false, min: 2, max: 5, type: "boolean", error: "", placeholder: "True/False" },
    applyUrl: { fieldname: "applyUrl", label: "ApplyLink", required: false, min: 4, max: 5, type: "description", error: "", placeholder: "https://www.joburl.com" },
    company: { fieldname: "company", label: "Company", required: false, min: 2, max: 32, type: "text", error: "", placeholder: "ZURU Tech pvt" },
    logoUrl: { fieldname: "logoUrl", label: "Image", required: false, min: 2, max: 32, type: "image", error: "", placeholder: "Set Image" }
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

  return (loading) ? (<div style={{ transform: "scale(1.7) translateX(22%) translateY(22%)" }}><br /><br /><br /><MyLoader /></div>)
    : <MyApiWrapper apiData={localData} objRule={objRule} classes={classes} open={open} handleDrawerOpen={handleDrawerOpen} heading={heading} error={error} />;
};

export default Jobs;
