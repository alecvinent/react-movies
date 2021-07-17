import TextField from "@material-ui/core/TextField";
import React from "react";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import {useFormik} from 'formik';
import {validationSchema} from "./validation";


export const ReviewForm = ({handleClose, handleSubmit}) => {
    const formik = useFormik({
        initialValues: {
            review: '',
        },
        onSubmit: values => {
            handleSubmit(values);

            // close
            handleClose();
        },
        validationSchema: validationSchema
    });

    return (
        <React.Fragment>
            <form onSubmit={formik.handleSubmit}>
                <DialogContent>
                    <DialogContentText>
                        To add a new review to this movie, please enter your email address here. We will send
                        updates
                        occasionally.
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        id="review"
                        name="review"
                        label="Enter your review here"
                        type="text"
                        fullWidth
                        multiline
                        maxRows={4}
                        autoFocus
                        helperText={formik.touched.review ? formik.errors.review : ""}
                        error={formik.touched.review && Boolean(formik.errors.review)}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.review}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="primary" type="submit" disabled={!formik.isValid}>
                        Send review
                    </Button>
                </DialogActions>
            </form>
        </React.Fragment>
    );
}