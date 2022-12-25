"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const orderController_1 = require("../controllers/orderController");
const authMiddleware_1 = require("../middleware/authMiddleware");
router.route('/').post(authMiddleware_1.protect, orderController_1.addOrderItems).get(authMiddleware_1.protect, authMiddleware_1.admin, orderController_1.getOrders);
router.route('/myorders').get(authMiddleware_1.protect, orderController_1.getMyOrders);
router.route('/:id').get(authMiddleware_1.protect, orderController_1.getOrderById);
router.route('/:id/pay').put(authMiddleware_1.protect, orderController_1.updateOrderToPaid);
router.route('/:id/deliver').put(authMiddleware_1.protect, authMiddleware_1.admin, orderController_1.updateOrderToDelivered);
exports.default = router;
