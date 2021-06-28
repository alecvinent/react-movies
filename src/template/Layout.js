import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import TheatersIcon from "@material-ui/icons/Theaters";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Movies from "../pages/movies";
import {fetchPopularMovies} from "../redux/ActionCreators";
import {withRouter, Switch, Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import base_routes from "../shared/routes";
import MovieDetails from "../pages/moviedetails";
import {MainLink, CustomLink} from "./styles";
import {Link} from "react-router-dom";

const mapStateToProps = (state) => {
    return {
        movies: state.movies || [],
    };
};

const mapDispatchToProps = dispatch => ({
    fetchPopularMovies: () => {
        dispatch(fetchPopularMovies())
    },
});

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © ' + new Date().getFullYear()} {'Usamos '}
            <a href="https://material-ui.com/">
                material-ui
            </a>
        </Typography>
    );
}

class Layout extends React.Component {
    async componentDidMount() {
        await this.props.fetchPopularMovies();
    }


    render() {
        // const classes = useStyles();

        const style = makeStyles((theme) => ({
            icon: {
                marginRight: theme.spacing(2),
            },
            heroContent: {
                backgroundColor: theme.palette.background.paper,
                padding: theme.spacing(8, 0, 6),
            },
            heroButtons: {
                marginTop: theme.spacing(4),
            },
            cardGrid: {
                paddingTop: theme.spacing(8),
                paddingBottom: theme.spacing(8),
            },
            card: {
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            },
            cardMedia: {
                paddingTop: '56.25%', // 16:9
            },
            cardContent: {
                flexGrow: 1,
            },
            footer: {
                backgroundColor: theme.palette.background.paper,
                padding: theme.spacing(6),
                marginTop: 20,
                marginBottom: 20
            },
            main: {
                color: '#fff',
            }
        }));

        return (
            <React.Fragment>
                <CssBaseline/>
                <AppBar position="relative">
                    <Toolbar>
                        <TheatersIcon className={style.icon}/>
                        <CustomLink to={base_routes.home} title="Ir al principio">
                            <MainLink>Reseñas de películas</MainLink></CustomLink>
                    </Toolbar>
                </AppBar>
                <main>
                    {/* Hero unit */}
                    <div className={style.heroContent}>
                        <Container maxWidth="sm">
                            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                                Reseñas de películas
                            </Typography>
                            <Typography variant="h5" align="center" color="textSecondary" paragraph>
                                Proyecto para realizar reseñas de películas.
                            </Typography>
                            <div className={style.heroButtons}>
                                <Grid container spacing={2} justify="center">
                                    <Grid item>
                                        <Button variant="contained" color="primary">
                                            Main call to action
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="outlined" color="primary">
                                            Secondary action
                                        </Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </Container>
                    </div>
                    <Container className={style.cardGrid} maxWidth="md">
                        {/* End hero unit */}
                        <Grid container spacing={4}>
                            <Switch>
                                <Route exact path={base_routes.home} component={Movies}></Route>
                                <Route path={base_routes.movie} component={MovieDetails}></Route>
                                <Redirect from='*' to={base_routes.home}/>
                            </Switch>
                        </Grid>
                    </Container>
                </main>
                {/* Footer */}
                <footer className={style.footer}>
                    <Grid xs={12} style={{marginTop: 30, marginBottom: 30}}>
                        <Typography variant="h6" align="center" gutterBottom>
                            Footer
                        </Typography>
                        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                            Something here to give the footer a purpose!
                        </Typography>
                        <Copyright/>
                    </Grid>
                </footer>
                {/* End footer */}
            </React.Fragment>
        );
    }
};

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
export default withRouter(
    React.memo(
        connect(mapStateToProps, mapDispatchToProps)(Layout)
    )
);