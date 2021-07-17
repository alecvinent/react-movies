import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
        marginTop: 20
    },
}));

const Loading = () => {
    const classes = useStyles();

    return (
        <Grid container className={classes.root}>
            <Grid item xs>
                <CircularProgress/>
                <CircularProgress color="secondary"/>
                <CircularProgress color="inherit"/>
            </Grid>
        </Grid>
    );
}

export default Loading;
