const User = require('../models/User');
const { validationResult } = require('express-validator')

const createUser = async (req, res) => {

    const {email} = req.body;

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    try {

        let user = await User.findOne({ email })

        if(user){
            return res.status(400).json({
                ok: false,
                msg: 'User already exists'
            });
        }

        user = new User(req.body)

        await user.save()

        res.status(201).json({
            ok: true,
            userId: user.id,
            msg: 'User succesfully created',
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong here, please try again. Maybe look into the docs? The request body might need something.'
        })
    }

} 

const updateUser = async (req, res) => {
    const userId = req.params.id;

    try {
        let user = await User.findById(userId);

        if(!user){
            return res.status(404).json({
                ok: false,
                msg: 'User not found'
            });
        };

        if(user.email !== req.body.email){
            return res.status(400).json({
                ok: false,
                msg: 'Email cannot be changed, please create a new user'
            })
        }

        const updatedUser = await User.findByIdAndUpdate(userId, req.body, {new: true});

        res.status(201).json({
            ok: true,
            msg: 'Changes to user applied',
            user: updatedUser
        });

    } catch(err){
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong here, please try again. Maybe look into the docs? The request body might need something.'
        });
    };
};

module.exports = {
    createUser, 
    updateUser
};
