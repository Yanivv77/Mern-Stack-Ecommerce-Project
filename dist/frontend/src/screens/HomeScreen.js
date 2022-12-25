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
const react_redux_1 = require("react-redux");
const react_bootstrap_1 = require("react-bootstrap");
const Product_1 = __importDefault(require("../components/Product"));
const Message_1 = __importDefault(require("../components/Message"));
const Loader_1 = __importDefault(require("../components/Loader"));
const Paginate_1 = __importDefault(require("../components/Paginate"));
const ProductCarousel_1 = __importDefault(require("../components/ProductCarousel"));
const Meta_1 = __importDefault(require("../components/Meta"));
const productActions_1 = require("../actions/productActions");
const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword;
    const pageNumber = match.params.pageNumber || 1;
    const dispatch = (0, react_redux_1.useDispatch)();
    const productList = (0, react_redux_1.useSelector)((state) => state.productList);
    const { loading, error, products, page, pages } = productList;
    (0, react_1.useEffect)(() => {
        dispatch((0, productActions_1.listProducts)(keyword, pageNumber));
    }, [dispatch, keyword, pageNumber]);
    return (<>
      <Meta_1.default />
      {!keyword ? (<ProductCarousel_1.default />) : (<react_router_dom_1.Link to="/" className="btn btn-light">
          Go Back
        </react_router_dom_1.Link>)}
      <h1>Latest Products</h1>
      {loading ? (<Loader_1.default />) : error ? (<Message_1.default variant="danger">{error}</Message_1.default>) : (<>
          <react_bootstrap_1.Row>
            {products.map((product) => (<react_bootstrap_1.Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product_1.default product={product}/>
              </react_bootstrap_1.Col>))}
          </react_bootstrap_1.Row>
          <Paginate_1.default pages={pages} page={page} keyword={keyword ? keyword : ''}/>
        </>)}
    </>);
};
exports.default = HomeScreen;
