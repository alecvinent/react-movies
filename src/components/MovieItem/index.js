import React, {useEffect, useState} from 'react';
import CardMedia from "@material-ui/core/CardMedia";
import {MOVIE_API_IMG_URL, MOVIE_API_MOVIE_RATING_GUEST} from "../../shared/baseUrl";
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
import {parseVote2Post, useStyles} from "../Utils";
import Loading from "../Loading";
import SimpleRating from "../Rating";
import {GetUserdata, isAuthenticated} from "../../services/auth/authentication";
import fetch from "cross-fetch";
import Alert from "@material-ui/lab/Alert";
import LazyLoad from 'react-lazyload';


const RateForm = ({movie}) => {
        const isLogin = isAuthenticated();
        const user = GetUserdata();
        const [loading, setLoading] = useState(false)
        const [error, setError] = useState(null);
        const [message, setMessage] = useState(null);
        const [currentRate, setCurrentRating] = React.useState(2);

        let url = MOVIE_API_MOVIE_RATING_GUEST.replace('{movie_id}', movie.id);
        url += '&guest_session_id=' + user.guest_session_id;

        const handleChange = (event) => {
            setCurrentRating(event.target.value);
        };

        const handleVote = () => {

            try {
                setLoading(true);
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({
                        value: currentRate,
                    }),
                    json: true
                })
                    .then(response => {
                        if (response.ok) {
                            return response;
                        }
                        throw response;
                    })
                    .then(response => response.json())
                    .then(data => {
                        setMessage(data.status_message);
                    })
                    .catch(error => {
                        console.log('create session error:', error)
                        setError(error.message);
                        setMessage(error.message);
                    })
                    .finally(() => setLoading(false))
            } catch (error) {
                console.log(error);
            }
        };

        return (
            <>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <p><strong>¿Qué opinas? Da tu voto aquí</strong></p>
                        {isLogin && (
                            <>
                                <SimpleRating handleChange={handleChange} isReadOnly={false} key={movie.id}
                                              rate={parseVote2Post(currentRate)}/>
                                <Button variant="contained" color="primary" size="small" onClick={handleVote}
                                        disabled={loading}>
                                    Enviar voto
                                </Button>
                            </>
                        )}
                        {!isLogin && (
                            <Alert severity="info">Se requiere iniciar sesión para realizar comentarios</Alert>
                        )}
                    </Grid>
                    {loading && (
                        <Grid item xs={6}>
                            <Loading/>
                        </Grid>
                    )}
                    {!loading && message && (
                        <Grid item xs={6}>
                            <Typography component="div">
                                <Alert severity={error ? "error" : "success"}>{message}</Alert>
                            </Typography>
                        </Grid>
                    )}
                </Grid>


            </>
        );
    }
;

const MovieItem = ({movieID}) => {
        const classes = useStyles();

        const [movie, setMovie] = useState(null);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);
        const [message, setMessage] = useState(null);

        const {movies} = useSelector(state => state.movies);

        const isLogin = isAuthenticated();

        useEffect(() => {
            setLoading(true);
            var filtered = movies.find(m => m.id === parseInt(movieID));
            if (filtered) {
                setMovie(filtered);
                setError(false);
            } else {
                setError(true);
                setMessage('No se pueden cargar los datos de la película.');
            }
            setLoading(false);
        }, [movies, movieID]);

        return (
            <React.Fragment>
                <Grid item xs={12} sm={12} md={12}>
                    <Card className={classes.card}>
                        {movie && (
                            <LazyLoad height={200}>
                            <CardMedia
                                className={classes.cardMedia}
                                image={MOVIE_API_IMG_URL + movie.poster_path}
                                title={movie.title}
                            />
                            </LazyLoad>
                        )}
                        <CardContent className={classes.cardContent}>
                            {loading && (
                                <Typography gutterBottom variant="h5" component="h2">
                                    <Loading/>
                                </Typography>
                            )}
                            {error && (
                                <React.Fragment>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Error
                                    </Typography>
                                    <Typography component="p">
                                        <Alert severity="error">{message}</Alert>
                                    </Typography>
                                </React.Fragment>
                            )}
                            {movie && (
                                <React.Fragment>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {movie.title} ({new Date(movie.release_date).getFullYear()})
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
                        {isLogin && movie && (
                            <CardActions>
                                <RateForm movie={movie}/>
                            </CardActions>
                        )}
                    </Card>

                </Grid>
                {movie && (
                    <ReviewList movie={movie}/>
                )}
            </React.Fragment>
        );
    }
;

export default MovieItem