import React from "react";
import MovieItem from "../components/MovieItem";
import Grid from "@material-ui/core/Grid";

const MovieDetails = ({ match }) => {
    return (
        <React.Fragment>
            <Grid item xs={12} sm={12} md={12}>
            <h1>Popular</h1>
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
                <MovieItem movieID={match.params.movieID} />
            </Grid>

        </React.Fragment>
    )
};
export default MovieDetails;