"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_helmet_1 = require("react-helmet");
const Meta = ({ title, description, keywords }) => {
    return (<react_helmet_1.Helmet>
      <title>{title}</title>
      <meta name="description" content={description}/>
      <meta name="keyword" content={keywords}/>
    </react_helmet_1.Helmet>);
};
Meta.defaultProps = {
    title: 'Welcome To Yanivs Shop',
    description: 'We sell the best products for cheap',
    keywords: 'electronics, buy electronics, cheap electronics',
};
exports.default = Meta;
