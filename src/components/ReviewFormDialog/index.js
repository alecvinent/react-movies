import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ReviewFormDialog = ({isOpen, movie, handleClose}) => {

    return (
        <React.Fragment>
            <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New review to movie {movie.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add a new review to this movie, please enter your email address here. We will send updates
                        occasionally.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        required={true}
                    />
                    <TextareaAutosize
                        autoFocus
                        margin="dense"
                        id="review"
                        label="Enter your review here"
                        required={true}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Send review
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default ReviewFormDialog;