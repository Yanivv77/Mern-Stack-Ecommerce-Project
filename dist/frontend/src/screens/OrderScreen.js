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
const react_1 = __importStar(require("react"));
const axios_1 = __importDefault(require("axios"));
const react_paypal_button_v2_1 = require("react-paypal-button-v2");
const react_router_dom_1 = require("react-router-dom");
const react_bootstrap_1 = require("react-bootstrap");
const react_redux_1 = require("react-redux");
const Message_1 = __importDefault(require("../components/Message"));
const Loader_1 = __importDefault(require("../components/Loader"));
const orderActions_1 = require("../actions/orderActions");
const orderConstants_1 = require("../constants/orderConstants");
const OrderScreen = ({ match, history }) => {
    const orderId = match.params.id;
    const [sdkReady, setSdkReady] = (0, react_1.useState)(false);
    const dispatch = (0, react_redux_1.useDispatch)();
    const orderDetails = (0, react_redux_1.useSelector)((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;
    const orderPay = (0, react_redux_1.useSelector)((state) => state.orderPay);
    const { loading: loadingPay, success: successPay } = orderPay;
    const orderDeliver = (0, react_redux_1.useSelector)((state) => state.orderDeliver);
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver;
    const userLogin = (0, react_redux_1.useSelector)((state) => state.userLogin);
    const { userInfo } = userLogin;
    if (!loading) {
        //   Calculate prices
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2);
        };
        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0));
    }
    (0, react_1.useEffect)(() => {
        if (!userInfo) {
            history.push('/login');
        }
        const addPayPalScript = () => __awaiter(void 0, void 0, void 0, function* () {
            const { data: clientId } = yield axios_1.default.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        });
        if (!order || successPay || successDeliver || order._id !== orderId) {
            dispatch({ type: orderConstants_1.ORDER_PAY_RESET });
            dispatch({ type: orderConstants_1.ORDER_DELIVER_RESET });
            dispatch((0, orderActions_1.getOrderDetails)(orderId));
        }
        else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript();
            }
            else {
                setSdkReady(true);
            }
        }
    }, [dispatch, orderId, successPay, successDeliver, order]);
    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult);
        dispatch((0, orderActions_1.payOrder)(orderId, paymentResult));
    };
    const deliverHandler = () => {
        dispatch((0, orderActions_1.deliverOrder)(order));
    };
    return loading ? (<Loader_1.default />) : error ? (<Message_1.default variant="danger">{error}</Message_1.default>) : (<>
      <h1>Order {order._id}</h1>
      <react_bootstrap_1.Row>
        <react_bootstrap_1.Col md={8}>
          <react_bootstrap_1.ListGroup variant="flush">
            <react_bootstrap_1.ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (<Message_1.default variant="success">Delivered on {order.deliveredAt}</Message_1.default>) : (<Message_1.default variant="danger">Not Delivered</Message_1.default>)}
            </react_bootstrap_1.ListGroup.Item>

            <react_bootstrap_1.ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? <Message_1.default variant="success">Paid on {order.paidAt}</Message_1.default> : <Message_1.default variant="danger">Not Paid</Message_1.default>}
            </react_bootstrap_1.ListGroup.Item>

            <react_bootstrap_1.ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (<Message_1.default>Order is empty</Message_1.default>) : (<react_bootstrap_1.ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (<react_bootstrap_1.ListGroup.Item key={index}>
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
                  <react_bootstrap_1.Col>${order.itemsPrice}</react_bootstrap_1.Col>
                </react_bootstrap_1.Row>
              </react_bootstrap_1.ListGroup.Item>
              <react_bootstrap_1.ListGroup.Item>
                <react_bootstrap_1.Row>
                  <react_bootstrap_1.Col>Shipping</react_bootstrap_1.Col>
                  <react_bootstrap_1.Col>${order.shippingPrice}</react_bootstrap_1.Col>
                </react_bootstrap_1.Row>
              </react_bootstrap_1.ListGroup.Item>
              <react_bootstrap_1.ListGroup.Item>
                <react_bootstrap_1.Row>
                  <react_bootstrap_1.Col>Tax</react_bootstrap_1.Col>
                  <react_bootstrap_1.Col>${order.taxPrice}</react_bootstrap_1.Col>
                </react_bootstrap_1.Row>
              </react_bootstrap_1.ListGroup.Item>
              <react_bootstrap_1.ListGroup.Item>
                <react_bootstrap_1.Row>
                  <react_bootstrap_1.Col>Total</react_bootstrap_1.Col>
                  <react_bootstrap_1.Col>${order.totalPrice}</react_bootstrap_1.Col>
                </react_bootstrap_1.Row>
              </react_bootstrap_1.ListGroup.Item>
              {!order.isPaid && (<react_bootstrap_1.ListGroup.Item>
                  {loadingPay && <Loader_1.default />}
                  {!sdkReady ? <Loader_1.default /> : <react_paypal_button_v2_1.PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}/>}
                </react_bootstrap_1.ListGroup.Item>)}
              {loadingDeliver && <Loader_1.default />}
              {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (<react_bootstrap_1.ListGroup.Item>
                  <react_bootstrap_1.Button type="button" className="btn btn-block" onClick={deliverHandler}>
                    Mark As Delivered
                  </react_bootstrap_1.Button>
                </react_bootstrap_1.ListGroup.Item>)}
            </react_bootstrap_1.ListGroup>
          </react_bootstrap_1.Card>
        </react_bootstrap_1.Col>
      </react_bootstrap_1.Row>
    </>);
};
exports.default = OrderScreen;
