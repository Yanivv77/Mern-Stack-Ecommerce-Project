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
const userActions_1 = require("../actions/userActions");
const UserListScreen = ({ history }) => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const userList = (0, react_redux_1.useSelector)((state) => state.userList);
    const { loading, error, users } = userList;
    const userLogin = (0, react_redux_1.useSelector)((state) => state.userLogin);
    const { userInfo } = userLogin;
    const userDelete = (0, react_redux_1.useSelector)((state) => state.userDelete);
    const { success: successDelete } = userDelete;
    (0, react_1.useEffect)(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch((0, userActions_1.listUsers)());
        }
        else {
            history.push('/login');
        }
    }, [dispatch, history, successDelete, userInfo]);
    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch((0, userActions_1.deleteUser)(id));
        }
    };
    return (<>
      <h1>Users</h1>
      {loading ? (<Loader_1.default />) : error ? (<Message_1.default variant="danger">{error}</Message_1.default>) : (<react_bootstrap_1.Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (<tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (<i className="fas fa-check" style={{ color: 'green' }}></i>) : (<i className="fas fa-times" style={{ color: 'red' }}></i>)}
                </td>
                <td>
                  <react_router_bootstrap_1.LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <react_bootstrap_1.Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </react_bootstrap_1.Button>
                  </react_router_bootstrap_1.LinkContainer>
                  <react_bootstrap_1.Button variant="danger" className="btn-sm" onClick={() => deleteHandler(user._id)}>
                    <i className="fas fa-trash"></i>
                  </react_bootstrap_1.Button>
                </td>
              </tr>))}
          </tbody>
        </react_bootstrap_1.Table>)}
    </>);
};
exports.default = UserListScreen;
