"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const react_router_bootstrap_1 = require("react-router-bootstrap");
const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
    return (pages > 1 && (<react_bootstrap_1.Pagination>
        {[...Array(pages).keys()].map((x) => (<react_router_bootstrap_1.LinkContainer key={x + 1} to={!isAdmin ? (keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1}`) : `/admin/productlist/${x + 1}`}>
            <react_bootstrap_1.Pagination.Item active={x + 1 === page}>{x + 1}</react_bootstrap_1.Pagination.Item>
          </react_router_bootstrap_1.LinkContainer>))}
      </react_bootstrap_1.Pagination>));
};
exports.default = Paginate;
