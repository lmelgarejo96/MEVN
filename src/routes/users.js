const express = require('express');
const router = express.Router();

const User = require('../models/User.js');

router.get('/', async (req, res) => {
    const users = await User.find();
    res.send(users);
    console.log(users)
});

router.post('/', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.json({
        status: 'Saved successfully'
    }); 
});

router.put('/:id', async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, req.body);
    req.params.id
    res.json({
        status: 'Edited successfully'
    });
});

router.delete('/:id', async (req, res) => {
    await User.findByIdAndRemove(req.params.id);
    res.json({
        status: 'Deleted successfully'
    });
})

module.exports = router;