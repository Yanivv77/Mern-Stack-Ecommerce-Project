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
const react_bootstrap_1 = require("react-bootstrap");
const react_redux_1 = require("react-redux");
const FormContainer_1 = __importDefault(require("../components/FormContainer"));
const CheckoutSteps_1 = __importDefault(require("../components/CheckoutSteps"));
const cartActions_1 = require("../actions/cartActions");
const PaymentScreen = ({ history }) => {
    const cart = (0, react_redux_1.useSelector)((state) => state.cart);
    const { shippingAddress } = cart;
    if (!shippingAddress.address) {
        history.push('/shipping');
    }
    const [paymentMethod, setPaymentMethod] = (0, react_1.useState)('PayPal');
    const dispatch = (0, react_redux_1.useDispatch)();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch((0, cartActions_1.savePaymentMethod)(paymentMethod));
        history.push('/placeorder');
    };
    return (<FormContainer_1.default>
      <CheckoutSteps_1.default step1 step2 step3/>
      <h1>Payment Method</h1>
      <react_bootstrap_1.Form onSubmit={submitHandler}>
        <react_bootstrap_1.Form.Group>
          <react_bootstrap_1.Form.Label as="legend">Select Method</react_bootstrap_1.Form.Label>
          <react_bootstrap_1.Col>
            <react_bootstrap_1.Form.Check type="radio" label="PayPal or Credit Card" id="PayPal" name="paymentMethod" value="PayPal" checked onChange={(e) => setPaymentMethod(e.target.value)}></react_bootstrap_1.Form.Check>
            {/* <Form.Check
          type='radio'
          label='Stripe'
          id='Stripe'
          name='paymentMethod'
          value='Stripe'
          onChange={(e) => setPaymentMethod(e.target.value)}
        ></Form.Check> */}
          </react_bootstrap_1.Col>
        </react_bootstrap_1.Form.Group>

        <react_bootstrap_1.Button type="submit" variant="primary">
          Continue
        </react_bootstrap_1.Button>
      </react_bootstrap_1.Form>
    </FormContainer_1.default>);
};
exports.default = PaymentScreen;
