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
exports.savePaymentMethod = exports.saveShippingAddress = exports.removeFromCart = exports.addToCart = void 0;
const axios_1 = __importDefault(require("axios"));
const cartConstants_1 = require("../constants/cartConstants");
const addToCart = (id, qty) => (dispatch, getState) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get(`/api/products/${id}`);
    dispatch({
        type: cartConstants_1.CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty,
        },
    });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
});
exports.addToCart = addToCart;
const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: cartConstants_1.CART_REMOVE_ITEM,
        payload: id,
    });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
exports.removeFromCart = removeFromCart;
const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: cartConstants_1.CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    });
    localStorage.setItem('shippingAddress', JSON.stringify(data));
};
exports.saveShippingAddress = saveShippingAddress;
const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: cartConstants_1.CART_SAVE_PAYMENT_METHOD,
        payload: data,
    });
    localStorage.setItem('paymentMethod', JSON.stringify(data));
};
exports.savePaymentMethod = savePaymentMethod;
