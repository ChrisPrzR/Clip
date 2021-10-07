const Dish = require('../models/Dish');
const { validationResult } = require('express-validator')

const createDish = async (req, res) => {

    const { name, typeOfFood } = req.body;
    const categories = ['mexicana', 'italiana', 'japonesa']
    
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()});
    }

    try {

        let dish = await Dish.findOne({ name }).collation({ locale: 'en', strength: 2 })

        if(dish){
            return res.status(400).json({
                ok: false,
                msg: 'That dish already exists'
            });
        }

        if(!categories.includes(typeOfFood)){
            return res.status(400).json({
                ok: false,
                msg: 'Please check the food categories again. Options are Mexicana, Italiana and Japonesa'
            });
        }

        dish = new Dish(req.body)

        await dish.save()

        res.status(201).json({
            ok: true,
            dishId: dish.id,
            msg: 'Dish succesfully created',
        });

    }catch(err){
        console.log(err)
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong here, please try again. Maybe look into the docs? The request body might need something.'
        });
    }
};

const updateDish = async (req, res) => {

    const dishId = req.params.id;

    try {
        let dish = await Dish.findById(dishId);
        const existingDish = await Dish.findOne({name: req.body.name})

        if(!dish){
            return res.status(404).json({
                ok: false,
                msg: 'Dish not found'
            });
        };

        if(existingDish && (dishId !== existingDish.id)){
            return res.status(400).json({
                ok: false,
                msg: 'A dish has that name already'
            });
        };

        const updatedDish = await Dish.findByIdAndUpdate(dishId, req.body, {new: true});

        res.status(201).json({
            ok: true,
            msg: 'Changes to the the dish have been applied',
            user: updatedDish
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
    createDish, 
    updateDish
};