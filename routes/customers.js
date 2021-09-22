const {Customer, validate} = require('../models/customer')
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    Customer.find().sort({name: 1}).then(customers => {
        res.send(customers)})
        .catch(err => {res.status(500)
        .send({message: err.message || "some error occured while retrieving customers"})
        })
    });

router.post('/', (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const {name, phone, isGold} = req.body;
    const customer = new Customer({name, phone, isGold});
    customer.save().then(customer => {
        res.send(customer) })
        .catch(err => {res.status(500)
        .send({message: err.message || "some error occured while saving customer"})
        })
    });

router.put('/', (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const customer = req.body;
    Customer.findOneAndUpdate({name: customer.name}, customer, {new: true}).then(customer => {
        res.send(customer) })
        .catch(err => {res.status(500)
        }).send({message: err.message || "some error occured while updating customer"})
    });

router.get('/:id', (req, res) => {
    Customer.findById(req.params.id).then(customer => {
        res.send(customer) })
        .catch(err => {res.status(500)
        .send({message: err.message || "some error occured while retrieving customer"})
        })
    });


router.delete('/:id', (req, res) => {
    Customer.findOneAndRemove({_id: req.params.id}).then(customer => {
        res.send(customer) })
        .catch(err => {res.status(500)
        .send({message: err.message || "some error occured while deleting customer"})
        })
    });

module.exports = router;