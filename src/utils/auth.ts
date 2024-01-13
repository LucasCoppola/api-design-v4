import { Request, Response, NextFunction } from 'express'
import { User } from '@prisma/client'
import jwt from 'jsonwebtoken'

export function createJWT(user: User) {
	return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET!)
}

export function protectRoute(req: Request, res: Response, next: NextFunction) {
	const bearer = req.headers.authorization

	if (!bearer) {
		return res.status(401).json({ message: 'Not authorized' })
	}

	const [_, token] = bearer.split(' ')

	if (!token) {
		return res.status(401).json({ message: 'Not valid token' })
	}

	try {
		const user = jwt.verify(token, process.env.JWT_SECRET!)
		// @ts-ignore
		req.user = user
		next()
	} catch (e) {
		console.error(e)
		return res.status(401).json({ message: (e as Error).message })
	}
}
