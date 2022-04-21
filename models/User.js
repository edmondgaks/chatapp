const usersCollection = require('../db').collection("users")
const validator = require("validator")

let User = function(data) {
    this.data = data
    this.errors = []
}
User.prototype.cleanUp = function() {
    if (typeof(this.data.username) != "string") {this.data.username =""}
    if (typeof(this.data.email) != "string") {this.data.username =""}
    if (typeof(this.data.password) != "string") {this.data.username =""}

    this.data = {
        username: this.data.username,
        email: this.data.email,
        password: this.data.password
    }
}

User.prototype.validate = function() {
    if(this.data.username == "") {this.errors.push("You must provide a username.")}
    if(this.data.username != "" && !validator.isAlphanumeric(this.data.username)) {this.errors.push("username can only contain numbers and letters.")}
    if(!validator.isEmail(this.data.email)) {this.errors.push("You must provide a valid email address.")}
    if(this.data.password == "") {this.errors.push("You must provide a password.")}
    if(this.data.password.length > 0  && this.data.password.length <12) {this.errors.push("Password must be atleast 12 characters")}
    if(this.data.password.length > 50) {this.errors.push("Password cannot exceed 50")}        
    if(this.data.username.length > 0  && this.data.username.length <3) {this.errors.push("Username must be atleast 3 characters")}
    if(this.data.username.length > 30) {this.errors.push("Username cannot exceed 30")}
    
}



User.prototype.register = function() {
    this.cleanUp()
    this.validate()

    if(!this.errors.length) {
        usersCollection.insertOne(this.data)
    }
}

module.exports = User