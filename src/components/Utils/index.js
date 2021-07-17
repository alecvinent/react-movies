import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import fetch from "cross-fetch";

export const useStyles = makeStyles((theme) => ({
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
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
    },
    root: {
        width: '100%',
        // maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    link: {
        margin: theme.spacing(1, 1.5),
        textDecoration: "none"
    },
    link1: {
        textDecoration: "none"
    },
    cardActions: {
        justifyContent: "center",
        alignItems: "flex-start",
        flexDirection: "row",
        width: '100%'
    },
    button_more: {
        alignSelf: "center",
        justifySelf: "flex-start",
        marginRight:"auto"
    },
    votePosition: {
        alignSelf: "center",
        justifySelf: "flex-end",
        marginLeft: "auto"
    }
}));

// https://stackoverflow.com/a/39835908/7721297
export const usePluralize = (count, noun, suffix = 's') =>
    `${count} ${noun}${count !== 1 ? suffix : ''}`;

export const useFetch = (url, options) => {
    const [response, setResponse] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const res = await fetch(url, options);
                const json = await res.json();
                setResponse(json);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [options, url]);
    return {response, error, loading};
};

//
export const parseVote = (vote) => {
    return vote > 0 ? vote / 2 : 0;
}

export const parseVote2Post = (vote) => {
    return vote > 0 ? vote * 2 : 0;
}