require('dotenv').config()

module.exports = {
    MongoURI: `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PWD}@cluster0.tm3xo.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
}