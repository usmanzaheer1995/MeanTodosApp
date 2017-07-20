const mongoose = require('mongoose');
const validator = require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const bcrypt = require('bcryptjs')

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            isAsync: true,
            validator: validator.isEmail,
            message: `{VALUE} is not a valid email`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
})

//instance method
UserSchema.methods.toJSON = function () {
    let user = this
    let userObject = user.toObject()
    return _.pick(userObject, ['_id', 'email'])
}

UserSchema.methods.generateAuthToken = function () {
    let user = this
    let access = 'auth'
    let token = jwt.sign({ _id: user._id.toHexString(), access }, process.env.JWT_SECRET).toString()

    user.tokens.push({
        access,
        token
    })

    return user.save().then(() => {
        return token
    })

}

UserSchema.methods.removeToken = function(token) {
    let user = this
    return user.update({
        //mongodb operator: it lets you remove an object from array which matches a certain criteria
        $pull: {
            tokens: {
                token: token
            }
        }
    })
}

//create Model method
UserSchema.statics.findByToken = function (token) {
    let User = this
    let decoded
    //console.log(token)
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return Promise.reject()
    }
    //console.log(decoded._id)
    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth',
    })
}

UserSchema.statics.findByCredentials = function(email, password) {
    let User = this
    //console.log(email)
    //console.log(User)
    return User.findOne({email}).then((user) => {
        if(!user){
            console.log('rejected')
            return Promise.reject()
        }
        return new Promise((resolve,reject) => {
            bcrypt.compare(password, user.password, (err, result) => {
                if(result){
                    resolve(user)
                }
                else {
                    reject()
                }
            })
        })
    })
}

//mongoose middleware
UserSchema.pre("save", function (next) {
    let user = this
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err,salt) => {
            bcrypt.hash(user.password,salt, (err,hash) => {
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

var Users = mongoose.model('Users', UserSchema);

// var newUser = new Users({
//     email: ' usmanzaheer1995  ',
// });

// newUser.save().then((doc)=>{
//     console.log(JSON.stringify(doc,undefined,2));
// }, (err)=>{
//     console.log("Could not store in Users collection ",err);
// });

module.exports = { Users };