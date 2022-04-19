const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
require('dotenv').config()

// eslint-disable-next-line no-undef
const url = process.env.MONGO_URI

console.log('connecting to', url)

mongoose.connect(url)
// eslint-disable-next-line no-unused-vars
    .then(response =>
        console.log('connected to', url)
    )
    .catch((error) => {

        console.log('Trouble connecting to database: ', error.message)


    })

const personSchema = new mongoose.Schema({

    name: {
        
        type: String, 
        minlength: [3, 'Name should be at least 3 characters long'], 
        unique: [true, 'Person already exists'],
        required: true
    },
    phone: {
        type: String,
        required: [true, 'Model requires a phone number'],
        validate: { 

            validator: (v) => {

                return /\d{2,3}-?\d{5,}/.test(v)
            }, message: props => `${props.value} is not a valid phone number`
        }
    }

})

personSchema.plugin(uniqueValidator)


personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
    
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
    
})

module.exports = mongoose.model('Person', personSchema)