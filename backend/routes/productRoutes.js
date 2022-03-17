import express from 'express'
const router = express.Router()
import { getProducts, getProductById, deleteProduct, createProduct, updateProduct } from '../controllers/productController.js'

router.route('/').get(getProducts).post(createProduct)
router.route('/:id').get(getProductById).delete(deleteProduct).put(updateProduct)

export default router
