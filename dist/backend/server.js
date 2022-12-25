"use strict";
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
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const db_1 = __importDefault(require("./config/db"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const uploadRoutes_1 = __importDefault(require("./routes/uploadRoutes"));
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
app.use(express_1.default.json());
app.use('/api/products', productRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.use('/api/orders', orderRoutes_1.default);
app.use('/api/upload', uploadRoutes_1.default);
app.get('/api/config/paypal', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield res.send(process.env.PAYPAL_CLIENT_ID);
}));
const __dirname = path_1.default.resolve();
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '/uploads')));
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(path_1.default.join(__dirname, '/frontend/build')));
    app.get('*', (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield res.sendFile(path_1.default.resolve(__dirname, 'frontend', 'build', 'index.html')); }));
}
else {
    app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield res.send('API is running....');
    }));
}
app.use(errorMiddleware_1.notFound);
app.use(errorMiddleware_1.errorHandler);
const PORT = Number(process.env.PORT) || 5000;
if (process.env.JWT_SECRET) {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
    app.listen(PORT);
}
else {
    console.error('JWT secret is not defined');
    throw new Error('Server error');
}
