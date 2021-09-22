
const Joi = require('joi');
const mongoose = require('mongoose');


const Customer = mongoose.model('Customer', new mongoose.Schema({
    isGold: {
        type: Boolean,
        default: false
        },
    name: {
        type: String,
        required: true
        },
    // email: {
    //     type: String,
    //     required: true
    //     },
    phone: {
        type: String,
        required: true
        }
    // address: {
    //     type: String,
    //     required: true
    //     },
    // city: {
    //     type: String,
    //     required: true
    //     },
    // state: {
    //     type: String,
    //     required: true
    //     },
    // zip: {
    //     type: String,
    //     required: true
    //     },
    // country: {
    //     type: String,
    //     required: true
    //     },
    // created: {
    //     type: Date,
    //     default: Date.now
    //     }
    // })
    })
);


function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean()
    };
    
    return Joi.validate(customer, schema);
    }

exports.Customer = Customer; 
exports.validate = validateCustomer;