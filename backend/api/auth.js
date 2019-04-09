const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const jwtCheck = jwt({
      secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: 'https://searchtrace.auth0.com/.well-known/jwks.json'
    }),
    audience: 'http://localhost:3000/backend/api',
    issuer: 'https://searchtrace.auth0.com/',
    algorithms: ['RS256']
});

module.exports = jwtCheck;
