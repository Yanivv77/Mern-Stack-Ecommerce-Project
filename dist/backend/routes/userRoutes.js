"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
router.route('/').post(userController_1.registerUser).get(authMiddleware_1.protect, authMiddleware_1.admin, userController_1.getUsers);
router.post('/login', userController_1.authUser);
router.route('/profile').get(authMiddleware_1.protect, userController_1.getUserProfile).put(authMiddleware_1.protect, userController_1.updateUserProfile);
router.route('/:id').delete(authMiddleware_1.protect, authMiddleware_1.admin, userController_1.deleteUser).get(authMiddleware_1.protect, authMiddleware_1.admin, userController_1.getUserById).put(authMiddleware_1.protect, authMiddleware_1.admin, userController_1.updateUser);
exports.default = router;
