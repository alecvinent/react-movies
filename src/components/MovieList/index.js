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

import {IMG_URL} from "../../shared/baseUrl";
import {useStyles} from "../Utils";

const MovieList = ({movies}) => {
    const classes = useStyles();

    const listado =
        movies.map((movie) => (
            <Grid item key={movie.title} xs={12} sm={6} md={6}>
                <Card className={classes.card}>
                    <Link to={"/movies/" + movie.id} title="Detalles">
                        <CardMedia
                            className={classes.cardMedia}
                            image={IMG_URL + movie.poster_path}
                            title={movie.title}
                        />
                    </Link>
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {movie.title}
                        </Typography>
                        <Typography>
                            {movie.overview}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary" startIcon={<InfoIcon/>}>
                            <Link to={"/movies/" + movie.id} title="Detalles">Ver Información</Link>
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        ));

    return listado;
}
export default MovieList