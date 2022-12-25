"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const Loader = () => {
    return (<react_bootstrap_1.Spinner animation="border" role="status" style={{
            width: '100px',
            height: '100px',
            margin: 'auto',
            display: 'block',
        }}>
      <span className="sr-only">Loading...</span>
    </react_bootstrap_1.Spinner>);
};
exports.default = Loader;
