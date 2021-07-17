import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {Redirect, Route, Switch} from "react-router-dom";
import base_routes from "../shared/routes";
import Movies from "../pages/movies";
import MovieDetails from "../pages/moviedetails";
import SignIn from "../components/LoginForm";
import React from "react";

const TheContent = () => {
    return (
        <Container maxWidth="md" component="main">
            <Grid container spacing={2} alignItems="flex-end">
                <Switch>
                    <Route exact path={base_routes.home} component={Movies}></Route>
                    <Route path={base_routes.movie} component={MovieDetails}></Route>
                    <Route path={base_routes.auth.login} component={SignIn}></Route>
                    <Redirect from='*' to={base_routes.home}/>
                </Switch>
            </Grid>
        </Container>
    );
}

export default TheContent;