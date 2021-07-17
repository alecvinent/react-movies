import Typography from "@material-ui/core/Typography";
import {APP_NAME} from "../shared/baseUrl";
import React from "react";
import Grid from "@material-ui/core/Grid";
import {CustomFooter} from "./styles";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © ' + new Date().getFullYear() + ' ' + APP_NAME + '. '} {'Usamos '}
            <a href="https://material-ui.com/">
                material-ui
            </a>
        </Typography>
    );
}

const TheFooter = () => {
    return(
        <CustomFooter>
            <Grid item xs={12}>
                <Typography variant="h6" align="center" gutterBottom>
                    Footer
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    Something here to give the footer a purpose!
                </Typography>
                <Copyright/>
            </Grid>
        </CustomFooter>
    );
};
export default TheFooter;