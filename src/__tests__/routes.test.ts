import supertest from 'supertest'
import { app } from '../index'

describe('GET /', () => {
	it('should return a message', async () => {
		const res = await supertest(app).get('/')

		expect(res.body.message).toBe('Hello World!')
	})
})
