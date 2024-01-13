import { Request, Response } from 'express'
import { prisma } from '../index'
import { User } from '@prisma/client'

declare global {
	namespace Express {
		interface Request {
			user: User
		}
	}
}

export async function getAllProducts(req: Request, res: Response) {
	const products = await prisma.product.findMany({
		where: {
			ownerId: req.user.id
		}
	})

	res.status(200).json({ data: products })
}

export async function getProduct(req: Request, res: Response) {
	const { id } = req.params

	const product = await prisma.product.findUnique({
		where: {
			id_ownerId: {
				id,
				ownerId: req.user.id
			}
		}
	})

	res.status(200).json({ data: product })
}

export async function createProduct(req: Request, res: Response) {
	const product = await prisma.product.create({
		data: {
			ownerId: req.user.id,
			...req.body
		}
	})

	res.status(201).json({ data: product })
}

export async function updateProduct(req: Request, res: Response) {
	const { id } = req.params

	const updatedProduct = await prisma.product.update({
		where: {
			id_ownerId: {
				id,
				ownerId: req.user.id
			}
		},
		data: {
			...req.body
		}
	})

	res.status(201).json({ data: updatedProduct })
}

export async function deleteProduct(req: Request, res: Response) {
	const { id } = req.params

	const deleted = await prisma.product.delete({
		where: {
			id_ownerId: {
				id,
				ownerId: req.user.id
			}
		}
	})

	res.status(200).json({ data: deleted })
}
