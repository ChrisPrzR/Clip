const Order = require('../models/Order');
const User = require('../models/User');
const Dish = require('../models/Dish');

const createOrder = async (req, res) => {
    
    const timeCheck = () => {
        const opening = new Date()
        const closing = new Date()
        opening.setHours(16,0,0,0)
        closing.setHours(24,0,0,0)
    
        const currentTime = new Date()
        currentTime.getHours()
    
        if(!(currentTime > opening)  || !(currentTime < closing)){
            return res.status(400).json({
                ok: false,
                msg: 'Hours of operation are 16:00 PM to 21:00 PM'
            })
        }
    }

    timeCheck();
    
    try {

        //Assuming every new order is not on the DB.
        let userId = req.params.userId

        const {name, address} = await User.findById(userId)

        let itemsArray =  req.body.orderDetails
        let subtotal
        let totalAmount = 0
        
        let dataArr = itemsArray.map( async (element) => {
            let { price, typeOfFood } = await Dish.findOne({name: element.dishName})
            console.log( price, typeOfFood )
            subtotal = price * element.quantity
            return(
                {
                    dishName : element.dishName,
                    quantity: element.quantity,
                    price : price,
                    typeOfFood,
                    subtotal
                }        
            )
        })
       

        const orderArr = await Promise.all(dataArr)


        let getTotal = () => {
            orderArr.map( element => totalAmount += element.subtotal )
        }

        getTotal();

        let order = new Order({
            customer : name,
            customerAddress : address[0],
            orderDetails: orderArr,
            totalAmount
        })

        //request only needs the user in the params, and order details>item>dishname

        await order.save()

        res.status(201).json({
            ok: true,
            orderId: order.id,
            msg: 'Order succesfully created',
        });

    }catch(err){
        console.log(err)
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong here, please try again. Maybe look into the docs? The request body might need something.'
        });
    }
};

const updateOrder = async (req, res) => {
    
    const timeCheck = () => {
        const opening = new Date()
        const closing = new Date()
        opening.setHours(16,0,0,0)
        closing.setHours(21,0,0,0)
    
        const currentTime = new Date()
        currentTime.getHours()
    
        if(!(currentTime > opening)  || !(currentTime < closing)){
            return res.status(400).json({
                ok: false,
                msg: 'Hours of operation are 16:00 PM to 21:00 PM'
            })
        }
    }

    timeCheck();

    const orderId = req.params.id;

    try {
        let order = await Order.findById(orderId);

        if(!order){
            return res.status(404).json({
                ok: false,
                msg: 'Order not found'
            });
        };
        //request needs the order id in the params, and order details>item>dishname

        const updatedOrder = await Order.findByIdAndUpdate(orderId, req.body, {new: true});

        res.status(201).json({
            ok: true,
            msg: 'Changes to the the order have been applied',
            order: updatedOrder
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
    createOrder, 
    updateOrder
};