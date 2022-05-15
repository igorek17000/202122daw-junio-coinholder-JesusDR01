const request = require('supertest');

const { MongoMemoryServer } = require('mongodb-memory-server');

(async () => {
const mongoServer = await MongoMemoryServer.create();
const mockMongoDBUri = await mongoServer.getUri();
process.env.MONGODB_URI=mockMongoDBUri;

const app = require('../app.js');

})();
