"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productTopRatedReducer = exports.productReviewCreateReducer = exports.productUpdateReducer = exports.productCreateReducer = exports.productDeleteReducer = exports.productDetailsReducer = exports.productListReducer = void 0;
const productConstants_1 = require("../constants/productConstants");
const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case productConstants_1.PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] };
        case productConstants_1.PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                pages: action.payload.pages,
                page: action.payload.page,
            };
        case productConstants_1.PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
exports.productListReducer = productListReducer;
const productDetailsReducer = (state = { product: { reviews: [] } }, action) => {
    switch (action.type) {
        case productConstants_1.PRODUCT_DETAILS_REQUEST:
            return Object.assign(Object.assign({}, state), { loading: true });
        case productConstants_1.PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload };
        case productConstants_1.PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
exports.productDetailsReducer = productDetailsReducer;
const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case productConstants_1.PRODUCT_DELETE_REQUEST:
            return { loading: true };
        case productConstants_1.PRODUCT_DELETE_SUCCESS:
            return { loading: false, success: true };
        case productConstants_1.PRODUCT_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
exports.productDeleteReducer = productDeleteReducer;
const productCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case productConstants_1.PRODUCT_CREATE_REQUEST:
            return { loading: true };
        case productConstants_1.PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload };
        case productConstants_1.PRODUCT_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case productConstants_1.PRODUCT_CREATE_RESET:
            return {};
        default:
            return state;
    }
};
exports.productCreateReducer = productCreateReducer;
const productUpdateReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case productConstants_1.PRODUCT_UPDATE_REQUEST:
            return { loading: true };
        case productConstants_1.PRODUCT_UPDATE_SUCCESS:
            return { loading: false, success: true, product: action.payload };
        case productConstants_1.PRODUCT_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case productConstants_1.PRODUCT_UPDATE_RESET:
            return { product: {} };
        default:
            return state;
    }
};
exports.productUpdateReducer = productUpdateReducer;
const productReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case productConstants_1.PRODUCT_CREATE_REVIEW_REQUEST:
            return { loading: true };
        case productConstants_1.PRODUCT_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true };
        case productConstants_1.PRODUCT_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload };
        case productConstants_1.PRODUCT_CREATE_REVIEW_RESET:
            return {};
        default:
            return state;
    }
};
exports.productReviewCreateReducer = productReviewCreateReducer;
const productTopRatedReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case productConstants_1.PRODUCT_TOP_REQUEST:
            return { loading: true, products: [] };
        case productConstants_1.PRODUCT_TOP_SUCCESS:
            return { loading: false, products: action.payload };
        case productConstants_1.PRODUCT_TOP_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
exports.productTopRatedReducer = productTopRatedReducer;
