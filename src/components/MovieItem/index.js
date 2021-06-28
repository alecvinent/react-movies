import React, {useEffect, useState} from 'react';
import CardMedia from "@material-ui/core/CardMedia";
import {IMG_URL} from "../../shared/baseUrl";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import {Link} from "react-router-dom";
import base_routes from "../../shared/routes";
import Grid from "@material-ui/core/Grid";
import ReviewList from "../ReviewList";
import {useSelector} from "react-redux";
import HomeIcon from '@material-ui/icons/Home';
import {useStyles} from "../Utils";


const MovieItem = ({movieID}) => {
    const classes = useStyles();

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const {movies} = useSelector(state => state.movies);

    useEffect(() => {
        setLoading(true);
        var filtered = movies.filter(m => m.id === parseInt(movieID));
        if (filtered.length > 0) {
            setMovie(filtered[0]);
            setError(false);
        } else {
            setError(true);
            setMessage('No se ha podido encontrar el registro.');
        }
        setLoading(false);
    }, [movies, movieID]);

    return (
        <React.Fragment>
            <Grid item xs={12} sm={12} md={12}>
                <Card className={classes.card}>
                    {movie && (
                        <CardMedia
                            className={classes.cardMedia}
                            image={IMG_URL + movie.poster_path}
                            title={movie.title}
                        />
                    )}
                    <CardContent className={classes.cardContent}>
                        {loading && (
                            <Typography gutterBottom variant="h5" component="h2">
                                Loading
                            </Typography>
                        )}
                        {error && (
                            <React.Fragment>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Error
                                </Typography>
                                <Typography component="p">
                                    {message}
                                </Typography>
                            </React.Fragment>
                        )}
                        {movie && (
                            <React.Fragment>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {movie.title}
                                </Typography>
                                <Typography component="p">
                                    <strong>Year</strong>: {new Date(movie.release_date).getFullYear()}
                                </Typography>
                                <Typography>
                                    {movie.overview}
                                </Typography>
                            </React.Fragment>
                        )}

                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary" startIcon={<HomeIcon/>}>
                            <Link to={base_routes.home} title="Ir al principio">Ir al principio</Link>
                        </Button>
                    </CardActions>
                </Card>

            </Grid>
            {movie && (
                <ReviewList movie={movie}/>
            )}
        </React.Fragment>
    );
};

export default MovieItem