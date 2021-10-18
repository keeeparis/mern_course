import express from 'express'
import config from 'config'
import mongoose from 'mongoose'
import authRouter from './routes/auth.routes.js'
import linkRouter from './routes/link.routes.js'
import redirectRouter from './routes/redirect.routes.js'
import path from 'path'

const app = express()

const PORT = config.get('port') || 5000

app.use(express.json({extended:true}))
app.use('/api/auth', authRouter)
app.use('/api/link', linkRouter)
app.use('/t', redirectRouter)

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {})
        console.log('connecting to db')
        app.listen(PORT, () => console.log(`Server runs on port ${PORT}...`))
    } catch(e) {
        console.log("Server Error", e.message)
        process.exit(1)
    }
}

start()

