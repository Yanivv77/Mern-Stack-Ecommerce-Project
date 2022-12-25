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
const Loader_1 = __importDefault(require("./Loader"));
const Message_1 = __importDefault(require("./Message"));
const productActions_1 = require("../actions/productActions");
const ProductCarousel = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const productTopRated = (0, react_redux_1.useSelector)((state) => state.productTopRated);
    const { loading, error, products } = productTopRated;
    (0, react_1.useEffect)(() => {
        dispatch((0, productActions_1.listTopProducts)());
    }, [dispatch]);
    return loading ? (<Loader_1.default />) : error ? (<Message_1.default variant="danger">{error}</Message_1.default>) : (<react_bootstrap_1.Carousel pause="hover" className="bg-dark">
      {products.map((product) => (<react_bootstrap_1.Carousel.Item key={product._id}>
          <react_router_dom_1.Link to={`/product/${product._id}`}>
            <react_bootstrap_1.Image src={product.image} alt={product.name} fluid/>
            <react_bootstrap_1.Carousel.Caption className="carousel-caption">
              <h2>
                {product.name} (${product.price})
              </h2>
            </react_bootstrap_1.Carousel.Caption>
          </react_router_dom_1.Link>
        </react_bootstrap_1.Carousel.Item>))}
    </react_bootstrap_1.Carousel>);
};
exports.default = ProductCarousel;
