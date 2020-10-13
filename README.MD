# <a href='https://www.apollographql.com/'><img src='https://user-images.githubusercontent.com/841294/53402609-b97a2180-39ba-11e9-8100-812bab86357c.png' height='100' alt='Apollo Server'></a>
## GraphQL Server for Express, Koa, Hapi, Lambda, and more.

# Apollo backend app 

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
