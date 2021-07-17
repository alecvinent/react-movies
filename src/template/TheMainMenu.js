import React, {useState} from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import {CustomLink, MenuLink} from "./styles";
import routes from "../shared/routes";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import {APP_NAME} from "../shared/baseUrl";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import {makeStyles} from "@material-ui/core/styles";
import {ClearLogin, isAuthenticated} from "../services/auth/authentication";

//
const useClassesStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        fontSize: 22
    },
    offset: theme.mixins.toolbar,
}));

const TheMainMenu = () => {
    const classes = useClassesStyles();
    const isLogin = isAuthenticated();

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        console.log('Bye, fish')
        ClearLogin();
    };

    const user_menu_items = [
        <MenuItem key="menu_profile" onClick={handleClose}>Profile</MenuItem>,
        <MenuItem key="menu_myaccount" onClick={handleClose}>My account</MenuItem>,
        <Divider light variant="middle"/>,
        <MenuItem key="menu_logout" onClick={handleLogout}>Logout</MenuItem>
    ];

    const guest_menu_items = [
        <MenuItem key="menu_login">
            <MenuLink to={routes.auth.login}>Login</MenuLink>
        </MenuItem>
    ];

    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h1" className={classes.title}>
                        <CustomLink to={routes.home}>{APP_NAME}</CustomLink>
                    </Typography>
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            {isLogin && (user_menu_items)}
                            {!isLogin && (guest_menu_items)}
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            <div className={classes.offset}/>
        </>
    );
};
export default TheMainMenu;