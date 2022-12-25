"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.listUsers = exports.updateUserProfile = exports.getUserDetails = exports.register = exports.logout = exports.login = void 0;
const axios_1 = __importDefault(require("axios"));
const userConstants_1 = require("../constants/userConstants");
const orderConstants_1 = require("../constants/orderConstants");
const login = (email, password) => (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dispatch({
            type: userConstants_1.USER_LOGIN_REQUEST,
        });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const { data } = yield axios_1.default.post('/api/users/login', { email, password }, config);
        dispatch({
            type: userConstants_1.USER_LOGIN_SUCCESS,
            payload: data,
        });
        localStorage.setItem('userInfo', JSON.stringify(data));
    }
    catch (error) {
        dispatch({
            type: userConstants_1.USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
});
exports.login = login;
const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    dispatch({ type: userConstants_1.USER_LOGOUT });
    dispatch({ type: userConstants_1.USER_DETAILS_RESET });
    dispatch({ type: orderConstants_1.ORDER_LIST_MY_RESET });
    dispatch({ type: userConstants_1.USER_LIST_RESET });
    document.location.href = '/login';
};
exports.logout = logout;
const register = (name, email, password) => (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dispatch({
            type: userConstants_1.USER_REGISTER_REQUEST,
        });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const { data } = yield axios_1.default.post('/api/users', { name, email, password }, config);
        dispatch({
            type: userConstants_1.USER_REGISTER_SUCCESS,
            payload: data,
        });
        dispatch({
            type: userConstants_1.USER_LOGIN_SUCCESS,
            payload: data,
        });
        localStorage.setItem('userInfo', JSON.stringify(data));
    }
    catch (error) {
        dispatch({
            type: userConstants_1.USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
});
exports.register = register;
const getUserDetails = (id) => (dispatch, getState) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dispatch({
            type: userConstants_1.USER_DETAILS_REQUEST,
        });
        const { userLogin: { userInfo }, } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = yield axios_1.default.get(`/api/users/${id}`, config);
        dispatch({
            type: userConstants_1.USER_DETAILS_SUCCESS,
            payload: data,
        });
    }
    catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch((0, exports.logout)());
        }
        dispatch({
            type: userConstants_1.USER_DETAILS_FAIL,
            payload: message,
        });
    }
});
exports.getUserDetails = getUserDetails;
const updateUserProfile = (user) => (dispatch, getState) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dispatch({
            type: userConstants_1.USER_UPDATE_PROFILE_REQUEST,
        });
        const { userLogin: { userInfo }, } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = yield axios_1.default.put(`/api/users/profile`, user, config);
        dispatch({
            type: userConstants_1.USER_UPDATE_PROFILE_SUCCESS,
            payload: data,
        });
        dispatch({
            type: userConstants_1.USER_LOGIN_SUCCESS,
            payload: data,
        });
        localStorage.setItem('userInfo', JSON.stringify(data));
    }
    catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch((0, exports.logout)());
        }
        dispatch({
            type: userConstants_1.USER_UPDATE_PROFILE_FAIL,
            payload: message,
        });
    }
});
exports.updateUserProfile = updateUserProfile;
const listUsers = () => (dispatch, getState) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dispatch({
            type: userConstants_1.USER_LIST_REQUEST,
        });
        const { userLogin: { userInfo }, } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = yield axios_1.default.get(`/api/users`, config);
        dispatch({
            type: userConstants_1.USER_LIST_SUCCESS,
            payload: data,
        });
    }
    catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch((0, exports.logout)());
        }
        dispatch({
            type: userConstants_1.USER_LIST_FAIL,
            payload: message,
        });
    }
});
exports.listUsers = listUsers;
const deleteUser = (id) => (dispatch, getState) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dispatch({
            type: userConstants_1.USER_DELETE_REQUEST,
        });
        const { userLogin: { userInfo }, } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        yield axios_1.default.delete(`/api/users/${id}`, config);
        dispatch({ type: userConstants_1.USER_DELETE_SUCCESS });
    }
    catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch((0, exports.logout)());
        }
        dispatch({
            type: userConstants_1.USER_DELETE_FAIL,
            payload: message,
        });
    }
});
exports.deleteUser = deleteUser;
const updateUser = (user) => (dispatch, getState) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dispatch({
            type: userConstants_1.USER_UPDATE_REQUEST,
        });
        const { userLogin: { userInfo }, } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = yield axios_1.default.put(`/api/users/${user._id}`, user, config);
        dispatch({ type: userConstants_1.USER_UPDATE_SUCCESS });
        dispatch({ type: userConstants_1.USER_DETAILS_SUCCESS, payload: data });
        dispatch({ type: userConstants_1.USER_DETAILS_RESET });
    }
    catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch((0, exports.logout)());
        }
        dispatch({
            type: userConstants_1.USER_UPDATE_FAIL,
            payload: message,
        });
    }
});
exports.updateUser = updateUser;
