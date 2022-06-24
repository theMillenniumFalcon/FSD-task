import { Context } from "../types/types"
import { User } from '../models/User'
import { ErrorResponse } from '../utils/errorResponse'

export const register = async ({req, res, next}: Context) => {
    if (req?.body?.username && req?.body?.email && req?.body?.password) {
        const { username, email, password } = req.body

        try {
            const user = await username.create({
                username, email, password
            })
            res.status(201).json({
                success: true,
                user
            })
        } catch(error) {
            next(error)
        }
    } else {
        console.log('U r stupid!')
    }
}

export const login = async ({req, res, next}: Context) => {
    const { email, password } = req.body

    if (!email || !password) {
        return next(new ErrorResponse("Please provide an email and password", 400))
    }

    try {
        const user = await User.findOne({ email }).select("+password")

        if (!user) {
            return next(new ErrorResponse("Invalid credentials", 401))
        }

        const ismatch = await user!.matchPasswords(password)

        if (!ismatch) {
            return next(new ErrorResponse("Invalid credentials", 401))
        }

        res.status(200).json({
            success: true,
            token: "degbyufeuyv"
        })
    } catch(error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
} 