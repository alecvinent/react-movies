import React, {useEffect, useState} from "react";
import {Grid, List} from "@material-ui/core";
import {MOVIE_API_MOVIE_REVIEWS} from "../../shared/baseUrl";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Card from "@material-ui/core/Card";
import {usePluralize, useStyles} from "../Utils";
import fetch from "cross-fetch";
import ReviewItem from "../ReviewItem";
import Button from "@material-ui/core/Button";
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import ReviewFormDialog from "../ReviewFormDialog";
import {GetUserdata, isAuthenticated} from "../../services/auth/authentication";
import WarningIcon from '@material-ui/icons/Warning';
import moment from "moment";
import { v4 as uuidv4 } from 'uuid';

const AddReview = ({movie}) => {
    const [open, setOpen] = React.useState(false);
    const isLogin = isAuthenticated();
    const user = GetUserdata();

    const handleClose = () => {
        setOpen(false);
    };

    const openForm = () => {
        setOpen(true);
    }

    const handleSubmit = (values) => {
        let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        const fecha = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
        let user_name = user.user_id.split('@');

        reviews.push({
            author: user.user_id,
            author_details: {
                name: user_name[0],
                avatar_path: 'https://ui-avatars.com/api/?name=' + user_name[0],
                username: user_name[0],
                rating: null
            },
            content: values.review,
            created_at: fecha,
            id: uuidv4(),
            movie_id: movie.id
        });

        localStorage.setItem('reviews', JSON.stringify(reviews));
    };

    const message = isLogin ? 'Add New review' : 'Se requiere iniciar sesión para realizar comentarios';

    return <CardActions>
        <Button size="small" variant="contained" color={isLogin ? "primary" : 'secondary'}
                startIcon={isLogin ? <InsertCommentIcon/> : <WarningIcon/>} onClick={isLogin ? openForm : null}>
            {message}
        </Button>
        <ReviewFormDialog isOpen={open} movie={movie} handleClose={handleClose} handleSubmit={handleSubmit}/>

    </CardActions>
}

const ReviewList = ({movie}) => {

    const classes = useStyles();

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        async function fetchReviews() {
            const url = MOVIE_API_MOVIE_REVIEWS.replace('{movie_id}', movie.id);
            await fetch(url).then(response => {
                    if (response.ok) {
                        return response;
                    } else {
                        var error = new Error('Error ' + response.status + ': ' + response.statusText);
                        error.response = response;
                        throw error;
                    }
                },
                error => {
                    throw new Error(error.message);
                })
                .then(response => response.json())
                .then(data => setReviews(data.results))
                .catch(error => {
                    setError(true);
                    setMessage(error.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        }

        fetchReviews();
    });

    const local_reviews = (JSON.parse(localStorage.getItem('reviews')) || [])
        .filter(r => r.movie_id === movie.id)
        .sort ( (a, b) => {
            const fecha1 = a.updated_at ? a.updated_at : a.created_at
            const fecha2 = b.updated_at ? b.updated_at : b.created_at
            return new Date(fecha2) - new Date(fecha1);
        })
    ;
    const total_reviews = reviews.length + local_reviews.length;

    return (
        <React.Fragment>
            <Grid item>
                <h1>{usePluralize(total_reviews, 'Review')}</h1>
                <Grid item>
                    <Card className={classes.card}>
                        <AddReview movie={movie}/>
                        <CardContent>

                            {loading && (

                                <Card>
                                    <CardContent>
                                        <h2>Loading</h2>
                                    </CardContent>
                                </Card>
                            )}

                            {error && (
                                <Card>
                                    <CardContent>
                                        <h2>Error: {message}</h2>
                                    </CardContent>
                                </Card>
                            )}
                            {local_reviews && (
                                <>
                                    <List className={classes.root}>
                                        {
                                            local_reviews.map(review => <ReviewItem key={review.id}
                                                review={review} isLocalReview={true} classes={classes}/>)
                                        }
                                    </List>
                                </>
                            )}
                            {reviews && (
                                <>
                                    <List className={classes.root}>
                                        {
                                            reviews
                                                .sort ((a, b) => {
                                                    const fecha1 = a.updated_at ? a.updated_at : a.created_at
                                                    const fecha2 = b.updated_at ? b.updated_at : b.created_at
                                                    return new Date(fecha2) - new Date(fecha1);
                                                })
                                                .map(review =>
                                                <ReviewItem key={review.id} review={review} classes={classes}/>)
                                        }
                                    </List>
                                </>
                            )}

                        </CardContent>
                        <AddReview movie={movie}/>
                    </Card>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};
export default ReviewList