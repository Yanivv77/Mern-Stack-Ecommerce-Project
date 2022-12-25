"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const redux_thunk_1 = __importDefault(require("redux-thunk"));
const redux_devtools_extension_1 = require("redux-devtools-extension");
const productReducers_1 = require("./reducers/productReducers");
const cartReducers_1 = require("./reducers/cartReducers");
const userReducers_1 = require("./reducers/userReducers");
const orderReducers_1 = require("./reducers/orderReducers");
const reducer = (0, redux_1.combineReducers)({
    productList: productReducers_1.productListReducer,
    productDetails: productReducers_1.productDetailsReducer,
    productDelete: productReducers_1.productDeleteReducer,
    productCreate: productReducers_1.productCreateReducer,
    productUpdate: productReducers_1.productUpdateReducer,
    productReviewCreate: productReducers_1.productReviewCreateReducer,
    productTopRated: productReducers_1.productTopRatedReducer,
    cart: cartReducers_1.cartReducer,
    userLogin: userReducers_1.userLoginReducer,
    userRegister: userReducers_1.userRegisterReducer,
    userDetails: userReducers_1.userDetailsReducer,
    userUpdateProfile: userReducers_1.userUpdateProfileReducer,
    userList: userReducers_1.userListReducer,
    userDelete: userReducers_1.userDeleteReducer,
    userUpdate: userReducers_1.userUpdateReducer,
    orderCreate: orderReducers_1.orderCreateReducer,
    orderDetails: orderReducers_1.orderDetailsReducer,
    orderPay: orderReducers_1.orderPayReducer,
    orderDeliver: orderReducers_1.orderDeliverReducer,
    orderListMy: orderReducers_1.orderListMyReducer,
    orderList: orderReducers_1.orderListReducer,
});
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {};
const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
    },
    userLogin: { userInfo: userInfoFromStorage },
};
const middleware = [redux_thunk_1.default];
const store = (0, redux_1.createStore)(reducer, initialState, (0, redux_devtools_extension_1.composeWithDevTools)((0, redux_1.applyMiddleware)(...middleware)));
exports.default = store;
