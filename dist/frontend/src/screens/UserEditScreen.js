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
const userConstants_1 = require("../constants/userConstants");
const UserEditScreen = ({ match, history }) => {
    const userId = match.params.id;
    const [name, setName] = (0, react_1.useState)('');
    const [email, setEmail] = (0, react_1.useState)('');
    const [isAdmin, setIsAdmin] = (0, react_1.useState)(false);
    const dispatch = (0, react_redux_1.useDispatch)();
    const userDetails = (0, react_redux_1.useSelector)((state) => state.userDetails);
    const { loading, error, user } = userDetails;
    const userUpdate = (0, react_redux_1.useSelector)((state) => state.userUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;
    (0, react_1.useEffect)(() => {
        if (successUpdate) {
            dispatch({ type: userConstants_1.USER_UPDATE_RESET });
            history.push('/admin/userlist');
        }
        else {
            if (!user.name || user._id !== userId) {
                dispatch((0, userActions_1.getUserDetails)(userId));
            }
            else {
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.isAdmin);
            }
        }
    }, [dispatch, history, userId, user, successUpdate]);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch((0, userActions_1.updateUser)({ _id: userId, name, email, isAdmin }));
    };
    return (<>
      <react_router_dom_1.Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </react_router_dom_1.Link>
      <FormContainer_1.default>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader_1.default />}
        {errorUpdate && <Message_1.default variant="danger">{errorUpdate}</Message_1.default>}
        {loading ? (<Loader_1.default />) : error ? (<Message_1.default variant="danger">{error}</Message_1.default>) : (<react_bootstrap_1.Form onSubmit={submitHandler}>
            <react_bootstrap_1.Form.Group controlId="name">
              <react_bootstrap_1.Form.Label>Name</react_bootstrap_1.Form.Label>
              <react_bootstrap_1.Form.Control type="name" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)}></react_bootstrap_1.Form.Control>
            </react_bootstrap_1.Form.Group>

            <react_bootstrap_1.Form.Group controlId="email">
              <react_bootstrap_1.Form.Label>Email Address</react_bootstrap_1.Form.Label>
              <react_bootstrap_1.Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}></react_bootstrap_1.Form.Control>
            </react_bootstrap_1.Form.Group>

            <react_bootstrap_1.Form.Group controlId="isadmin">
              <react_bootstrap_1.Form.Check type="checkbox" label="Is Admin" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}></react_bootstrap_1.Form.Check>
            </react_bootstrap_1.Form.Group>

            <react_bootstrap_1.Button type="submit" variant="primary">
              Update
            </react_bootstrap_1.Button>
          </react_bootstrap_1.Form>)}
      </FormContainer_1.default>
    </>);
};
exports.default = UserEditScreen;
