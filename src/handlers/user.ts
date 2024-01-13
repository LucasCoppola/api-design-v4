import * as bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from 'express'
import { prisma } from '../index'
import { createJWT } from '../utils/auth'

export async function createNewUser(req, res, next: NextFunction) {
	try {
		const user = await prisma.user.create({
			data: {
				username: req.body.username,
				password: await bcrypt.hash(req.body.password, 10)
			}
		})

		const token = createJWT(user)
		return res.status(201).json({ token })
	} catch (e) {
		e.type = 'input'
		next(e)
	}
}

export async function signIn(req: Request, res: Response) {
	const user = await prisma.user.findUnique({
		where: {
			username: req.body.username
		}
	})

	if (!user) {
		return res.status(404).json({ message: 'User not found' })
	}

	const isValid = await bcrypt.compare(req.body.password, user?.password)

	if (!isValid) {
		return res.status(401).json({ message: 'Invalid credentials' })
	}

	const token = createJWT(user)
	return res.status(200).json({ token })
}
