import 'dotenv-safe/config'
import express from 'express'
import bodyParser from 'body-parser'
import { connectDB } from './db/db'
import { errorHandler } from './middleware/error'

const PORT = parseInt(process.env.PORT)

const main = async () => {
    connectDB()
    const app = express()

    app.use(bodyParser.json())

    app.get('/', (_, res) => {
        res.send("Server is working fine!")
    })

    app.use('/api/auth', require('./routes/auth'))

    app.use(errorHandler)

    const server = app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })

    process.on('unhandledRejection', (err, _) => {
        console.log(`Logged Error: ${err}`)
        server.close(() => process.exit(1))
    })
}
main().catch((error) => {
    console.error(error)
})