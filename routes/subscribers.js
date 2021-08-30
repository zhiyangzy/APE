const express = require('express')
const subscriber = require('../models/subscriber')
const { findById } = require('../models/subscriber')
const router = express.Router()
const Subscriber = require('../models/subscriber')

//getting all
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

//getting one
router.get('/:id', getSubscriber, (req, res) => {
    res.send(req.subscriber.name)
})
//creating one
router.post('/', async (req, res) => {
   const subscriber = new Subscriber({
       name: req.body.name,
       subscribedToChannel: req.body.subscribedToChannel
   })

   try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
   } catch (err) {
       res.status(400).json({ message: err.message})
   }
})
//updating one
router.patch('/:id', getSubscriber, async (req, res) => {
    if (req.body.name !=null) {
        res.subscriber.name = req.body.name
    }
    if (req.body.subscribedToChannel != null) {
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }
    try {
        const updatedSubcriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    } catch (err){
        res.status(400).json({ message: err.message})
    }
})
//deleting one
router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subsriber.remove()
        res.json({ message: 'Deleted Subscriber'})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getSubscriber(req, res, next){
    try {
        subscriber = await Subscriber/findById(req.params.id)
        if (subscriber == null) {
            return res.status(404).json({message: 'Cannot find subscriber'})
        }
    } catch (err) {
        return res.status(500).json({ message : err.message})
    }
    res.subscriber = subscriber
    next()
}

module.exports = router