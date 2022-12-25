"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userUpdateReducer = exports.userDeleteReducer = exports.userListReducer = exports.userUpdateProfileReducer = exports.userDetailsReducer = exports.userRegisterReducer = exports.userLoginReducer = void 0;
const userConstants_1 = require("../constants/userConstants");
const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case userConstants_1.USER_LOGIN_REQUEST:
            return { loading: true };
        case userConstants_1.USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case userConstants_1.USER_LOGIN_FAIL:
            return { loading: false, error: action.payload };
        case userConstants_1.USER_LOGOUT:
            return {};
        default:
            return state;
    }
};
exports.userLoginReducer = userLoginReducer;
const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case userConstants_1.USER_REGISTER_REQUEST:
            return { loading: true };
        case userConstants_1.USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case userConstants_1.USER_REGISTER_FAIL:
            return { loading: false, error: action.payload };
        case userConstants_1.USER_LOGOUT:
            return {};
        default:
            return state;
    }
};
exports.userRegisterReducer = userRegisterReducer;
const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case userConstants_1.USER_DETAILS_REQUEST:
            return Object.assign(Object.assign({}, state), { loading: true });
        case userConstants_1.USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload };
        case userConstants_1.USER_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        case userConstants_1.USER_DETAILS_RESET:
            return { user: {} };
        default:
            return state;
    }
};
exports.userDetailsReducer = userDetailsReducer;
const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case userConstants_1.USER_UPDATE_PROFILE_REQUEST:
            return { loading: true };
        case userConstants_1.USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload };
        case userConstants_1.USER_UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload };
        case userConstants_1.USER_UPDATE_PROFILE_RESET:
            return {};
        default:
            return state;
    }
};
exports.userUpdateProfileReducer = userUpdateProfileReducer;
const userListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case userConstants_1.USER_LIST_REQUEST:
            return { loading: true };
        case userConstants_1.USER_LIST_SUCCESS:
            return { loading: false, users: action.payload };
        case userConstants_1.USER_LIST_FAIL:
            return { loading: false, error: action.payload };
        case userConstants_1.USER_LIST_RESET:
            return { users: [] };
        default:
            return state;
    }
};
exports.userListReducer = userListReducer;
const userDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case userConstants_1.USER_DELETE_REQUEST:
            return { loading: true };
        case userConstants_1.USER_DELETE_SUCCESS:
            return { loading: false, success: true };
        case userConstants_1.USER_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
exports.userDeleteReducer = userDeleteReducer;
const userUpdateReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case userConstants_1.USER_UPDATE_REQUEST:
            return { loading: true };
        case userConstants_1.USER_UPDATE_SUCCESS:
            return { loading: false, success: true };
        case userConstants_1.USER_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case userConstants_1.USER_UPDATE_RESET:
            return {
                user: {},
            };
        default:
            return state;
    }
};
exports.userUpdateReducer = userUpdateReducer;
