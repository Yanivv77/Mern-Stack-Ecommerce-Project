"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const react_router_bootstrap_1 = require("react-router-bootstrap");
const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (<react_bootstrap_1.Nav className="justify-content-center mb-4">
      <react_bootstrap_1.Nav.Item>
        {step1 ? (<react_router_bootstrap_1.LinkContainer to="/login">
            <react_bootstrap_1.Nav.Link>Sign In</react_bootstrap_1.Nav.Link>
          </react_router_bootstrap_1.LinkContainer>) : (<react_bootstrap_1.Nav.Link disabled>Sign In</react_bootstrap_1.Nav.Link>)}
      </react_bootstrap_1.Nav.Item>

      <react_bootstrap_1.Nav.Item>
        {step2 ? (<react_router_bootstrap_1.LinkContainer to="/shipping">
            <react_bootstrap_1.Nav.Link>Shipping</react_bootstrap_1.Nav.Link>
          </react_router_bootstrap_1.LinkContainer>) : (<react_bootstrap_1.Nav.Link disabled>Shipping</react_bootstrap_1.Nav.Link>)}
      </react_bootstrap_1.Nav.Item>

      <react_bootstrap_1.Nav.Item>
        {step3 ? (<react_router_bootstrap_1.LinkContainer to="/payment">
            <react_bootstrap_1.Nav.Link>Payment</react_bootstrap_1.Nav.Link>
          </react_router_bootstrap_1.LinkContainer>) : (<react_bootstrap_1.Nav.Link disabled>Payment</react_bootstrap_1.Nav.Link>)}
      </react_bootstrap_1.Nav.Item>

      <react_bootstrap_1.Nav.Item>
        {step4 ? (<react_router_bootstrap_1.LinkContainer to="/placeorder">
            <react_bootstrap_1.Nav.Link>Place Order</react_bootstrap_1.Nav.Link>
          </react_router_bootstrap_1.LinkContainer>) : (<react_bootstrap_1.Nav.Link disabled>Place Order</react_bootstrap_1.Nav.Link>)}
      </react_bootstrap_1.Nav.Item>
    </react_bootstrap_1.Nav>);
};
exports.default = CheckoutSteps;
