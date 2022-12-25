"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const FormContainer = ({ children }) => {
    return (<react_bootstrap_1.Container>
      <react_bootstrap_1.Row className="justify-content-md-center">
        <react_bootstrap_1.Col xs={12} md={6}>
          {children}
        </react_bootstrap_1.Col>
      </react_bootstrap_1.Row>
    </react_bootstrap_1.Container>);
};
exports.default = FormContainer;
