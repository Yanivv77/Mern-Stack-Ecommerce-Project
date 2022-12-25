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
const Loader_1 = __importDefault(require("../components/Loader"));
const FormContainer_1 = __importDefault(require("../components/FormContainer"));
const userActions_1 = require("../actions/userActions");
const LoginScreen = ({ location, history }) => {
    const [email, setEmail] = (0, react_1.useState)('');
    const [password, setPassword] = (0, react_1.useState)('');
    const dispatch = (0, react_redux_1.useDispatch)();
    const userLogin = (0, react_redux_1.useSelector)((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;
    const redirect = location.search ? location.search.split('=')[1] : '/';
    (0, react_1.useEffect)(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch((0, userActions_1.login)(email, password));
    };
    return (<FormContainer_1.default>
      <h1>Sign In</h1>
      {error && <Message_1.default variant="danger">{error}</Message_1.default>}
      {loading && <Loader_1.default />}
      <react_bootstrap_1.Form onSubmit={submitHandler}>
        <react_bootstrap_1.Form.Group controlId="email">
          <react_bootstrap_1.Form.Label>Email Address</react_bootstrap_1.Form.Label>
          <react_bootstrap_1.Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}></react_bootstrap_1.Form.Control>
        </react_bootstrap_1.Form.Group>

        <react_bootstrap_1.Form.Group controlId="password">
          <react_bootstrap_1.Form.Label>Password</react_bootstrap_1.Form.Label>
          <react_bootstrap_1.Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}></react_bootstrap_1.Form.Control>
        </react_bootstrap_1.Form.Group>

        <react_bootstrap_1.Button type="submit" variant="primary">
          Sign In
        </react_bootstrap_1.Button>
      </react_bootstrap_1.Form>

      <react_bootstrap_1.Row className="py-3">
        <react_bootstrap_1.Col>
          New Customer? <react_router_dom_1.Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</react_router_dom_1.Link>
        </react_bootstrap_1.Col>
      </react_bootstrap_1.Row>
    </FormContainer_1.default>);
};
exports.default = LoginScreen;
