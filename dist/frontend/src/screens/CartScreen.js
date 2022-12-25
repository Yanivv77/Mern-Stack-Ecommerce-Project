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
const react_redux_1 = require("react-redux");
const react_bootstrap_1 = require("react-bootstrap");
const Message_1 = __importDefault(require("../components/Message"));
const cartActions_1 = require("../actions/cartActions");
const CartScreen = ({ match, location, history }) => {
    const productId = match.params.id;
    const qty = location.search ? Number(location.search.split('=')[1]) : 1;
    const dispatch = (0, react_redux_1.useDispatch)();
    const cart = (0, react_redux_1.useSelector)((state) => state.cart);
    const { cartItems } = cart;
    (0, react_1.useEffect)(() => {
        if (productId) {
            dispatch((0, cartActions_1.addToCart)(productId, qty));
        }
    }, [dispatch, productId, qty]);
    const removeFromCartHandler = (id) => {
        dispatch((0, cartActions_1.removeFromCart)(id));
    };
    const checkoutHandler = () => {
        history.push('/login?redirect=shipping');
    };
    return (<react_bootstrap_1.Row>
      <react_bootstrap_1.Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (<Message_1.default>
            Your cart is empty <react_router_dom_1.Link to="/">Go Back</react_router_dom_1.Link>
          </Message_1.default>) : (<react_bootstrap_1.ListGroup variant="flush">
            {cartItems.map((item) => (<react_bootstrap_1.ListGroup.Item key={item.product}>
                <react_bootstrap_1.Row>
                  <react_bootstrap_1.Col md={2}>
                    <react_bootstrap_1.Image src={item.image} alt={item.name} fluid rounded/>
                  </react_bootstrap_1.Col>
                  <react_bootstrap_1.Col md={3}>
                    <react_router_dom_1.Link to={`/product/${item.product}`}>{item.name}</react_router_dom_1.Link>
                  </react_bootstrap_1.Col>
                  <react_bootstrap_1.Col md={2}>${item.price}</react_bootstrap_1.Col>
                  <react_bootstrap_1.Col md={2}>
                    <react_bootstrap_1.Form.Control as="select" value={item.qty} onChange={(e) => dispatch((0, cartActions_1.addToCart)(item.product, Number(e.target.value)))}>
                      {[...Array(item.countInStock).keys()].map((x) => (<option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>))}
                    </react_bootstrap_1.Form.Control>
                  </react_bootstrap_1.Col>
                  <react_bootstrap_1.Col md={2}>
                    <react_bootstrap_1.Button type="button" variant="light" onClick={() => removeFromCartHandler(item.product)}>
                      <i className="fas fa-trash"></i>
                    </react_bootstrap_1.Button>
                  </react_bootstrap_1.Col>
                </react_bootstrap_1.Row>
              </react_bootstrap_1.ListGroup.Item>))}
          </react_bootstrap_1.ListGroup>)}
      </react_bootstrap_1.Col>
      <react_bootstrap_1.Col md={4}>
        <react_bootstrap_1.Card>
          <react_bootstrap_1.ListGroup variant="flush">
            <react_bootstrap_1.ListGroup.Item>
              <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>$
              {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
            </react_bootstrap_1.ListGroup.Item>
            <react_bootstrap_1.ListGroup.Item>
              <react_bootstrap_1.Button type="button" className="btn-block" disabled={cartItems.length === 0} onClick={checkoutHandler}>
                Proceed To Checkout
              </react_bootstrap_1.Button>
            </react_bootstrap_1.ListGroup.Item>
          </react_bootstrap_1.ListGroup>
        </react_bootstrap_1.Card>
      </react_bootstrap_1.Col>
    </react_bootstrap_1.Row>);
};
exports.default = CartScreen;
