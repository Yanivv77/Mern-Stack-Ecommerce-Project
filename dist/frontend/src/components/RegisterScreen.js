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
const RegisterScreen = ({ location, history }) => {
    const [name, setName] = (0, react_1.useState)('');
    const [email, setEmail] = (0, react_1.useState)('');
    const [password, setPassword] = (0, react_1.useState)('');
    const [confirmPassword, setConfirmPassword] = (0, react_1.useState)('');
    const [message, setMessage] = (0, react_1.useState)(null);
    const dispatch = (0, react_redux_1.useDispatch)();
    const userRegister = (0, react_redux_1.useSelector)((state) => state.userRegister);
    const { loading, error, userInfo } = userRegister;
    const redirect = location.search ? location.search.split('=')[1] : '/';
    (0, react_1.useEffect)(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);
    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        }
        else {
            dispatch((0, userActions_1.register)(name, email, password));
        }
    };
    return (<FormContainer_1.default>
      <h1>Sign Up</h1>
      {message && <Message_1.default variant="danger">{message}</Message_1.default>}
      {error && <Message_1.default variant="danger">{error}</Message_1.default>}
      {loading && <Loader_1.default />}
      <react_bootstrap_1.Form onSubmit={submitHandler}>
        <react_bootstrap_1.Form.Group controlId="name">
          <react_bootstrap_1.Form.Label>Name</react_bootstrap_1.Form.Label>
          <react_bootstrap_1.Form.Control type="name" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)}></react_bootstrap_1.Form.Control>
        </react_bootstrap_1.Form.Group>

        <react_bootstrap_1.Form.Group controlId="email">
          <react_bootstrap_1.Form.Label>Email Address</react_bootstrap_1.Form.Label>
          <react_bootstrap_1.Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}></react_bootstrap_1.Form.Control>
        </react_bootstrap_1.Form.Group>

        <react_bootstrap_1.Form.Group controlId="password">
          <react_bootstrap_1.Form.Label>Password</react_bootstrap_1.Form.Label>
          <react_bootstrap_1.Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}></react_bootstrap_1.Form.Control>
        </react_bootstrap_1.Form.Group>

        <react_bootstrap_1.Form.Group controlId="confirmPassword">
          <react_bootstrap_1.Form.Label>Confirm Password</react_bootstrap_1.Form.Label>
          <react_bootstrap_1.Form.Control type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></react_bootstrap_1.Form.Control>
        </react_bootstrap_1.Form.Group>

        <react_bootstrap_1.Button type="submit" variant="primary">
          Register
        </react_bootstrap_1.Button>
      </react_bootstrap_1.Form>

      <react_bootstrap_1.Row className="py-3">
        <react_bootstrap_1.Col>
          Have an Account? <react_router_dom_1.Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login </react_router_dom_1.Link>
        </react_bootstrap_1.Col>
      </react_bootstrap_1.Row>
    </FormContainer_1.default>);
};
exports.default = RegisterScreen;
