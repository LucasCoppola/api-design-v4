import * as user from '../user'
describe('user handler', () => {
	it('it should create a new user', async () => {
		const req = { body: { username: 'hello', password: 'hi' } }
		const res = {
			json({ token }) {
				expect(token).toBeTruthy()
				expect(token.length > 0).toBeTruthy()
				expect(token).toEqual(expect.any(String))
			}
		}
		const newUser = await user.createNewUser(req, res, () => {})
	})
})
