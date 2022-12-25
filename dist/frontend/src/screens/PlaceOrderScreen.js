"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_bootstrap_1 = require("react-bootstrap");
const react_redux_1 = require("react-redux");
const Message_1 = __importDefault(require("../components/Message"));
const CheckoutSteps_1 = __importDefault(require("../components/CheckoutSteps"));
const orderActions_1 = require("../actions/orderActions");
const orderConstants_1 = require("../constants/orderConstants");
const userConstants_1 = require("../constants/userConstants");
const PlaceOrderScreen = ({ history }) => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const cart = (0, react_redux_1.useSelector)((state) => state.cart);
    if (!cart.shippingAddress.address) {
        history.push('/shipping');
    }
    else if (!cart.paymentMethod) {
        history.push('/payment');
    }
    //   Calculate prices
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    };
    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2);
    const orderCreate = (0, react_redux_1.useSelector)((state) => state.orderCreate);
    const { order, success, error } = orderCreate;
    (0, react_1.useEffect)(() => {
        if (success) {
            history.push(`/order/${order._id}`);
            dispatch({ type: userConstants_1.USER_DETAILS_RESET });
            dispatch({ type: orderConstants_1.ORDER_CREATE_RESET });
        }
        // eslint-disable-next-line
    }, [history, success]);
    const placeOrderHandler = () => {
        dispatch((0, orderActions_1.createOrder)({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }));
    };
    return (<>
      <CheckoutSteps_1.default step1 step2 step3 step4/>
      <react_bootstrap_1.Row>
        <react_bootstrap_1.Col md={8}>
          <react_bootstrap_1.ListGroup variant="flush">
            <react_bootstrap_1.ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </p>
            </react_bootstrap_1.ListGroup.Item>

            <react_bootstrap_1.ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </react_bootstrap_1.ListGroup.Item>

            <react_bootstrap_1.ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (<Message_1.default>Your cart is empty</Message_1.default>) : (<react_bootstrap_1.ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (<react_bootstrap_1.ListGroup.Item key={index}>
                      <react_bootstrap_1.Row>
                        <react_bootstrap_1.Col md={1}>
                          <react_bootstrap_1.Image src={item.image} alt={item.name} fluid rounded/>
                        </react_bootstrap_1.Col>
                        <react_bootstrap_1.Col>
                          <react_router_dom_1.Link to={`/product/${item.product}`}>{item.name}</react_router_dom_1.Link>
                        </react_bootstrap_1.Col>
                        <react_bootstrap_1.Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </react_bootstrap_1.Col>
                      </react_bootstrap_1.Row>
                    </react_bootstrap_1.ListGroup.Item>))}
                </react_bootstrap_1.ListGroup>)}
            </react_bootstrap_1.ListGroup.Item>
          </react_bootstrap_1.ListGroup>
        </react_bootstrap_1.Col>
        <react_bootstrap_1.Col md={4}>
          <react_bootstrap_1.Card>
            <react_bootstrap_1.ListGroup variant="flush">
              <react_bootstrap_1.ListGroup.Item>
                <h2>Order Summary</h2>
              </react_bootstrap_1.ListGroup.Item>
              <react_bootstrap_1.ListGroup.Item>
                <react_bootstrap_1.Row>
                  <react_bootstrap_1.Col>Items</react_bootstrap_1.Col>
                  <react_bootstrap_1.Col>${cart.itemsPrice}</react_bootstrap_1.Col>
                </react_bootstrap_1.Row>
              </react_bootstrap_1.ListGroup.Item>
              <react_bootstrap_1.ListGroup.Item>
                <react_bootstrap_1.Row>
                  <react_bootstrap_1.Col>Shipping</react_bootstrap_1.Col>
                  <react_bootstrap_1.Col>${cart.shippingPrice}</react_bootstrap_1.Col>
                </react_bootstrap_1.Row>
              </react_bootstrap_1.ListGroup.Item>
              <react_bootstrap_1.ListGroup.Item>
                <react_bootstrap_1.Row>
                  <react_bootstrap_1.Col>Tax</react_bootstrap_1.Col>
                  <react_bootstrap_1.Col>${cart.taxPrice}</react_bootstrap_1.Col>
                </react_bootstrap_1.Row>
              </react_bootstrap_1.ListGroup.Item>
              <react_bootstrap_1.ListGroup.Item>
                <react_bootstrap_1.Row>
                  <react_bootstrap_1.Col>Total</react_bootstrap_1.Col>
                  <react_bootstrap_1.Col>${cart.totalPrice}</react_bootstrap_1.Col>
                </react_bootstrap_1.Row>
              </react_bootstrap_1.ListGroup.Item>
              <react_bootstrap_1.ListGroup.Item>{error && <Message_1.default variant="danger">{error}</Message_1.default>}</react_bootstrap_1.ListGroup.Item>
              <react_bootstrap_1.ListGroup.Item>
                <react_bootstrap_1.Button type="button" className="btn-block" disabled={cart.cartItems === 0} onClick={placeOrderHandler}>
                  Place Order
                </react_bootstrap_1.Button>
              </react_bootstrap_1.ListGroup.Item>
            </react_bootstrap_1.ListGroup>
          </react_bootstrap_1.Card>
        </react_bootstrap_1.Col>
      </react_bootstrap_1.Row>
    </>);
};
exports.default = PlaceOrderScreen;
