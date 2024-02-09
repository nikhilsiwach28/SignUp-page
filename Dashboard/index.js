// const db = require('./db');
const configs = require('./config/config')
const server = require('./server/server')

const serverConfigs = configs.getServerConfig()
server.runServer(serverConfigs)   