import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import {withRouter} from "react-router-dom";
import {fetchPopularMovies} from "../redux/ActionCreators";
import {connect} from "react-redux";
import TheContent from "./TheContent";
import TheFooter from "./TheFooter";
import TheMainMenu from "./TheMainMenu";
import "../shared/config";

//
const mapStateToProps = (state) => {
    return {
        movies: state.movies || [],
        reviews: 'reviews' in localStorage ? localStorage.getItem('reviews') : []
    };
};

const mapDispatchToProps = dispatch => ({
    fetchPopularMovies: () => {
        dispatch(fetchPopularMovies())
    },
});


class Layout extends React.Component {
    componentDidMount() {
        this.props.fetchPopularMovies();
    }

    render() {
        return (
            <React.Fragment>
                <CssBaseline/>
                <TheMainMenu/>
                <TheContent/>
                <TheFooter/>
            </React.Fragment>
        );
    }
}

export default withRouter(
    React.memo(
        connect(mapStateToProps, mapDispatchToProps)(Layout)
    )
);