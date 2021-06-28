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


const AddReview = ({movie}) => {
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const openForm = () => {
        setOpen(true);
    }

    return <CardActions>
        <Button size="small" variant="contained" color="primary" startIcon={<InsertCommentIcon/>} onClick={openForm}>
            Add New review
        </Button>
        <ReviewFormDialog isOpen={open} movie={movie} handleClose={handleClose}/>

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


    return (
        <React.Fragment>
            <Grid item>
                <h1>{usePluralize(reviews.length, 'Review')}</h1>
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
                            {reviews && (
                                <>
                                    <List className={classes.root}>
                                        {
                                            reviews.map(review =>
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