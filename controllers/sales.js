const Order = require('../models/Order');

const lookupSales = async (req, res) => {
    
    const typeOfFood = req.params.foodCat.toLowerCase() 
    const startDate = req.params.startDate
    const endDate = req.params.endDate


    try {
        const ordersByDate = await Order.find({date: {$gte : new Date(startDate),  $lte : new Date(endDate) }})

        let filteredData = []

        const filterByType = () => {
            for(let i = 0; i < ordersByDate.length; i++){
                let arr = ordersByDate[i].orderDetails.filter(item => item.typeOfFood === typeOfFood)
                arr.length > 0 ? filteredData.push(arr) : null
            }
        }
        
        filterByType();


        res.status(201).json({
            ok: true,
            msg: filteredData
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong here, please try again. Maybe look into the docs? The request body might need something.'
        });
    }


}

module.exports = {lookupSales}