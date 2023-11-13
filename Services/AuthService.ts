import { UserAuthentication } from '../Database/UserAuthentication'
import { Request, Response } from 'express'
import moment from 'moment'
import { Validator } from 'node-input-validator'
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
const timeStamp = moment().format(TIME_FORMAT).toString()

const AuthService = {
	createUser: async (request: Request, response: Response) => {
		try {
			const validator = new Validator(request.body, {
				email: 'required|email',
				password: 'required',
			})

			const salt = 10
			const hashedPassword = await bcrypt.hash(request.body.password, salt)

			const matched = await validator.check()
			if (!matched) {
				return response.status(422).json({
					status: 'Failed',
					message: 'Validation Failed',
					data: validator.errors,
				})
			}

			const isEmailExist = await UserAuthentication.User.findOne({
				where: {
					email: request.body.email,
				},
			})

			if (isEmailExist) {
				return response.status(400).json({
					status: 'Failed',
					message: 'User with email already exist',
				})
			}

			const isFirstNameExist = await UserAuthentication.User.findOne({
				where: {
					firstName: request.body.firstName,
				},
			})

			if (isFirstNameExist) {
				return response.status(400).json({
					status: 'Failed',
					message: 'First name already exist',
				})
			}

			const isLastNameExist = await UserAuthentication.User.findOne({
				where: {
					lastName: request.body.lastName,
				},
			})

			if (isLastNameExist) {
				return response.status(400).json({
					status: 'Failed',
					message: 'Last name already exist',
				})
			}

			const user = await UserAuthentication.User.create({
				firstName: request.body.firstName,
				lastName: request.body.lastName,
				email: request.body.email,
				password: hashedPassword,
				role: 'user',
			})

			return response.status(201).json({
				status: 'Successful',
				message: 'User created Successfully',
				data: { user },
			})
		} catch (error: any) {
			return response.status(400).json({
				status: 'Failed',
				message: error.message,
				data: null,
			})
		}
	},

	login: async (request: Request, response: Response) => {
		try {
			const validator = new Validator(request.body, {
				email: 'required',
				password: 'required',
			})

			const matched = await validator.check()

			if (!matched) {
				return response.status(422).json({
					status: 'Failed',
					message: 'Validation Failed',
					data: validator.errors,
				})
			}

			const salt = 10

			const user = request.body

			const { email, password } = user

			const isUserExist = await UserAuthentication.User.findOne({ where: { email: email } })

			if (!isUserExist) {
				return response.status(404).json({
					status: 'Failed',
					message: 'User email does not exist',
				})
			}

			const isPasswordMatched = await bcrypt.compare(password, isUserExist.password)

			if (!isPasswordMatched) {
				return response.status(400).json({
					status: 'Failed',
					message: 'Wrong password',
				})
			}

			const token = jwt.sign({ ID: isUserExist?.ID, email: isUserExist?.email }, 'YOUR_SECRET', {
				expiresIn: '1d',
			})

			return response.status(200).json({
				status: 'Successful',
				message: 'Login successfully',
				data: token,
			})
		} catch (error: any) {
			return response.status(400).json({
				status: 'Failed',
				message: error.message,
			})
		}
	},
}

export = AuthService
