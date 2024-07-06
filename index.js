require('dotenv').config()
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const credentials = require('./middleware/credentials')
const cors = require('cors')
const corsOptions = require('./config/corsOptions.js')

const authRouter = require('./routes/auth.js')
const apiRouter = require('./routes/api.js')
const adminRouter = require('./routes/admin.js')

app.use(credentials)
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

app.use('/auth', authRouter)
app.use('/api', apiRouter)
app.use('/admin', adminRouter)

const PORT = 3000
app.listen(PORT, () => {
  console.log('Server is running on port : ', PORT)
})
