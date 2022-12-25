"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const users = [
    {
        name: 'Admin User',
        email: 'yaniv@gmail.com',
        password: bcryptjs_1.default.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'Moshe cohen',
        email: 'moshe@gmail.com',
        password: bcryptjs_1.default.hashSync('123456', 10),
    },
    {
        name: 'Avi levi',
        email: 'avi@gmail.com',
        password: bcryptjs_1.default.hashSync('123456', 10),
    },
];
exports.default = users;
