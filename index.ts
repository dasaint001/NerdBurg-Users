import express, { Express, Request, Response } from 'express'
import UserService from './Services/UserApiService'
import AuthService from './Services/AuthService'
import cors from 'cors'
import dotenv from 'dotenv'
import { auth } from './middleware/auth'

dotenv.config()

const app: Express = express()
app.use(express.json())

app.use(cors())

const port = process.env.PORT

app.get('/', async (_request: Request, response: Response) => {
	return response.json({
		status: 'Successful',
		message: 'Everything is ok with my health.',
		data: null,
	})
})

app.post('/register', AuthService.createUser)
app.post('/login', AuthService.login)
app.get('/users', auth, UserService.getUsers)
app.post('/role/create', auth, UserService.createUserRole)
app.post('/admin/create', auth, UserService.createAdmin)
app.get('/user', auth, UserService.getUser)
app.put('/user/edit', auth, UserService.updateUser)
app.delete('/user/delete', auth, UserService.deleteUser)


app.listen(port, () => console.log(`⚡️[server]: Magic happens on port ${port}`))
