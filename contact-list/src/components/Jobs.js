import React from "react";
import MyLoader from "./MyLoader";
import MainContent from './MainContent';
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

const Jobs = ({ classes, handleDrawerOpen, open }) => {
  console.log("rendered Jobs");
  const [loading, setLoading] = React.useState(false);
  const [localData, setLocalData] = React.useState([]);
  const [error, setError] = React.useState(null);
  const changeData = (records) => setLocalData([...records]);


  const heading = {
    keyword: "Job",
    title: "GraphQLjobs",
    subtitle: "Explore Jobs",
    icon: "fa fa-suitcase fa-3x icon-gradient"
  };

  //Mentioning Rules for Editable Fields to be displayed
  let objRule = {
    title: { fieldname: "title", label: "Job Title", required: true, min: 1, max: 32, type: "title", error: "", placeholder: "Job Title" },
    userEmail: { fieldname: "userEmail", label: "Email", required: true, min: 6, max: 100, type: "email", error: "", placeholder: "mail@xyz.com", unique: true },
    locationNames: { fieldname: "locationNames", label: "Location", required: false, min: 2, max: 32, type: "text", error: "", placeholder: "Some Place" },
    isFeatured: { fieldname: "isFeatured", label: "is Featured", required: false, min: 2, max: 5, type: "boolean", error: "", placeholder: "True/False" },
    applyUrl: { fieldname: "applyUrl", label: "ApplyLink", required: false, min: 4, max: 256, type: "text", error: "", placeholder: "https://www.joburl.com", subtitle: true },
    company: { fieldname: "company", label: "Company", required: false, min: 2, max: 32, type: "text", error: "", placeholder: "ZURU Tech pvt" },
    logoUrl: { fieldname: "logoUrl", label: "Image", required: false, min: 2, max: 32, type: "image", error: "", placeholder: "Set Image" }
  };

  async function fetchApiData(uri) {
    console.log("Fetching Jobs Data from: " + uri);
    setLoading(true);
    let data = [];
    try {
      const apolloFetch = createApolloFetch({ uri });
      await apolloFetch({ query }).then((res) => {
        if (res && res.data) {
          data = res.data.jobs;
          data.forEach(job => {
            job.checked = false;
            job.created = Date.now();
            job.company = job.company.name;
            job.logoUrl = job.company.logoUrl || "";
          });
        }
      }).catch((e) => { console.error("Err occured :", e); setError(e); });
    }
    catch (e) {
      console.error("Error occured :", e);
      setError(e);
    }
    setLocalData(data);
    setLoading(false);
  }

  React.useEffect(() => {
    fetchApiData(uri);
  }, []);

  return loading ? <MyLoader heading={heading} open={open} handleDrawerOpen={handleDrawerOpen} />
    : <MainContent localData={localData} setLocalData={changeData} error={error} objRule={objRule} heading={heading} classes={classes} open={open} handleDrawerOpen={handleDrawerOpen} />;
};

export default Jobs;
