"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_bootstrap_1 = require("react-bootstrap");
const Rating_1 = __importDefault(require("./Rating"));
const Product = ({ product }) => {
    return (<react_bootstrap_1.Card className="my-3 p-3 rounded">
      <react_router_dom_1.Link to={`/product/${product._id}`}>
        <react_bootstrap_1.Card.Img src={product.image} variant="top"/>
      </react_router_dom_1.Link>

      <react_bootstrap_1.Card.Body>
        <react_router_dom_1.Link to={`/product/${product._id}`}>
          <react_bootstrap_1.Card.Title as="div">
            <strong>{product.name}</strong>
          </react_bootstrap_1.Card.Title>
        </react_router_dom_1.Link>

        <react_bootstrap_1.Card.Text as="div">
          <Rating_1.default value={product.rating} text={`${product.numReviews} reviews`}/>
        </react_bootstrap_1.Card.Text>

        <react_bootstrap_1.Card.Text as="h3">${product.price}</react_bootstrap_1.Card.Text>
      </react_bootstrap_1.Card.Body>
    </react_bootstrap_1.Card>);
};
exports.default = Product;
