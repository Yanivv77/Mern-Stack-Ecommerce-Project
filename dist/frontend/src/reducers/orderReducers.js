"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderListReducer = exports.orderListMyReducer = exports.orderDeliverReducer = exports.orderPayReducer = exports.orderDetailsReducer = exports.orderCreateReducer = void 0;
const orderConstants_1 = require("../constants/orderConstants");
const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case orderConstants_1.ORDER_CREATE_REQUEST:
            return {
                loading: true,
            };
        case orderConstants_1.ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload,
            };
        case orderConstants_1.ORDER_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case orderConstants_1.ORDER_CREATE_RESET:
            return {};
        default:
            return state;
    }
};
exports.orderCreateReducer = orderCreateReducer;
const orderDetailsReducer = (state = { loading: true, orderItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case orderConstants_1.ORDER_DETAILS_REQUEST:
            return Object.assign(Object.assign({}, state), { loading: true });
        case orderConstants_1.ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload,
            };
        case orderConstants_1.ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
exports.orderDetailsReducer = orderDetailsReducer;
const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case orderConstants_1.ORDER_PAY_REQUEST:
            return {
                loading: true,
            };
        case orderConstants_1.ORDER_PAY_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case orderConstants_1.ORDER_PAY_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case orderConstants_1.ORDER_PAY_RESET:
            return {};
        default:
            return state;
    }
};
exports.orderPayReducer = orderPayReducer;
const orderDeliverReducer = (state = {}, action) => {
    switch (action.type) {
        case orderConstants_1.ORDER_DELIVER_REQUEST:
            return {
                loading: true,
            };
        case orderConstants_1.ORDER_DELIVER_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case orderConstants_1.ORDER_DELIVER_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case orderConstants_1.ORDER_DELIVER_RESET:
            return {};
        default:
            return state;
    }
};
exports.orderDeliverReducer = orderDeliverReducer;
const orderListMyReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case orderConstants_1.ORDER_LIST_MY_REQUEST:
            return {
                loading: true,
            };
        case orderConstants_1.ORDER_LIST_MY_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
            };
        case orderConstants_1.ORDER_LIST_MY_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case orderConstants_1.ORDER_LIST_MY_RESET:
            return { orders: [] };
        default:
            return state;
    }
};
exports.orderListMyReducer = orderListMyReducer;
const orderListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case orderConstants_1.ORDER_LIST_REQUEST:
            return {
                loading: true,
            };
        case orderConstants_1.ORDER_LIST_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
            };
        case orderConstants_1.ORDER_LIST_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
exports.orderListReducer = orderListReducer;
