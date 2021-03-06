import React from 'react';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import InfoIcon from '@material-ui/icons/Info';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import {MOVIE_API_IMG_URL} from "../../shared/baseUrl";
import {parseVote, useStyles} from "../Utils";
import SimpleRating from "../Rating";
import LazyLoad from 'react-lazyload';

const MovieList = ({movies}) => {
    const classes = useStyles();

    const listado =
        movies.map((movie) => (
            <Grid item key={movie.title} xs={12} sm={6} md={6}>
                <Card className={classes.card}>
                    <Link to={"/movies/" + movie.id} title="Detalles">
                        <LazyLoad height={200}>
                            <CardMedia
                                className={classes.cardMedia}
                                image={MOVIE_API_IMG_URL + movie.poster_path}
                                title={movie.title}
                            />
                        </LazyLoad>
                    </Link>
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {movie.title} ({new Date(movie.release_date).getFullYear()})
                        </Typography>
                        <Typography>
                            {movie.overview.substring(0, 200) + "..."}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing className={classes.cardActions}>
                        <Button size="small" color="primary" startIcon={<InfoIcon/>}
                                className={classes.button_more}>
                            <Link className={classes.link1} to={"/movies/" + movie.id} title="Detalles">Ver
                                m??s</Link>
                        </Button>
                        <Button size="small" color="primary" className={classes.votePosition}>
                            Votos:
                            <SimpleRating key={movie.id} rate={parseVote(movie.vote_average)}/>
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        ));

    return listado;
}
export default MovieList;