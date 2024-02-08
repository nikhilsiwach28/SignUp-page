// const db = require('./db');
const configs = require('./config')
const server = require('./server')

const serverConfigs = configs.getServerConfig()
server.runServer(serverConfigs)   