"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_bootstrap_1 = require("react-bootstrap");
const Header_1 = __importDefault(require("./components/Header"));
const Footer_1 = __importDefault(require("./components/Footer"));
const HomeScreen_1 = __importDefault(require("./screens/HomeScreen"));
const ProductScreen_1 = __importDefault(require("./screens/ProductScreen"));
const CartScreen_1 = __importDefault(require("./screens/CartScreen"));
const LoginScreen_1 = __importDefault(require("./screens/LoginScreen"));
const RegisterScreen_1 = __importDefault(require("./screens/RegisterScreen"));
const ProfileScreen_1 = __importDefault(require("./screens/ProfileScreen"));
const ShippingScreen_1 = __importDefault(require("./screens/ShippingScreen"));
const PaymentScreen_1 = __importDefault(require("./screens/PaymentScreen"));
const PlaceOrderScreen_1 = __importDefault(require("./screens/PlaceOrderScreen"));
const OrderScreen_1 = __importDefault(require("./screens/OrderScreen"));
const UserListScreen_1 = __importDefault(require("./screens/UserListScreen"));
const UserEditScreen_1 = __importDefault(require("./screens/UserEditScreen"));
const ProductListScreen_1 = __importDefault(require("./screens/ProductListScreen"));
const ProductEditScreen_1 = __importDefault(require("./screens/ProductEditScreen"));
const OrderListScreen_1 = __importDefault(require("./screens/OrderListScreen"));
const App = () => {
    return (<react_router_dom_1.BrowserRouter>
      <Header_1.default />
      <main className='py-3'>
        <react_bootstrap_1.Container>
          <react_router_dom_1.Route path='/order/:id' component={OrderScreen_1.default}/>
          <react_router_dom_1.Route path='/shipping' component={ShippingScreen_1.default}/>
          <react_router_dom_1.Route path='/payment' component={PaymentScreen_1.default}/>
          <react_router_dom_1.Route path='/placeorder' component={PlaceOrderScreen_1.default}/>
          <react_router_dom_1.Route path='/login' component={LoginScreen_1.default}/>
          <react_router_dom_1.Route path='/register' component={RegisterScreen_1.default}/>
          <react_router_dom_1.Route path='/profile' component={ProfileScreen_1.default}/>
          <react_router_dom_1.Route path='/product/:id' component={ProductScreen_1.default}/>
          <react_router_dom_1.Route path='/cart/:id?' component={CartScreen_1.default}/>
          <react_router_dom_1.Route path='/admin/userlist' component={UserListScreen_1.default}/>
          <react_router_dom_1.Route path='/admin/user/:id/edit' component={UserEditScreen_1.default}/>
          <react_router_dom_1.Route path='/admin/productlist' component={ProductListScreen_1.default} exact/>
          <react_router_dom_1.Route path='/admin/productlist/:pageNumber' component={ProductListScreen_1.default} exact/>
          <react_router_dom_1.Route path='/admin/product/:id/edit' component={ProductEditScreen_1.default}/>
          <react_router_dom_1.Route path='/admin/orderlist' component={OrderListScreen_1.default}/>
          <react_router_dom_1.Route path='/search/:keyword' component={HomeScreen_1.default} exact/>
          <react_router_dom_1.Route path='/page/:pageNumber' component={HomeScreen_1.default} exact/>
          <react_router_dom_1.Route path='/search/:keyword/page/:pageNumber' component={HomeScreen_1.default} exact/>
          <react_router_dom_1.Route path='/' component={HomeScreen_1.default} exact/>
        </react_bootstrap_1.Container>
      </main>
      <Footer_1.default />
    </react_router_dom_1.BrowserRouter>);
};
exports.default = App;
