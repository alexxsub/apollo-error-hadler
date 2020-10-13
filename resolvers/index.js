const path = require('path');
const mergeGraphqlSchemas = require('merge-graphql-schemas');
const fileLoader = mergeGraphqlSchemas.fileLoader;
const mergeResolvers = mergeGraphqlSchemas.mergeResolvers;


const resolversArray = fileLoader(
    path.join(__dirname, '*Resolver.js'));

module.exports = mergeResolvers(resolversArray);
