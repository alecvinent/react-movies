import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {useSelector} from "react-redux";
import MovieList from "../components/MovieList";


const Movies = () => {
    const {isLoading, error, message, movies} = useSelector(state => state.movies);

    return (
        <React.Fragment>


            <Grid item><h1>Popular</h1></Grid>
            <Grid container spacing={4}>
                {isLoading && (
                    <Grid item xs={12} sm={12} md={12}>
                        <Card>
                            <CardContent>
                                <h2>Loading</h2>
                            </CardContent>
                        </Card>
                    </Grid>
                )}
                {error && (
                    <Grid item xs={12} sm={12} md={12}>
                        <Card>
                            <CardContent>
                                <h2>Error: {message}</h2>
                            </CardContent>
                        </Card>
                    </Grid>
                )}
                {movies && (
                    <MovieList movies={movies} />
                )}
            </Grid>

        </React.Fragment>
    )
};
export default Movies;