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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_bootstrap_1 = require("react-bootstrap");
const react_redux_1 = require("react-redux");
const Message_1 = __importDefault(require("../components/Message"));
const Loader_1 = __importDefault(require("../components/Loader"));
const FormContainer_1 = __importDefault(require("../components/FormContainer"));
const productActions_1 = require("../actions/productActions");
const productConstants_1 = require("../constants/productConstants");
const ProductEditScreen = ({ match, history }) => {
    const productId = match.params.id;
    const [name, setName] = (0, react_1.useState)('');
    const [price, setPrice] = (0, react_1.useState)(0);
    const [image, setImage] = (0, react_1.useState)('');
    const [brand, setBrand] = (0, react_1.useState)('');
    const [category, setCategory] = (0, react_1.useState)('');
    const [countInStock, setCountInStock] = (0, react_1.useState)(0);
    const [description, setDescription] = (0, react_1.useState)('');
    const [uploading, setUploading] = (0, react_1.useState)(false);
    const dispatch = (0, react_redux_1.useDispatch)();
    const productDetails = (0, react_redux_1.useSelector)((state) => state.productDetails);
    const { loading, error, product } = productDetails;
    const productUpdate = (0, react_redux_1.useSelector)((state) => state.productUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;
    (0, react_1.useEffect)(() => {
        if (successUpdate) {
            dispatch({ type: productConstants_1.PRODUCT_UPDATE_RESET });
            history.push('/admin/productlist');
        }
        else {
            if (!product.name || product._id !== productId) {
                dispatch((0, productActions_1.listProductDetails)(productId));
            }
            else {
                setName(product.name);
                setPrice(product.price);
                setImage(product.image);
                setBrand(product.brand);
                setCategory(product.category);
                setCountInStock(product.countInStock);
                setDescription(product.description);
            }
        }
    }, [dispatch, history, productId, product, successUpdate]);
    const uploadFileHandler = (e) => __awaiter(void 0, void 0, void 0, function* () {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };
            const { data } = yield axios_1.default.post('/api/upload', formData, config);
            setImage(data);
            setUploading(false);
        }
        catch (error) {
            console.error(error);
            setUploading(false);
        }
    });
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch((0, productActions_1.updateProduct)({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            description,
            countInStock,
        }));
    };
    return (<>
      <react_router_dom_1.Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </react_router_dom_1.Link>
      <FormContainer_1.default>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader_1.default />}
        {errorUpdate && <Message_1.default variant="danger">{errorUpdate}</Message_1.default>}
        {loading ? (<Loader_1.default />) : error ? (<Message_1.default variant="danger">{error}</Message_1.default>) : (<react_bootstrap_1.Form onSubmit={submitHandler}>
            <react_bootstrap_1.Form.Group controlId="name">
              <react_bootstrap_1.Form.Label>Name</react_bootstrap_1.Form.Label>
              <react_bootstrap_1.Form.Control type="name" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)}></react_bootstrap_1.Form.Control>
            </react_bootstrap_1.Form.Group>

            <react_bootstrap_1.Form.Group controlId="price">
              <react_bootstrap_1.Form.Label>Price</react_bootstrap_1.Form.Label>
              <react_bootstrap_1.Form.Control type="number" placeholder="Enter price" value={price} onChange={(e) => setPrice(e.target.value)}></react_bootstrap_1.Form.Control>
            </react_bootstrap_1.Form.Group>

            <react_bootstrap_1.Form.Group controlId="image">
              <react_bootstrap_1.Form.Label>Image</react_bootstrap_1.Form.Label>
              <react_bootstrap_1.Form.Control type="text" placeholder="Enter image url" value={image} onChange={(e) => setImage(e.target.value)}></react_bootstrap_1.Form.Control>
              <react_bootstrap_1.Form.File id="image-file" label="Choose File" custom onChange={uploadFileHandler}></react_bootstrap_1.Form.File>
              {uploading && <Loader_1.default />}
            </react_bootstrap_1.Form.Group>

            <react_bootstrap_1.Form.Group controlId="brand">
              <react_bootstrap_1.Form.Label>Brand</react_bootstrap_1.Form.Label>
              <react_bootstrap_1.Form.Control type="text" placeholder="Enter brand" value={brand} onChange={(e) => setBrand(e.target.value)}></react_bootstrap_1.Form.Control>
            </react_bootstrap_1.Form.Group>

            <react_bootstrap_1.Form.Group controlId="countInStock">
              <react_bootstrap_1.Form.Label>Count In Stock</react_bootstrap_1.Form.Label>
              <react_bootstrap_1.Form.Control type="number" placeholder="Enter countInStock" value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></react_bootstrap_1.Form.Control>
            </react_bootstrap_1.Form.Group>

            <react_bootstrap_1.Form.Group controlId="category">
              <react_bootstrap_1.Form.Label>Category</react_bootstrap_1.Form.Label>
              <react_bootstrap_1.Form.Control type="text" placeholder="Enter category" value={category} onChange={(e) => setCategory(e.target.value)}></react_bootstrap_1.Form.Control>
            </react_bootstrap_1.Form.Group>

            <react_bootstrap_1.Form.Group controlId="description">
              <react_bootstrap_1.Form.Label>Description</react_bootstrap_1.Form.Label>
              <react_bootstrap_1.Form.Control type="text" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)}></react_bootstrap_1.Form.Control>
            </react_bootstrap_1.Form.Group>

            <react_bootstrap_1.Button type="submit" variant="primary">
              Update
            </react_bootstrap_1.Button>
          </react_bootstrap_1.Form>)}
      </FormContainer_1.default>
    </>);
};
exports.default = ProductEditScreen;
