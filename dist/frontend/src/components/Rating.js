"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Rating = ({ value, text, color }) => {
    return (<div className="rating">
      <span>
        <i style={{ color }} className={value >= 1 ? 'fas fa-star' : value >= 0.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
      </span>
      <span>
        <i style={{ color }} className={value >= 2 ? 'fas fa-star' : value >= 1.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
      </span>
      <span>
        <i style={{ color }} className={value >= 3 ? 'fas fa-star' : value >= 2.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
      </span>
      <span>
        <i style={{ color }} className={value >= 4 ? 'fas fa-star' : value >= 3.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
      </span>
      <span>
        <i style={{ color }} className={value >= 5 ? 'fas fa-star' : value >= 4.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
      </span>
      <span>{text && text}</span>
    </div>);
};
Rating.defaultProps = {
    color: '#f8e825',
};
exports.default = Rating;
