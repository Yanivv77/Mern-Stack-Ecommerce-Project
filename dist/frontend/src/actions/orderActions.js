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
exports.listOrders = exports.listMyOrders = exports.deliverOrder = exports.payOrder = exports.getOrderDetails = exports.createOrder = void 0;
const axios_1 = __importDefault(require("axios"));
const cartConstants_1 = require("../constants/cartConstants");
const orderConstants_1 = require("../constants/orderConstants");
const userActions_1 = require("./userActions");
const createOrder = (order) => (dispatch, getState) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dispatch({
            type: orderConstants_1.ORDER_CREATE_REQUEST,
        });
        const { userLogin: { userInfo }, } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = yield axios_1.default.post(`/api/orders`, order, config);
        dispatch({
            type: orderConstants_1.ORDER_CREATE_SUCCESS,
            payload: data,
        });
        dispatch({
            type: cartConstants_1.CART_CLEAR_ITEMS,
            payload: data,
        });
        localStorage.removeItem('cartItems');
    }
    catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch((0, userActions_1.logout)());
        }
        dispatch({
            type: orderConstants_1.ORDER_CREATE_FAIL,
            payload: message,
        });
    }
});
exports.createOrder = createOrder;
const getOrderDetails = (id) => (dispatch, getState) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dispatch({
            type: orderConstants_1.ORDER_DETAILS_REQUEST,
        });
        const { userLogin: { userInfo }, } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = yield axios_1.default.get(`/api/orders/${id}`, config);
        dispatch({
            type: orderConstants_1.ORDER_DETAILS_SUCCESS,
            payload: data,
        });
    }
    catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch((0, userActions_1.logout)());
        }
        dispatch({
            type: orderConstants_1.ORDER_DETAILS_FAIL,
            payload: message,
        });
    }
});
exports.getOrderDetails = getOrderDetails;
const payOrder = (orderId, paymentResult) => (dispatch, getState) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dispatch({
            type: orderConstants_1.ORDER_PAY_REQUEST,
        });
        const { userLogin: { userInfo }, } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = yield axios_1.default.put(`/api/orders/${orderId}/pay`, paymentResult, config);
        dispatch({
            type: orderConstants_1.ORDER_PAY_SUCCESS,
            payload: data,
        });
    }
    catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch((0, userActions_1.logout)());
        }
        dispatch({
            type: orderConstants_1.ORDER_PAY_FAIL,
            payload: message,
        });
    }
});
exports.payOrder = payOrder;
const deliverOrder = (order) => (dispatch, getState) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dispatch({
            type: orderConstants_1.ORDER_DELIVER_REQUEST,
        });
        const { userLogin: { userInfo }, } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = yield axios_1.default.put(`/api/orders/${order._id}/deliver`, {}, config);
        dispatch({
            type: orderConstants_1.ORDER_DELIVER_SUCCESS,
            payload: data,
        });
    }
    catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch((0, userActions_1.logout)());
        }
        dispatch({
            type: orderConstants_1.ORDER_DELIVER_FAIL,
            payload: message,
        });
    }
});
exports.deliverOrder = deliverOrder;
const listMyOrders = () => (dispatch, getState) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dispatch({
            type: orderConstants_1.ORDER_LIST_MY_REQUEST,
        });
        const { userLogin: { userInfo }, } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = yield axios_1.default.get(`/api/orders/myorders`, config);
        dispatch({
            type: orderConstants_1.ORDER_LIST_MY_SUCCESS,
            payload: data,
        });
    }
    catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch((0, userActions_1.logout)());
        }
        dispatch({
            type: orderConstants_1.ORDER_LIST_MY_FAIL,
            payload: message,
        });
    }
});
exports.listMyOrders = listMyOrders;
const listOrders = () => (dispatch, getState) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dispatch({
            type: orderConstants_1.ORDER_LIST_REQUEST,
        });
        const { userLogin: { userInfo }, } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = yield axios_1.default.get(`/api/orders`, config);
        dispatch({
            type: orderConstants_1.ORDER_LIST_SUCCESS,
            payload: data,
        });
    }
    catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch((0, userActions_1.logout)());
        }
        dispatch({
            type: orderConstants_1.ORDER_LIST_FAIL,
            payload: message,
        });
    }
});
exports.listOrders = listOrders;
