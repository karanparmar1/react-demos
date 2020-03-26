import React from 'react';
import MyLoader from "../components/MyLoader";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import SpaceX from "../components/SpaceX";

// let gqlData = {};

// const GraphqlData = (limit) => {
//     getData();
//     console.log("from GraphqlData-gqlData:");
//     console.log(gqlData);
//     return gqlData;
// }

const GraphqlData = ({ limit = 10, classes }) => {
    return (
        <Query query={gql`
        {
            launches(limit: ${limit}) {
                id
                mission_name
                details
                launch_success
                rocket {
                    rocket_name
                }
                links {
                flickr_images
                }  
            }
        }
        `}
        >
            {({ loading, error, data }) => {
                if (loading) return <div  style={{transform:"scale(1.7) translateX(22%) translateY(22%)"}}><br /><br /><br /><MyLoader /></div>;
                if (error) return <p><br />=><br /><br />Error : {error.message}</p>;
                return <SpaceX data={data.launches} classes={classes} />;
            }
            }
        </Query>
    );
};

export default GraphqlData;


