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
exports.listTopProducts = exports.createProductReview = exports.updateProduct = exports.createProduct = exports.deleteProduct = exports.listProductDetails = exports.listProducts = void 0;
const axios_1 = __importDefault(require("axios"));
const productConstants_1 = require("../constants/productConstants");
const userActions_1 = require("./userActions");
const listProducts = (keyword = '', pageNumber = '') => (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dispatch({ type: productConstants_1.PRODUCT_LIST_REQUEST });
        const { data } = yield axios_1.default.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);
        dispatch({
            type: productConstants_1.PRODUCT_LIST_SUCCESS,
            payload: data,
        });
    }
    catch (error) {
        dispatch({
            type: productConstants_1.PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
});
exports.listProducts = listProducts;
const listProductDetails = (id) => (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dispatch({ type: productConstants_1.PRODUCT_DETAILS_REQUEST });
        const { data } = yield axios_1.default.get(`/api/products/${id}`);
        dispatch({
            type: productConstants_1.PRODUCT_DETAILS_SUCCESS,
            payload: data,
        });
    }
    catch (error) {
        dispatch({
            type: productConstants_1.PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
});
exports.listProductDetails = listProductDetails;
const deleteProduct = (id) => (dispatch, getState) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dispatch({
            type: productConstants_1.PRODUCT_DELETE_REQUEST,
        });
        const { userLogin: { userInfo }, } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        yield axios_1.default.delete(`/api/products/${id}`, config);
        dispatch({
            type: productConstants_1.PRODUCT_DELETE_SUCCESS,
        });
    }
    catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch((0, userActions_1.logout)());
        }
        dispatch({
            type: productConstants_1.PRODUCT_DELETE_FAIL,
            payload: message,
        });
    }
});
exports.deleteProduct = deleteProduct;
const createProduct = () => (dispatch, getState) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dispatch({
            type: productConstants_1.PRODUCT_CREATE_REQUEST,
        });
        const { userLogin: { userInfo }, } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = yield axios_1.default.post(`/api/products`, {}, config);
        dispatch({
            type: productConstants_1.PRODUCT_CREATE_SUCCESS,
            payload: data,
        });
    }
    catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch((0, userActions_1.logout)());
        }
        dispatch({
            type: productConstants_1.PRODUCT_CREATE_FAIL,
            payload: message,
        });
    }
});
exports.createProduct = createProduct;
const updateProduct = (product) => (dispatch, getState) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dispatch({
            type: productConstants_1.PRODUCT_UPDATE_REQUEST,
        });
        const { userLogin: { userInfo }, } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = yield axios_1.default.put(`/api/products/${product._id}`, product, config);
        dispatch({
            type: productConstants_1.PRODUCT_UPDATE_SUCCESS,
            payload: data,
        });
        dispatch({ type: productConstants_1.PRODUCT_DETAILS_SUCCESS, payload: data });
    }
    catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch((0, userActions_1.logout)());
        }
        dispatch({
            type: productConstants_1.PRODUCT_UPDATE_FAIL,
            payload: message,
        });
    }
});
exports.updateProduct = updateProduct;
const createProductReview = (productId, review) => (dispatch, getState) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dispatch({
            type: productConstants_1.PRODUCT_CREATE_REVIEW_REQUEST,
        });
        const { userLogin: { userInfo }, } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        yield axios_1.default.post(`/api/products/${productId}/reviews`, review, config);
        dispatch({
            type: productConstants_1.PRODUCT_CREATE_REVIEW_SUCCESS,
        });
    }
    catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch((0, userActions_1.logout)());
        }
        dispatch({
            type: productConstants_1.PRODUCT_CREATE_REVIEW_FAIL,
            payload: message,
        });
    }
});
exports.createProductReview = createProductReview;
const listTopProducts = () => (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dispatch({ type: productConstants_1.PRODUCT_TOP_REQUEST });
        const { data } = yield axios_1.default.get(`/api/products/top`);
        dispatch({
            type: productConstants_1.PRODUCT_TOP_SUCCESS,
            payload: data,
        });
    }
    catch (error) {
        dispatch({
            type: productConstants_1.PRODUCT_TOP_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
});
exports.listTopProducts = listTopProducts;
