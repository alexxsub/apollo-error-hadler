# <a href='https://www.apollographql.com/'><img src='https://user-images.githubusercontent.com/841294/53402609-b97a2180-39ba-11e9-8100-812bab86357c.png' height='100' alt='Apollo Server'></a>
## GraphQL Server for Express and more.

# Apollo backend app 

## Features

- handles errors  apolloError,authError,readError,userInputError
- integrate Apollo GraphQL server and Express Node.js
- return correct 401 code when unauthonticated (apollo return statuscode 400)
- singUp and signIn sample authentication
- sample authorization
- formatError sample
- express routes
- and more

## Clone src on your PC
```bash
git clone https://github.com/alexxsub/apollo-error-hadler.git
cd apollo-error-hadler
```
## Install the dependencies
```bash
npm i
```
### Install MongoDB

see manual (https://docs.mongodb.com/manual/installation/)  


### Start backend 
app configured without login and password to MongoDB

```bash
npm run server
```
open url in browser to GraphQL playground [http://localhost:4005/api](http://localhost:4005/api)

### Sample queries in GraphQL playground
get client ip 

```gql
query getIP {
  getIP
}
```
error queries to test apollo error handlers 

athentication error
```gql
query authError {
  authError
}
```
IO error
```gql
query readError {
  readError
}
```
customized error

```gql
query apolloError {
  apolloError
}
```
user input error (expected - good result, other string - error)
```gql
mutation userInputError {
  userInputError(input: "expected")
}
```