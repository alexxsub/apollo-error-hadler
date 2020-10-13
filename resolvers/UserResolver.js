const bcrypt = require('bcrypt'),
      jwt = require('jsonwebtoken'),
      {UserInputError,ApolloError} = require('apollo-server-express')

const createToken = (user, secret, expiresIn) => {
  const {_id, username} = user
  return jwt.sign({_id,username}, secret, {expiresIn})
}

module.exports = {
  User: {
    // sample authorization. Only user with username 'Bond' can see field password
    password: (rec,_,{currentUser}) => {
      
      if (currentUser.username=='Bond') {
       return rec.password
        
      } else {
        return '*censored*'
      }
    },
    createdDate: (rec) => {
      let d = new Date(String(rec.createdDate))
      return d.toLocaleString()
    },
  },
    
  Query: {
    getUsers2: async (_, args, { User,currentUser }) => {
       if (!currentUser) {
        throw new Error('Access error: Authentication required!')
      } 
      const users = await User.find({}).sort({ createdDate: "desc" })

      return users
    },
    getUsers: async (_, args, { User }) => {

      const users = await User.find({}).sort({ createdDate: "desc" })

      return users
    },
    getIP: async (_, args, { userIP }) => {
            
      return userIP
    },  
    getCurrentUser: async (_, args, { User, currentUser }) => {
      if (!currentUser) {
        return null
      }
      const user = await User.findOne({
        username: currentUser.username,
      })
      return user
    },  
  },
  Mutation: {        
    // authentication and generates token
    signIn: async (_, { username, password }, { User }) => {
      const user = await User.findOne({ username })
      if (!user) throw new Error('Incorrect username or password')

      const isValidPassword = await bcrypt.compare(password, user.password)
      if (!isValidPassword) throw new Error('Incorrect username or password')

      // token's lifetime 1 day
      return { token: createToken(user, process.env.SECRET, "24hr") };
    },

    signUp: async (_, { username, password, avatar }, { User }) => {
      const user = await User.findOne({ username })
      
      if (user) {        
        throw new UserInputError(`This user '${username}' already exists`, {
              invalidArgs: username
            })
      }

      const newUser = await new User({
        username,        
        password,        
      }).save()
      

      return newUser
    },
  },
};
