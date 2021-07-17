import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import fetch from "cross-fetch";
import {
    MOVIE_API_AUTH_AUTHENTICATE,
    MOVIE_API_AUTH_SESSION_GUEST_REQUEST,
    MOVIE_API_AUTH_SESSION_REQUEST,
    MOVIE_API_AUTH_TOKEN_REQUEST
} from "../../shared/baseUrl";
import LoginForm from "./form";
import {isAuthenticated, SaveToken} from "../../services/auth/authentication";
import {useHistory} from 'react-router-dom'
import base_routes from "../../shared/routes";
import Loading from "../Loading";
import Alert from '@material-ui/lab/Alert';

export const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    alert: {
        marginTop: 20
    }
}));

export default function SignIn() {
    const classes = useStyles();
    const history = useHistory();
    const isLogin = isAuthenticated();

    if (isLogin){
        history.push(base_routes.home);
    }

    //
    const [token_response, setTokenResponse] = useState(null);
    const [permission, setPermission] = useState(null);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    // 1. create token
    // *     success: bool,
    // *     expires_at: string,
    // *     request_token: string
    const create_token = () => {
        try {
            setLoading(true);
            fetch(MOVIE_API_AUTH_TOKEN_REQUEST)
                .then(response => {
                    if (response.ok) {
                        return response;
                    }
                    throw response;
                })
                .then(response => response.json())
                .then(data => setTokenResponse(data))
                .catch(error => {
                    console.log('createTokenRequest error:', error.message)
                    setError(error.message)
                })
                .finally(() => setLoading(false))

        } catch (error) {
            console.log(error);
        }
    };
    // useEffect(() => {
    //     create_token();
    // }, []);

    // 2. Ask the user for permission
    const ask_user_permission = () => {
        if (token_response) {
            const url = MOVIE_API_AUTH_AUTHENTICATE.replace('{REQUEST_TOKEN}', token_response.request_token);
            console.log(url);

            try {
                setLoading(true);
                fetch(url)
                    .then(response => {
                        if (response.ok) {
                            return response;
                        }
                        throw response;
                    })
                    .then(response => response.json())
                    .then(data => setPermission(data))
                    .catch(error => {
                        console.log('Ask the user for permission error:', error)
                        setError(error.message)
                    })
                    .finally(() => setLoading(false))
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        ask_user_permission()
    }, [token_response]);

    // 3. create session
    const create_session = () => {
        console.log(MOVIE_API_AUTH_SESSION_REQUEST);
        try {
            setLoading(true);
            fetch(MOVIE_API_AUTH_SESSION_REQUEST, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    request_token: token_response.request_token
                }),
                json: true
            })
                .then(response => {
                    if (response.ok) {
                        return response;
                    }
                    throw response;
                })
                .then(response => response.json())
                .then(data => {
                    setSession(data);
                    console.log('session inside:', data)
                })
                .catch(error => {
                    console.log('create session error:', error)
                    setError(error.message)
                })
                .finally(() => setLoading(false))
        } catch (error) {
            console.log(error);
        }
    };
    // useEffect(() => {
    //     create_session()
    // }, [token_response]);


    // just guest session
    const create_guest_session = () => {
        console.log(MOVIE_API_AUTH_SESSION_GUEST_REQUEST);
        try {
            setLoading(true);
            fetch(MOVIE_API_AUTH_SESSION_GUEST_REQUEST)
                .then(response => {
                    if (response.ok) {
                        return response;
                    }
                    throw response;
                })
                .then(response => response.json())
                .then(data => setSession(data))
                .catch(error => {
                    console.log('create session error:', error)
                    setError(error.message)
                })
                .finally(() => setLoading(false))
        } catch (error) {
            console.log(error);
        }
    };
    // useEffect(() => {
    //     create_guest_session();
    // }, []);


    //
    // if (!loading) {
    //     console.log('token_response:', token_response);
    //     // console.log('permission:', permission);
    //     console.log('session:', session);
    // }

    const handleLogin = (values) => {
        setMessage(null);
        setError(null);
        create_guest_session();

        if (session){
            let data = session;
            data.user_id = values.email;
            SaveToken(session);
        }
        else {
            setMessage('Ha ocurrido un error de comunicación. Pruebe nuevamente.')
        }
    }

    return (
        <Container component="section" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <LoginForm classes={classes} handleLogin={handleLogin}/>

                {loading && (
                    <Typography component="div" className={classes.alert}>
                        <Loading />
                    </Typography>
                )}
                {error && (
                    <Typography component="div" className={classes.alert}>
                        <Alert severity="error">{error}</Alert>
                    </Typography>
                )}
                {!loading && !error && message && (
                    <Typography component="div" className={classes.alert}>
                        <Alert severity="warning">{message}</Alert>
                    </Typography>
                )}
            </div>
        </Container>
    );
}