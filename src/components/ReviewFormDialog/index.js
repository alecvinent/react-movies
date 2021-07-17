import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import {ReviewForm} from "./reviewForm";

const ReviewFormDialog = ({isOpen, movie, handleClose, handleSubmit}) => {

    return (
        <React.Fragment>
            <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New review to movie <strong>{movie.title}</strong></DialogTitle>
                <ReviewForm handleClose={handleClose} handleSubmit={handleSubmit} />
            </Dialog>
        </React.Fragment>
    );
}

export default ReviewFormDialog;