require('dotenv').config()
const express = require('express')
const connectDB = require('./db/db')
const authRoute = require('./routers/auth')
const recipeRoute = require('./routers/recipe')
const errorHandler = require('./middleware/error')
const { checkUser } = require('./middleware/checkUser')
const cors = require("cors")
const path = require('path')
const {PORT } = require('./config/config')
const corsOptions = {
    origin:'*', 
    credentials:true,
    optionSuccessStatus:200,
}

const main = async () => {
    connectDB()
    const app = express()
    app.use(express.json())
    app.use(cors(corsOptions))

    app.get('/', checkUser)

    app.use(express.static(path.join(__dirname, "./public")))
    
    app.use('/auth', authRoute)
    app.use('/recipes', recipeRoute)

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