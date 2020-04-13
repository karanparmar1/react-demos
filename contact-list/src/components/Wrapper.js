import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import { useTheme } from "@material-ui/core/styles";
import CommonStyle from "./CommonStyle";
import { IconButton, AppBar, Toolbar } from "@material-ui/core";
import clsx from "clsx";
import { ClearAllRounded } from "@material-ui/icons";
import SideDrawer from "./SideDrawer";
import MyContacts from "./MyContacts";
import GraphqlData from "../data/GraphqlData";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Jobs from "./Jobs";
import Covid from "./Covid";
import CovidGQL from './CovidGQL';

// const client = new ApolloClient({
//     uri: "https://api.spacex.land/graphql/"
// });

const Wrapper = () => {

    const theme = useTheme();
    const classes = CommonStyle(theme);

    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => setOpen(true);

    const handleDrawerClose = () => setOpen(false);

    const handleDrawerToggle = () => setOpen(!open);

    return (
        <div className={classes.root}>
            <Router>
                {/* <CssBaseline /> */}
                <SideDrawer open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
                <Switch>

                    <Route exact path={["/", "/contact-app"]} >
                        <MyContacts classes={classes} open={open} handleDrawerOpen={handleDrawerToggle} />
                    </Route>

                    <Route exact path="/contact-app/jobs" >
                        {/* <ApolloProvider client={client}>
                            <GraphqlData classes={classes} open={open} limit={10}/>
                        </ApolloProvider> */}
                        <Jobs classes={classes} open={open} handleDrawerOpen={handleDrawerToggle} />
                    </Route>
                    <Route exact path="/contact-app/covid19" >
                        <Covid classes={classes} open={open} handleDrawerOpen={handleDrawerToggle} />
                    </Route>

                    {/* <Route exact path="/contact-app/covid19" >
                        <CovidGQL classes={classes} open={open} handleDrawerOpen={handleDrawerToggle} />
                    </Route> */}
                </Switch>




            </Router>
        </div>
    )
};

export default Wrapper;
