"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const Footer = () => {
    return (<footer>
      <react_bootstrap_1.Container>
        <react_bootstrap_1.Row>
          <react_bootstrap_1.Col className="text-center py-3">Copyright &copy; Yaniv</react_bootstrap_1.Col>
        </react_bootstrap_1.Row>
      </react_bootstrap_1.Container>
    </footer>);
};
exports.default = Footer;
