"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartReducer = void 0;
const cartConstants_1 = require("../constants/cartConstants");
const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case cartConstants_1.CART_ADD_ITEM:
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x.product === item.product);
            if (existItem) {
                return Object.assign(Object.assign({}, state), { cartItems: state.cartItems.map((x) => (x.product === existItem.product ? item : x)) });
            }
            else {
                return Object.assign(Object.assign({}, state), { cartItems: [...state.cartItems, item] });
            }
        case cartConstants_1.CART_REMOVE_ITEM:
            return Object.assign(Object.assign({}, state), { cartItems: state.cartItems.filter((x) => x.product !== action.payload) });
        case cartConstants_1.CART_SAVE_SHIPPING_ADDRESS:
            return Object.assign(Object.assign({}, state), { shippingAddress: action.payload });
        case cartConstants_1.CART_SAVE_PAYMENT_METHOD:
            return Object.assign(Object.assign({}, state), { paymentMethod: action.payload });
        case cartConstants_1.CART_CLEAR_ITEMS:
            return Object.assign(Object.assign({}, state), { cartItems: [] });
        default:
            return state;
    }
};
exports.cartReducer = cartReducer;
