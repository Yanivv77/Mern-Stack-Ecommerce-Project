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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const SearchBox = ({ history }) => {
    const [keyword, setKeyword] = (0, react_1.useState)('');
    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            history.push(`/search/${keyword}`);
        }
        else {
            history.push('/');
        }
    };
    return (<react_bootstrap_1.Form onSubmit={submitHandler} inline>
      <react_bootstrap_1.Form.Control type="text" name="q" onChange={(e) => setKeyword(e.target.value)} placeholder="Search Products..." className="mr-sm-2 ml-sm-5"></react_bootstrap_1.Form.Control>
      <react_bootstrap_1.Button type="submit" variant="outline-success" className="p-2">
        Search
      </react_bootstrap_1.Button>
    </react_bootstrap_1.Form>);
};
exports.default = SearchBox;
