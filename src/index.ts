import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'
dotenv.config()

import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan'
import config from './config'

import { createNewUser, signIn } from './handlers/user'
import router from './router'
import { protectRoute } from './utils/auth'

export const prisma = new PrismaClient()
export const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.get('/', (req, res) => {
	res.json({ message: 'Hello World!' })
})

app.use('/api', protectRoute, router)
app.post('/user', createNewUser)
app.post('/sign-in', signIn)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	if (err.type === 'auth') {
		console.error(err)
		res.status(401).json({ message: 'Unauthorized' })
	} else if ((err.type = 'input')) {
		console.error(err)
		res.status(400).json({ message: 'Invalid Input' })
	} else {
		console.error(err)
		res.status(500).json({ message: `Server Internal Error: ${(err as Error).message}` })
	}
})

app.listen(config.port, () => console.log(`Server running on port ${config.port}`))
