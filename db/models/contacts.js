const mongoose = require('mongoose')
require('dotenv').config();

const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    phonenumber:{
        type:Number

    },
    email:{
        type:String,
        unique:true,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is in valid')
            }
        },
        trim: true
    },
    isSaved:{
        type:Boolean,
        default:false
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Users'
    },
},{
    timestamps:true
})

const Contacts = mongoose.model('Contacts',contactSchema)

module.exports = Contacts