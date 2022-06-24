import { Context } from "../types/types"

export const register = async ({req, res}: Context) => {
    const { username, email, password }  = req.body

    try {
        const user = await username.create({
            username, email, password
        })
        res.status(201).json({
            success: true,
            user
        })
    } catch(error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

export const login = ({res}: Context) => {
    res.send('Login route')
} 