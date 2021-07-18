import React, {lazy, Suspense} from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {useSelector} from "react-redux";
import Loading from "../components/Loading";
import Alert from "@material-ui/lab/Alert";

const MovieList = lazy(() => import("../components/MovieList"));

const renderLoader = () => <Loading />;

const Movies = () => {
    const {isLoading, error, message, movies} = useSelector(state => state.movies);

    return (
        <Suspense fallback={renderLoader()}>
            <Grid item><h1>Popular</h1></Grid>
            <Grid container spacing={2}>
                {isLoading && (
                    <Grid item xs={12} sm={12} md={12}>
                        <Card>
                            <CardContent>
                                <Loading/>
                            </CardContent>
                        </Card>
                    </Grid>
                )}
                {error && (
                    <Grid item xs={12} sm={12} md={12}>
                        <Card>
                            <CardContent>
                                <h2>Error</h2>
                                <Alert severity="error">{message}</Alert>
                            </CardContent>
                        </Card>
                    </Grid>
                )}
                {movies && (
                    <MovieList movies={movies}/>
                )}
            </Grid>

        </Suspense>
    )
};

export default Movies;