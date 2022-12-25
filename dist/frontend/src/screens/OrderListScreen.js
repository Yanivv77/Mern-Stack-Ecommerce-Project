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
const react_router_bootstrap_1 = require("react-router-bootstrap");
const react_bootstrap_1 = require("react-bootstrap");
const react_redux_1 = require("react-redux");
const Message_1 = __importDefault(require("../components/Message"));
const Loader_1 = __importDefault(require("../components/Loader"));
const orderActions_1 = require("../actions/orderActions");
const OrderListScreen = ({ history }) => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const orderList = (0, react_redux_1.useSelector)((state) => state.orderList);
    const { loading, error, orders } = orderList;
    const userLogin = (0, react_redux_1.useSelector)((state) => state.userLogin);
    const { userInfo } = userLogin;
    (0, react_1.useEffect)(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch((0, orderActions_1.listOrders)());
        }
        else {
            history.push('/login');
        }
    }, [dispatch, history, userInfo]);
    return (<>
      <h1>Orders</h1>
      {loading ? (<Loader_1.default />) : error ? (<Message_1.default variant="danger">{error}</Message_1.default>) : (<react_bootstrap_1.Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
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
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : <i className="fas fa-times" style={{ color: 'red' }}></i>}</td>
                <td>
                  {order.isDelivered ? order.deliveredAt.substring(0, 10) : <i className="fas fa-times" style={{ color: 'red' }}></i>}
                </td>
                <td>
                  <react_router_bootstrap_1.LinkContainer to={`/order/${order._id}`}>
                    <react_bootstrap_1.Button variant="light" className="btn-sm">
                      Details
                    </react_bootstrap_1.Button>
                  </react_router_bootstrap_1.LinkContainer>
                </td>
              </tr>))}
          </tbody>
        </react_bootstrap_1.Table>)}
    </>);
};
exports.default = OrderListScreen;
