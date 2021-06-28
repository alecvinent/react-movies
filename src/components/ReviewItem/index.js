import React from "react";
import {Avatar, Divider, ListItemAvatar, ListItemText, Typography} from "@material-ui/core";
import {IMG_URL} from "../../shared/baseUrl";
import ListItem from '@material-ui/core/ListItem';
import moment from "moment";
import EventNoteIcon from '@material-ui/icons/EventNote';

const ReviewItem = ({review}) => {
    const fecha = moment(new Date(review.updated_at ? review.updated_at : review.created_at)).format("DD/MM/YYYY");
  
    return (
        <React.Fragment>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt={review.author_details.username} src={IMG_URL + review.author_details.avatar_path}/>
                </ListItemAvatar>
                <ListItemText
                    primary={review.author}
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary"
                                cla
                            >
                                <EventNoteIcon fontSize="small" /> {fecha}
                            </Typography>
                            <Typography
                                component="p"
                            >
                                {review.content}
                            </Typography>
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li"/>

        </React.Fragment>
    );
};

export default ReviewItem