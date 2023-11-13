import { UserAuthentication } from '../Database/UserAuthentication'
import { Request, Response } from 'express'
import moment from 'moment'
import { Validator } from 'node-input-validator'
import jwt from 'jsonwebtoken'
import { Op } from 'sequelize'

const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
const timeStamp = moment().format(TIME_FORMAT).toString()

const UserService = {
	// createBusTicket: async (request: Request, response: Response) => {
	// 	try {
	// 		const validator = new Validator(request.body, {
	// 			name: 'required',
	// 			price: 'required|numeric',
	// 		})

	// 		const authheader: any = request.headers.authorization

	// 		const authUser: any = jwt.decode(authheader)

	// 		const ticket = request.body

	// 		const { name, price } = ticket

	// 		const matched = await validator.check()
	// 		if (!matched) {
	// 			return response.status(422).json({
	// 				status: 'Failed',
	// 				message: 'Validation Failed',
	// 				data: validator.errors,
	// 			})
	// 		}

	// 		const busTicket = await BusTicketing.Ticket.create({
	// 			Name: name,
	// 			UserID: authUser.ID,
	// 			Price: price,
	// 			TicketID: (name.slice(0, 2) + generateNumber()).toUpperCase(),
	// 			CreatedAt: timeStamp,
	// 			UpdatedAt: timeStamp,
	// 		})

	// 		return response.status(201).json({
	// 			status: 'Successful',
	// 			message: 'Ticket created Successfully',
	// 			data: busTicket,
	// 		})
	// 	} catch (error: any) {
	// 		return response.status(400).json({
	// 			status: 'Failed',
	// 			message: error.message,
	// 		})
	// 	}
	// },
	// creditAccount: async (request: Request, response: Response) => {
	// 	try {
	// 		const validator = new Validator(request.body, {
	// 			userPhone: 'required',
	// 			amount: 'required|numeric',
	// 		})

	// 		const authheader: any = request.headers.authorization

	// 		const authUser: any = jwt.decode(authheader)

	// 		const credit = request.body

	// 		const { userPhone, amount } = credit

	// 		const query = {
	// 			where: {
	// 				phoneNumber: userPhone,
	// 			},
	// 		}

	// 		const matched = await validator.check()
	// 		if (!matched) {
	// 			return response.status(422).json({
	// 				status: 'Failed',
	// 				message: 'Validation Failed',
	// 				data: validator.errors,
	// 			})
	// 		}

	// 		const isUserExist = await BusTicketing.User.findOne(query)

	// 		if (!isUserExist) {
	// 			return response.status(404).json({
	// 				status: 'Failed',
	// 				message: 'User not found',
	// 			})
	// 		}

	// 		const wallet = await BusTicketing.Wallet.findOne({ where: { UserID: isUserExist.ID } })

	// 		const creditData: any = {
	// 			Balance: +wallet.Balance + amount,
	// 		}

	// 		const userReceipt: any = {
	// 			beneficiaryName: isUserExist.userName,
	// 			amount: amount,
	// 		}

	// 		await BusTicketing.Wallet.update(creditData, { where: { UserID: isUserExist.ID } })

	// 		const transaction = await BusTicketing.Transaction.create({
	// 			Reference: generateReference(7),
	// 			Quantity: 1,
	// 			Type: CREDIT_TRANSACTION_TYPE,
	// 			Amount: amount,
	// 			Status: STATUS_SUCCESSFUL,
	// 			UserID: isUserExist.userName,
	// 			CreatedAt: timeStamp,
	// 			UpdatedAt: timeStamp,
	// 		})

	// 		return response.status(201).json({
	// 			status: 'Successful',
	// 			message: 'User credited successfully',
	// 			data: { userReceipt, transaction },
	// 		})
	// 	} catch (error: any) {
	// 		return response.status(400).json({
	// 			status: 'Failed',
	// 			message: error.message,
	// 		})
	// 	}
	// },
	// buyTicket: async (request: Request, response: Response) => {
	// 	try {
	// 		const validator = new Validator(request.body, {
	// 			ticketName: 'required',
	// 			quantity: 'required',
	// 		})

	// 		const matched = await validator.check()
	// 		if (!matched) {
	// 			return response.status(422).json({
	// 				status: 'Failed',
	// 				message: 'Validation Failed',
	// 				data: validator.errors,
	// 			})
	// 		}

	// 		const authheader: any = request.headers.authorization

	// 		const authUser: any = jwt.decode(authheader)

	// 		const userRequest = request.body

	// 		const { ticketName, quantity } = userRequest

	// 		const query = {
	// 			where: {
	// 				Name: ticketName,
	// 			},
	// 		}

	// 		const user = await BusTicketing.User.findOne({ where: { ID: authUser.ID } })
	// 		const isTicketExist = await BusTicketing.Ticket.findOne(query)

	// 		if (!isTicketExist) {
	// 			return response.status(404).json({
	// 				status: 'Failed',
	// 				message: 'Ticket not found',
	// 			})
	// 		}

	// 		const wallet = await BusTicketing.Wallet.findOne({ where: { UserID: authUser.ID } })

	// 		if (+wallet.Balance < isTicketExist.Price * quantity) {
	// 			return response.status(404).json({
	// 				status: 'Failed',
	// 				message: 'Insuffecient Balance',
	// 			})
	// 		}

	// 		const creditData: any = {
	// 			Balance: +wallet.Balance - isTicketExist.Price * quantity,
	// 		}

	// 		await BusTicketing.Wallet.update(creditData, { where: { UserID: authUser.ID } })

	// 		const transaction = await BusTicketing.Transaction.create({
	// 			Reference: generateReference(7),
	// 			Quantity: 1,
	// 			Type: DEBIT_TRANSACTION_TYPE,
	// 			Amount: +quantity * isTicketExist.Price,
	// 			Status: STATUS_SUCCESSFUL,
	// 			UserID: user.userName,
	// 			CreatedAt: timeStamp,
	// 			UpdatedAt: timeStamp,
	// 		})

	// 		return response.status(200).json({
	// 			status: 'Successful',
	// 			message: 'Ticket purchased successfully',
	// 			data: transaction,
	// 		})
	// 	} catch (error: any) {
	// 		return response.status(400).json({
	// 			status: 'Failed',
	// 			message: error.message,
	// 		})
	// 	}
	// },
	// getBalance: async (request: Request, response: Response) => {
	// 	try {
	// 		const authheader: any = request.headers.authorization

	// 		const authUser: any = jwt.decode(authheader)

	// 		const query = {
	// 			where: {
	// 				UserID: authUser.ID,
	// 			},
	// 		}

	// 		const wallet = await BusTicketing.Wallet.findOne(query)

	// 		return response.status(200).json({
	// 			status: 'Successful',
	// 			message: 'Balance successfully retrieved',
	// 			data: wallet,
	// 		})
	// 	} catch (error: any) {
	// 		return response.status(400).json({
	// 			status: 'Failed',
	// 			message: error.message,
	// 		})
	// 	}
	// },
	getUsers: async (request: Request, response: Response) => {
		try {
			const authheader: any = request.headers.authorization

			const authUser: any = jwt.decode(authheader)

			const query = {
				where: {
					ID: authUser.ID,
				},
			}

			const user = await UserAuthentication.User.findOne(query)

			if (user.role === 'admin') {
				const users = await UserAuthentication.User.findAll()

				return response.status(200).json({
					status: 'Successful',
					message: 'All Users',
					data: users,
				})
			}

			return response.status(400).json({
				status: 'Failed',
				message: 'You are not authorized',
				data: null,
			})
		} catch (error: any) {
			return response.status(400).json({
				status: 'Failed',
				message: error.message,
			})
		}
	},
	createUserRole: async (request: Request, response: Response) => {
		try {
			const validator = new Validator(request.body, {
				name: 'required',
			})

			const matched = await validator.check()
			if (!matched) {
				return response.status(422).json({
					status: 'Failed',
					message: 'Validation Failed',
					data: validator.errors,
				})
			}
			const isRoleExist = await UserAuthentication.Role.findOne({ where: { Name: request.body.name } })

			if (isRoleExist) {
				return response.status(400).json({
					status: 'Failed',
					message: 'Role already exist',
					data: null,
				})
			}
			const authheader: any = request.headers.authorization

			const authUser: any = jwt.decode(authheader)

			const query = {
				where: {
					ID: authUser.ID,
				},
			}

			const user = await UserAuthentication.User.findOne(query)

			if (user.role === 'admin') {
				if (request.body.name != 'user' || request.body.name != 'admin') {
					return response.status(400).json({
						status: 'Failed',
						message: `only 'admin' and 'user' roles can be created`,
						data: null,
					})
				}
				const role = await UserAuthentication.Role.create({
					Name: request.body.name,
					CreatedBy: user.firstName + ' ' + user.lastName,
				})

				return response.status(201).json({
					status: 'Successful',
					message: 'Role created successfully',
					data: role,
				})
			}

			return response.status(400).json({
				status: 'Failed',
				message: 'You are not authorized',
				data: null,
			})
		} catch (error: any) {
			return response.status(400).json({
				status: 'Failed',
				message: error.message,
			})
		}
	},
	createAdmin: async (request: Request, response: Response) => {
		try {
			const validator = new Validator(request.body, {
				userId: 'required',
				secret: 'required',
			})

			const matched = await validator.check()
			if (!matched) {
				return response.status(422).json({
					status: 'Failed',
					message: 'Validation Failed',
					data: validator.errors,
				})
			}

			if (request.body.secret != 'nerdburg') {
				return response.status(400).json({
					status: 'Failed',
					message: 'Invalid secret',
					data: null,
				})
			}

			const userQuery = {
				where: {
					ID: request.body.userId,
				},
			}

			const user = await UserAuthentication.User.findOne(userQuery)

			if (!user.role) {
				return response.status(404).json({
					status: 'Failed',
					message: 'User not found',
					data: null,
				})
			}

			if (user.role === 'admin') {
				return response.status(400).json({
					status: 'Failed',
					message: 'User is already an admin',
					data: null,
				})
			}

			const userRole: any = {
				role: 'admin',
			}

			await UserAuthentication.User.update(userRole, userQuery)

			return response.status(200).json({
				status: 'Successful',
				message: 'User role updated successfully',
				data: null,
			})
		} catch (error: any) {
			return response.status(400).json({
				status: 'Failed',
				message: error.message,
			})
		}
	},
	getUser: async (request: Request, response: Response) => {
		try {
			const query = {
				where: {
					ID: request.body.userId,
				},
			}

			const user = await UserAuthentication.User.findOne(query)

			if (!user) {
				return response.status(400).json({
					status: 'Failed',
					message: 'User not found',
					data: user,
				})
			}
			return response.status(200).json({
				status: 'Successful',
				message: 'User',
				data: user,
			})
		} catch (error: any) {
			return response.status(400).json({
				status: 'Failed',
				message: error.message,
			})
		}
	},
	updateUser: async (request: Request, response: Response) => {
		try {
			const validator = new Validator(request.body, {
				email: 'email',
			})

			const matched = await validator.check()
			if (!matched) {
				return response.status(422).json({
					status: 'Failed',
					message: 'Validation Failed',
					data: validator.errors,
				})
			}
			const query = {
				where: {
					ID: request.body.userId,
				},
			}

			const roleQuery = {
				where: {
					ID: request.body.roleId,
				},
			}

			const isUserExist = await UserAuthentication.User.findOne(query)

			if (!isUserExist) {
				return response.status(404).json({
					status: 'Failed',
					message: 'User does not exist',
					data: null,
				})
			}

			const checkValues = await UserAuthentication.User.findOne({
				where: {
					[Op.or]: {
						firstName: request.body.firstName,
						lastName: request.body.lastName,
						email: request.body.email,
					},
				},
			})

			if (checkValues) {
				return response.status(400).json({
					status: 'Failed',
					message: 'User exist with value(s)',
					data: checkValues,
				})
			}

			const role = await UserAuthentication.Role.findOne(roleQuery)

			if (!role) {
				return response.status(404).json({
					status: 'Failed',
					message: 'Role does not exist',
				})
			}

			const updatedData: any = {
				firstName: request.body.firstName,
				lastName: request.body.lastName,
				email: request.body.email,
				role: role.Name,
			}

			await UserAuthentication.User.update(updatedData, query)

			return response.status(200).json({
				status: 'Successful',
				message: 'User updated successfully',
				data: updatedData,
			})
		} catch (error: any) {
			return response.status(400).json({
				status: 'Failed',
				message: error.message,
			})
		}
	},
	deleteUser: async (request: Request, response: Response) => {
		try {
			const authheader: any = request.headers.authorization

			const authUser: any = jwt.decode(authheader)

			const query = {
				where: {
					ID: authUser.ID,
				},
			}

			const userQuery = {
				where: {
					ID: request.body.userId,
				},
			}

			const user = await UserAuthentication.User.findOne(query)

			if (user.role === 'admin') {
				
				await UserAuthentication.User.destroy(userQuery)

				return response.status(200).json({
					status: 'Successful',
					message: 'User deleted succefully'
				})
			}

			return response.status(400).json({
				status: 'Failed',
				message: 'You are not authorized to carry out this action'
			})
		} catch (error: any) {
			return response.status(400).json({
				status: 'Failed',
				message: error.message,
			})
		}
	},
}

export = UserService
