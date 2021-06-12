import axios from 'axios';
//import jwt_decode from 'jwt-decode';

import setAuthToken from '../../utils/setAuthToken';
import { registerSueccess, registerFail, setCurrentUser, authError, loginSueccess, loginFail, logout } from './authActions';
import { setAlert } from '../../redux/alert/alertAction';
import { clearProfile } from '../../redux/profile/profileActions';

//Register User
export const registerUser = ({ name, email, password }) => dispatch => {
    const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        //const body = JSON.parse({name,email,password});
    console.log(process.env.jwtsecret)
    console.log(process.env.clientid)
    console.log(process.env.clientsecret)
    axios
        .post('/api/users/register', { name, email, password }, config)
        .then(res =>
            dispatch(registerSueccess(res.data))
        )
        .catch(err => {
            const errors = err.response.data.errors;
            if (errors) {
                errors.forEach(error => {
                    dispatch(setAlert(error.msg, "danger"))
                });
            }
            dispatch(registerFail());
        });
}

export const loaduser = () => dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }
    axios.get('/api/auth')
        .then((res) => {
            dispatch(setCurrentUser(res.data))
        }).catch(err => {
            dispatch(authError())
        })
}


export const loginUser = ({ email, password }) => dispatch => {
    const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        //const body = JSON.parse({name,email,password}); 
    axios
        .post('/api/users/login', { email, password }, config)
        .then(res =>
            dispatch(loginSueccess(res.data))
        )
        .catch(err => {
            const errors = err.response.data.errors;
            if (errors) {
                errors.forEach(error => {
                    dispatch(setAlert(error.msg, "danger"))
                });
                if (err.response.data.password || err.response.data.email) {
                    var error;
                    if (err.response.data.password) error = err.response.data.password;
                    if (err.response.data.email) error = err.response.data.email;
                    dispatch(setAlert(error, "danger"))
                }
            }
            dispatch(loginFail());
        });
}

export const logoutUser = () => dispatch => {
    dispatch(logout());
    dispatch(clearProfile())
}