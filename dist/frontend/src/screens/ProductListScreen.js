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
const Paginate_1 = __importDefault(require("../components/Paginate"));
const productActions_1 = require("../actions/productActions");
const productConstants_1 = require("../constants/productConstants");
const ProductListScreen = ({ history, match }) => {
    const pageNumber = match.params.pageNumber || 1;
    const dispatch = (0, react_redux_1.useDispatch)();
    const productList = (0, react_redux_1.useSelector)((state) => state.productList);
    const { loading, error, products, page, pages } = productList;
    const productDelete = (0, react_redux_1.useSelector)((state) => state.productDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;
    const productCreate = (0, react_redux_1.useSelector)((state) => state.productCreate);
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate;
    const userLogin = (0, react_redux_1.useSelector)((state) => state.userLogin);
    const { userInfo } = userLogin;
    (0, react_1.useEffect)(() => {
        dispatch({ type: productConstants_1.PRODUCT_CREATE_RESET });
        if (!userInfo || !userInfo.isAdmin) {
            history.push('/login');
        }
        if (successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`);
        }
        else {
            dispatch((0, productActions_1.listProducts)('', pageNumber));
        }
    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, pageNumber]);
    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch((0, productActions_1.deleteProduct)(id));
        }
    };
    const createProductHandler = () => {
        dispatch((0, productActions_1.createProduct)());
    };
    return (<>
      <react_bootstrap_1.Row className="align-items-center">
        <react_bootstrap_1.Col>
          <h1>Products</h1>
        </react_bootstrap_1.Col>
        <react_bootstrap_1.Col className="text-right">
          <react_bootstrap_1.Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </react_bootstrap_1.Button>
        </react_bootstrap_1.Col>
      </react_bootstrap_1.Row>
      {loadingDelete && <Loader_1.default />}
      {errorDelete && <Message_1.default variant="danger">{errorDelete}</Message_1.default>}
      {loadingCreate && <Loader_1.default />}
      {errorCreate && <Message_1.default variant="danger">{errorCreate}</Message_1.default>}
      {loading ? (<Loader_1.default />) : error ? (<Message_1.default variant="danger">{error}</Message_1.default>) : (<>
          <react_bootstrap_1.Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (<tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <react_router_bootstrap_1.LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <react_bootstrap_1.Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </react_bootstrap_1.Button>
                    </react_router_bootstrap_1.LinkContainer>
                    <react_bootstrap_1.Button variant="danger" className="btn-sm" onClick={() => deleteHandler(product._id)}>
                      <i className="fas fa-trash"></i>
                    </react_bootstrap_1.Button>
                  </td>
                </tr>))}
            </tbody>
          </react_bootstrap_1.Table>
          <Paginate_1.default pages={pages} page={page} isAdmin={true}/>
        </>)}
    </>);
};
exports.default = ProductListScreen;
