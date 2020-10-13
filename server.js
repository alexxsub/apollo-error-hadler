
const { ApolloServer, AuthenticationError } = require('apollo-server-express'),
        path = require('path'),
        express = require("express"),                
        mongoose = require('mongoose')
        jwt = require('jsonwebtoken'),
            typeDefs = require('./types'),
            resolvers = require('./resolvers')

var context = require('./models')

// Import Environment Variables and Mongoose Models
require('dotenv').config({ path: '.env' })


mongoose
    .connect(
        process.env.MONGO_URI,
        {
          useCreateIndex: true,
          useNewUrlParser: true,
          retryWrites: true,
          useFindAndModify: false,
        }
    )
    .then(() => console.log(`🎉  Mogo connected ${process.env.MONGO_URI}`))
    .catch((err) => console.error(err))

// Verify JWT Token passed from client
const getUser = async (token, signin) => {      
    if (signin) return ''    
    if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET)
    } catch (err) {
      throw new AuthenticationError(
        'Authorization error: Please login again!'
      )
    }
  }
  else {
    throw new AuthenticationError(
      'Authorization error: You are not logged in!'
    );
  }
};



// Create Apollo/GraphQL Server using typeDefs, resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
  tracing: true,
  formatError: (error) => {
    const rep = new Map([
      ["GraphQL error:", ""],
      ["Context creation failed:", ""],      
    ])
    const {message} = error
    rep.forEach((val,key) =>{ 
      let msg = error.message
      error.message = msg.replace(key, val).trim()
    })    
    if (!process.env.DEBUG)
    {
      if (error.extensions.hasOwnProperty('exception'))
        delete error.extensions.exception
    }
      return error
  },
    context: async ({ req }) => {

        const noAuth = ['IntrospectionQuery',
            'signIn',
            'signUp',
            'getIP',
            'apolloError',
            'readError',
            'authError',
            'userInputError',
            'getUsers2'],
          token = req.headers['token'],
          query = req.body.operationName,
          signin = noAuth.includes(query)
    context.currentUser = await getUser(token, signin)
    context.userIP = req.ip.split(":").pop()
    return context
  }
})


const contextAuthError = (req, res, next) => {
  const origSend = res.send;

  res.send = (content) => {
    if (res.statusCode === 400) {
      const errInfo = JSON.parse(content)
      if (errInfo.errors[0].extensions.code === "UNAUTHENTICATED") {
        res.statusCode = 401
      }
    }
    return origSend.call(res, content);
  }
  next()
}

const app = express()
app.use("/api", contextAuthError)

const p = path.join(__dirname, '/front')

app.get('/', function (req, res) {  
  res.sendFile(path.join(__dirname + '/front/index.html'))
})
app.get('/error', function (req, res) {
  res.send('Nothing here dude, try <a href="/api">api</a>')
})
const port = (process.env.PORT || 4000)
server.applyMiddleware({ app, path: "/api" })

app.listen({ port }, () =>
  console.log(`🚀  Started at http://localhost:${port}${server.graphqlPath}`)
)
 
