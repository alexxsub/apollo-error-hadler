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

### Sample queries in GraphQL playground (run query in own tab)
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

queries to test autentication

add new user, for example - bill, input your name or other
```gql
mutation signUp {
  signUp(
    username:"bill",
    password:"123"
  ) {
    username
  } 
}
```
signin user
```gql
mutation signIn {
  signIn(username: "bill", password: "123") {
    token
  }
}
```
result of query (token will be other )
```gql
{
  "data": {
    "signIn": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Zjg1OTk5MTkzZTUxODZlNWFlMWM4ZmQiLCJ1c2VybmFtZSI6IkJvbmQiLCJpYXQiOjE2MDI1OTExMzUsImV4cCI6MTYwMjY3NzUzNX0.Q1GXKXV2tWf3_xDxdP3HstLcXHRUaLCVNUpdalsmeKA"
    }
  }
}
```

open new tab for authonticated query and copy token in "HTTP HEADERS" tab section below query (copy and past result of previuos query)
```gql
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Zjg1OTk5MTkzZTUxODZlNWFlMWM4ZmQiLCJ1c2VybmFtZSI6IkJvbmQiLCJpYXQiOjE2MDI1OTExMzUsImV4cCI6MTYwMjY3NzUzNX0.Q1GXKXV2tWf3_xDxdP3HstLcXHRUaLCVNUpdalsmeKA"
}
```
You are authenticated!
run query (without authentication query return unauthenticated error)
```gql
{
  getUsers {
    username
    password
    createdDate
  }
}
```