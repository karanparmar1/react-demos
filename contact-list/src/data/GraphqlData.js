import React from 'react';
import MyLoader from "../components/MyLoader";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Jobs from "../components/Jobs";
import { createApolloFetch } from 'apollo-fetch';

// launches(limit: ${limit}) {
//     id
//     mission_name
//     details
//     launch_success
//     rocket {
//         rocket_name
//     }
//     links {
//     flickr_images
//     }  
// }
let localData = {}, errorObj = {};

const GraphqlData = (uri, query) => {

    const apolloFetch = createApolloFetch({ uri });
    // handleLoading(false);

    apolloFetch({ query })
        .then(res => {
            localData = res.data.ships;
        })
        .then(
            localData.forEach(element => {
                element.checked = false;
            }))
        .then(() => {
            console.log("GOT localData :");
            console.log(localData);
            return localData;
            // setData(res.data.ships);
        })
        .catch(error => { console.error(error); errorObj = error; return errorObj; });
};

// const GraphqlData = ({ limit = 10, classes, open }) => {
//     const setLocalData = (records) => localData = [...records];
//     const [state, setState] = React.useState(localData);
//     const changeData = (records) => setState([...records]);
//     return (
//         <Query query={gql`
//         {
//             ships {
//                 id
//                 name
//                 type
//                 active
//                 home_port
//                 image
//               }
//         }
//         `}
//         >
//             {({ loading, error, data }) => {
//                 if (loading) return <div style={{ transform: "scale(1.7) translateX(22%) translateY(22%)" }}><br /><br /><br /><MyLoader /></div>;
//                 if (error) return <p><br />=><br /><br />Error : {error.message}</p>;

//                 return <SpaceX
//                     localData={data.ships}
//                     setLocalData={setLocalData}
//                     data={state}
//                     setData={changeData}
//                     setData={changeData} classes={classes} open={open} />;

//             }
//             }
//         </Query>
//     );
// };




export default GraphqlData;


