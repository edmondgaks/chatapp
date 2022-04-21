const mongodb = require("mongodb")
const dotenv = require("dotenv")
dotenv.config()
const connectionString = 'mongodb+srv://todoApp-user:matwigari@cluster0.fg5tm.mongodb.net/ComplexApp?retryWrites=true&w=majority'


mongodb.connect(process.env.connectionString, {useUnifiedTopology: true},function(err,client) {
    module.exports = client.db()
    const app = require('./app')
    app.listen(process.env.process)
})
