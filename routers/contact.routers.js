const express = require('express');
const Contacts = require('../db/models/contacts');
const auth = require('../middleware/auth')
require('dotenv').config();
const router = new express.Router()

router.post('/contacts',auth,async (req,res) =>{
    const contact = new Contacts({...req.body,owner:req.user._id})
    try{
        await contact.save()
        res.status(201).send(contact)
    }catch(e){
        res.status(500).send(e.message)
    }
})
//pagination limit=10 skip=10
//sort
router.get('/contacts',auth,async (req,res) => {
    const match = {}
    const sort = {}
    if(req.query.isSaved){
        match.isSaved = req.query.isSaved === 'true'
    }
    if(req.query.sortBy){
        const str = req.query.sortBy.split(':')
        sort[str[0]] = str[1] === 'desc' ? -1:1
    }
    try {
        // const contacts = await Contacts.find({owner:req.user._id})
        await req.user.populate({
            path:'contacts',
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort
            }
        }).execPopulate();
        res.status(200).send(req.user.contacts)
    }catch(e) {
        res.status(400).send(e.message)
    }
})

router.get('/contacts/:id',auth,async (req,res) => {
    try {
        const contact = await Contacts.findByOne({_id:req.params.id,owner:req.user._id})
        if (!contact)
           return  res.status(404).send()
        res.status(200).send(contact)
    }catch(e){
        res.status(400).send()
    }
})

router.patch('/contacts/:id',auth,async (req,res) => {
    const allowedUpdates = ['name','isSaved']
    const keys = Object.keys(req.body);
    const isUpdationValid = keys.every(key => allowedUpdates.includes(key))
    if(!isUpdationValid)
    res.status(400).send()
    try {
        const contact = await Contacts.findByOne({_id:req.params.id,owner:req.user._id})
        if(!contact)
           return res.status(404).send()
        res.status(200).send(contact)
    }catch(e){
        res.status(400).send()
    }
})

router.delete('/contacts/:id',auth,async (req,res) =>{
    try{
        const contact = await Contacts.findByOne({ _id: req.params.id, owner: req.user._id })
        if (!contact)
          return res.status(404).send()
        res.status(200).send(contact)

    }catch(e){
        res.status(400).send()
    }
})
module.exports = router
