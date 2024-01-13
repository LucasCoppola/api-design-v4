import { prisma } from '..'

export async function findProduct(productId: string, userId: string) {
	const product = await prisma.product.findUnique({
		where: {
			id_ownerId: {
				id: productId,
				ownerId: userId
			}
		},
		include: {
			updates: true
		}
	})

	return product
}
