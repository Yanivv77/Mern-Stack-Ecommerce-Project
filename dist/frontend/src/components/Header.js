"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_redux_1 = require("react-redux");
const react_router_bootstrap_1 = require("react-router-bootstrap");
const react_bootstrap_1 = require("react-bootstrap");
const SearchBox_1 = __importDefault(require("./SearchBox"));
const userActions_1 = require("../actions/userActions");
const Header = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const userLogin = (0, react_redux_1.useSelector)((state) => state.userLogin);
    const { userInfo } = userLogin;
    const logoutHandler = () => {
        dispatch((0, userActions_1.logout)());
    };
    return (<header>
      <react_bootstrap_1.Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <react_bootstrap_1.Container>
          <react_router_bootstrap_1.LinkContainer to="/">
            <react_bootstrap_1.Navbar.Brand>Yaniv-Shop</react_bootstrap_1.Navbar.Brand>
          </react_router_bootstrap_1.LinkContainer>
          <react_bootstrap_1.Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <react_bootstrap_1.Navbar.Collapse id="basic-navbar-nav">
            <react_router_dom_1.Route render={({ history }) => <SearchBox_1.default history={history}/>}/>
            <react_bootstrap_1.Nav className="ml-auto">
              <react_router_bootstrap_1.LinkContainer to="/cart">
                <react_bootstrap_1.Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart
                </react_bootstrap_1.Nav.Link>
              </react_router_bootstrap_1.LinkContainer>
              {userInfo ? (<react_bootstrap_1.NavDropdown title={userInfo.name} id="username">
                  <react_router_bootstrap_1.LinkContainer to="/profile">
                    <react_bootstrap_1.NavDropdown.Item>Profile</react_bootstrap_1.NavDropdown.Item>
                  </react_router_bootstrap_1.LinkContainer>
                  <react_bootstrap_1.NavDropdown.Item onClick={logoutHandler}>Logout</react_bootstrap_1.NavDropdown.Item>
                </react_bootstrap_1.NavDropdown>) : (<react_router_bootstrap_1.LinkContainer to="/login">
                  <react_bootstrap_1.Nav.Link>
                    <i className="fas fa-user"></i> Sign In
                  </react_bootstrap_1.Nav.Link>
                </react_router_bootstrap_1.LinkContainer>)}
              {userInfo && userInfo.isAdmin && (<react_bootstrap_1.NavDropdown title="Admin" id="adminmenu">
                  <react_router_bootstrap_1.LinkContainer to="/admin/userlist">
                    <react_bootstrap_1.NavDropdown.Item>Users</react_bootstrap_1.NavDropdown.Item>
                  </react_router_bootstrap_1.LinkContainer>
                  <react_router_bootstrap_1.LinkContainer to="/admin/productlist">
                    <react_bootstrap_1.NavDropdown.Item>Products</react_bootstrap_1.NavDropdown.Item>
                  </react_router_bootstrap_1.LinkContainer>
                  <react_router_bootstrap_1.LinkContainer to="/admin/orderlist">
                    <react_bootstrap_1.NavDropdown.Item>Orders</react_bootstrap_1.NavDropdown.Item>
                  </react_router_bootstrap_1.LinkContainer>
                </react_bootstrap_1.NavDropdown>)}
            </react_bootstrap_1.Nav>
          </react_bootstrap_1.Navbar.Collapse>
        </react_bootstrap_1.Container>
      </react_bootstrap_1.Navbar>
    </header>);
};
exports.default = Header;
