const mongoose = require('mongoose')

url = process.env.MONGO_URI

console.log('connecting to', url)

mongoose.connect(url)
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
        required: true
    },
    phone: {
        type: String,
        required: true 
    },

})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
    
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
    
    })

module.exports = mongoose.model('Person', personSchema);