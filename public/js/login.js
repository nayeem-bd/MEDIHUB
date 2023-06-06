/* eslint-disable */
import { showAlert } from './alerts';

import axios from "axios";

export const login = async (phone, password) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/users/login',
            data: {
                phone,
                password
            }
        });
        if (res.data.status === 'success') {
            showAlert('success', 'Logged in successfully');
            window.setTimeout(() => {
                location.assign('/dashboard');
            }, 1500);
        }
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
};


export const logout = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: '/api/v1/users/logout'
        });
        if (res.data.status === 'success') location.assign('/');;
    } catch (err) {
        showAlert('error', 'Error logging out! Try again.');
    }
};

export const signUp = async (name, phone, password, passwordConfirm, role) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/users/signup',
            data: {
                name,
                phone,
                password,
                passwordConfirm,
                role
            }
        });
        if (res.data.status === 'success') {
            showAlert('success', 'Sign Up successfully');
            window.setTimeout(() => {
                location.assign('/');
            }, 1500);
        }

    } catch (err) {
        showAlert('error', err.response.data.message);
    }
}