import React, {lazy, Suspense} from "react";
import Grid from "@material-ui/core/Grid";
import Loading from "../components/Loading";

const MovieItem = lazy(() => import("../components/MovieItem"));
const renderLoader = () => <Loading />;

const MovieDetails = ({ match }) => {
    return (
        <React.Fragment>
            <Grid item xs={12} sm={12} md={12}>
            <h1>Popular</h1>
            </Grid>

            <Suspense fallback={renderLoader()}>
                <Grid item xs={12} sm={12} md={12}>
                    <MovieItem movieID={match.params.movieID} />
                </Grid>
            </Suspense>

        </React.Fragment>
    )
};
export default MovieDetails;