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
const react_router_bootstrap_1 = require("react-router-bootstrap");
const react_redux_1 = require("react-redux");
const Message_1 = __importDefault(require("../components/Message"));
const Loader_1 = __importDefault(require("../components/Loader"));
const userActions_1 = require("../actions/userActions");
const orderActions_1 = require("../actions/orderActions");
const userConstants_1 = require("../constants/userConstants");
const ProfileScreen = ({ location, history }) => {
    const [name, setName] = (0, react_1.useState)('');
    const [email, setEmail] = (0, react_1.useState)('');
    const [password, setPassword] = (0, react_1.useState)('');
    const [confirmPassword, setConfirmPassword] = (0, react_1.useState)('');
    const [message, setMessage] = (0, react_1.useState)(null);
    const dispatch = (0, react_redux_1.useDispatch)();
    const userDetails = (0, react_redux_1.useSelector)((state) => state.userDetails);
    const { loading, error, user } = userDetails;
    const userLogin = (0, react_redux_1.useSelector)((state) => state.userLogin);
    const { userInfo } = userLogin;
    const userUpdateProfile = (0, react_redux_1.useSelector)((state) => state.userUpdateProfile);
    const { success } = userUpdateProfile;
    const orderListMy = (0, react_redux_1.useSelector)((state) => state.orderListMy);
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;
    (0, react_1.useEffect)(() => {
        if (!userInfo) {
            history.push('/login');
        }
        else {
            if (!user || !user.name || success) {
                dispatch({ type: userConstants_1.USER_UPDATE_PROFILE_RESET });
                dispatch((0, userActions_1.getUserDetails)('profile'));
                dispatch((0, orderActions_1.listMyOrders)());
            }
            else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [dispatch, history, userInfo, user, success]);
    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        }
        else {
            dispatch((0, userActions_1.updateUserProfile)({ id: user._id, name, email, password }));
        }
    };
    return (<react_bootstrap_1.Row>
      <react_bootstrap_1.Col md={3}>
        <h2>User Profile</h2>
        {message && <Message_1.default variant="danger">{message}</Message_1.default>}
        
        {success && <Message_1.default variant="success">Profile Updated</Message_1.default>}
        {loading ? (<Loader_1.default />) : error ? (<Message_1.default variant="danger">{error}</Message_1.default>) : (<react_bootstrap_1.Form onSubmit={submitHandler}>
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
              Update
            </react_bootstrap_1.Button>
          </react_bootstrap_1.Form>)}
      </react_bootstrap_1.Col>
      <react_bootstrap_1.Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? (<Loader_1.default />) : errorOrders ? (<Message_1.default variant="danger">{errorOrders}</Message_1.default>) : (<react_bootstrap_1.Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (<tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.isPaid ? order.paidAt.substring(0, 10) : <i className="fas fa-times" style={{ color: 'red' }}></i>}</td>
                  <td>
                    {order.isDelivered ? order.deliveredAt.substring(0, 10) : <i className="fas fa-times" style={{ color: 'red' }}></i>}
                  </td>
                  <td>
                    <react_router_bootstrap_1.LinkContainer to={`/order/${order._id}`}>
                      <react_bootstrap_1.Button className="btn-sm" variant="light">
                        Details
                      </react_bootstrap_1.Button>
                    </react_router_bootstrap_1.LinkContainer>
                  </td>
                </tr>))}
            </tbody>
          </react_bootstrap_1.Table>)}
      </react_bootstrap_1.Col>
    </react_bootstrap_1.Row>);
};
exports.default = ProfileScreen;
