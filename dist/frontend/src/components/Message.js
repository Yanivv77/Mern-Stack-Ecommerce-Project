"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const Message = ({ variant, children }) => {
    return <react_bootstrap_1.Alert variant={variant}>{children}</react_bootstrap_1.Alert>;
};
Message.defaultProps = {
    variant: 'info',
};
exports.default = Message;
