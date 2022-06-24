import 'dotenv-safe/config'
import express from 'express'
import { connectDB } from './db/db'

const PORT = parseInt(process.env.PORT)

const main = async () => {
    // connectDB()
    const app = express()

    app.use(express.json())

    app.get('/', (_, res) => {
        res.send("Server is working fine!")
    })

    app.use('/api/auth', require('./routes/auth'))

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