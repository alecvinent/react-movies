import {sign, verify} from "jsonwebtoken";
import {APP_SECRET_KEY} from "../../shared/baseUrl";
import {useHistory} from "react-router-dom";
import base_routes from "../../shared/routes";

export const isAuthenticated = () => {
    const token = sessionStorage.getItem('token');
    if (!token) return false;

    let flag = true;
    try {
        const is_valid = verify(token, APP_SECRET_KEY);
        if (!is_valid.success) {
            flag = false;
        }
    } catch (e) {
        flag = false
    }

    return flag;
};
export const GetUserdata = () => {
    const isLogin = isAuthenticated();
    if (!isLogin) return {};

    const token = sessionStorage.getItem('token');
    return verify(token, APP_SECRET_KEY);
};

export const SaveToken = (data) => {
    const token = sign(data, APP_SECRET_KEY);
    sessionStorage.setItem('token', token);

    const history = useHistory();
    history.push(base_routes.home);
};

export const ClearLogin = () => {
    sessionStorage.removeItem('token');
};