const handler = require('./handlers')
const rateLimit = require('express-rate-limit');


TODO: "Adding generalLimiter for all requests"
// const generalLimiter = rateLimit({   
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100,
//     message: 'Too many requests from this IP, please try again after some time.'
//   });
  
//   app.use(generalLimiter)

  const specificLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10,
    message: 'Too many requests for this specific route, please try again after some time.'
  });

  
function addRoutes(app){
    app.get('/allUserIds',specificLimiter,handler.getAllUserNames)

    app.post('/addUser', handler.addUser);  

    // For the above 2 request no authentication is needed so no middleware implemented
    //can add more routes as per business requirements
}

module.exports ={
    addRoutes
}