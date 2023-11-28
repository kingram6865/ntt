const color = require('./utilities/consoleColors')
const { appLogger } = require('./utilities/logging')

require('dotenv').config()
const { Console } = require("console")
const fs = require('fs')
const path = require('path')
const https = require('https')
const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const routes = require('./routes/main')
const PORT = parseInt(process.env.PORT) || 3025
const sslPort = parseInt(process.env.SSLPORT)
const SERVER = process.env.HOST || 'localhost'
const TIME = new Date()
const sslOptions = {
  key: fs.readFileSync(process.env.KEY),
  cert: fs.readFileSync(process.env.CERT)
}

const myLogger = appLogger(__dirname)
const accessLogStream = fs.createWriteStream(path.join(__dirname, `/logs/access.log`), { flags: 'a' })

const app = express()
const sslServer = https.createServer(sslOptions, app);
app.use(cors())

/* dev, combined or common */
app.use(logger('common', { stream: accessLogStream }))
app.use(express.static(__dirname + '/static', { dotfiles: 'allow' }))
app.use(express.json())
app.use('/ntt', routes)

if (process.env.HOST === 'localhost') {
  let httpsMessage = `NTT API Secure Server Started -- Server: ${color.brightYellow}${SERVER}${color.Reset}, SSL Port: ${color.brightYellow}${sslPort}${color.Reset}, start time: (${color.brightGreen}${TIME.toLocaleString()}${color.Reset})`
  sslServer.listen(sslPort, 'localhost', () => myLogger.log(httpsMessage))
} else if (process.env.HOST === 'apollo') {
  let httpMessage = `NTT API Server Started -- Server: ${color.brightYellow}${SERVER}${color.Reset}, Port: ${color.brightYellow}${PORT}${color.Reset}, start time: (${color.brightGreen}${TIME.toLocaleString()}${color.Reset})`
  app.listen(PORT, () => myLogger.log(httpMessage))
}
