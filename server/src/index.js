require('dotenv').config()
const express = require('express')
const connectDB = require('./config/db')
const authRoute = require('./routers/auth')
const recipeRoute = require('./routers/recipe')
const errorHandler = require('./middleware/error')

const PORT = parseInt(process.env.PORT)

const main = async () => {
    connectDB()
    const app = express()
    app.use(express.json())

    app.get('/', (_, res) => {
        res.send("Server is working fine!")
    })
    
    app.use('/api/auth', authRoute)
    app.use('/api/recipe', recipeRoute)

    app.use(errorHandler)

    const server = app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`)
    })

    process.on('unhandledRejection', (err, promise) => {
        console.log(`Logged Error: ${err}`)
        server.close(() => process.exit(1))
    })
}
main().catch((error) => {
    console.error(error)
})