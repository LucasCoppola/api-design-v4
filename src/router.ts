import { Router } from 'express'
import { body } from 'express-validator'
import { handleInputErrors } from './utils/validators'
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from './handlers/product'
import { User } from '@prisma/client'
import { createUpdate, deleteUpdate, getAllUpdates, getUpdate, updateUpdate } from './handlers/update'

declare global {
	namespace Express {
		interface Request {
			user: User
		}
	}
}

const router = Router()

/**
 * Product
 */
router.get('/product', getAllProducts)

router.get('/product/:id', getProduct)

router.post('/product', body('name').isString(), handleInputErrors, createProduct)

router.put('/product/:id', body('name').isString(), handleInputErrors, updateProduct)

router.delete('/product/:id', deleteProduct)

/**
 * Update
 */

router.get('/product/:productId/update', getAllUpdates)
router.get('/product/:productId/update/:id', getUpdate)
router.put(
	'/product/:productId/update/:id',
	body('title').optional(),
	body('body').optional(),
	body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
	body('version').optional(),
	updateUpdate
)
router.post(
	'/product/:productId/update',
	body('title').exists().isString(),
	body('body').exists().isString(),
	createUpdate
)
router.delete('/product/:productId/update/:id', deleteUpdate)

/**
 * Update Point
 */

router.get('/updatepoint', () => {})
router.get('/updatepoint/:id', () => {})
router.put('/updatepoint/:id', body('name').optional().isString(), body('description').optional().isString(), () => {})
router.post(
	'/updatepoint',
	body('name').isString(),
	body('description').isString(),
	body('updateId').exists().isString(),
	() => {}
)
router.delete('/updatepoint/:id', () => {})

export default router
