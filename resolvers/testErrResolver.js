const {AuthenticationError,UserInputError,ApolloError} = require('apollo-server-express');

module.exports = {
    Query: {
        apolloError: (_, args, context) => {
            throw new ApolloError('Customized apollo error','SOME_CODE',{'my_argument':',my_value'});
          },
        authError: (_, args, context) => {
            throw new AuthenticationError('You must to authenticate');
          },
        readError: (_, args, context) => {
            const fs = require("fs")
            fs.readFileSync('/does/not/exist');
          },
    },
    Mutation: {
        userInputError: (_, args, context, info) => {
          if (args.input !== 'expected') {
            throw new UserInputError('User input arguments are invalid', {
              invalidArgs: Object.keys(args),
            })
          } else return "Good!"
        },
      }
}