import { Request, Response } from 'express'
import { prisma } from '../index'
import { findProduct } from '../utils/findProduct'

export async function getAllUpdates(req: Request, res: Response) {
	const product = await findProduct(req.params.productId, req.user.id)

	if (!product) {
		return res.status(401).json({ message: 'Product not found' })
	}

	res.status(200).json({ data: product.updates })
}

export async function getUpdate(req: Request, res: Response) {
	const product = await findProduct(req.params.productId, req.user.id)

	if (!product) {
		return res.status(401).json({ message: 'Product not found' })
	}

	const update = product.updates.find((update) => update.id === req.params.id)

	if (!update) {
		return res.status(401).json({ message: 'Update not found' })
	}

	res.status(200).json({ data: update })
}

export async function createUpdate(req: Request, res: Response) {
	const update = await prisma.update.create({
		data: {
			product: {
				connect: {
					id: req.params.productId
				}
			},
			...req.body
		}
	})

	res.status(201).json({ data: update })
}

export async function updateUpdate(req: Request, res: Response) {
	const product = await findProduct(req.params.productId, req.user.id)

	if (!product) {
		return res.status(401).json({ message: 'Product not found' })
	}

	const update = await prisma.update.update({
		where: {
			id: req.params.id,
			productId: product.id
		},
		data: {
			...req.body
		}
	})

	res.status(200).json({ data: update })
}

export async function deleteUpdate(req: Request, res: Response) {
	const product = await findProduct(req.params.productId, req.user.id)

	if (!product) {
		return res.status(401).json({ message: 'Product not found' })
	}

	const deleted = await prisma.update.delete({
		where: {
			id: req.params.id,
			productId: product.id
		}
	})

	res.status(200).json({ data: deleted })
}
