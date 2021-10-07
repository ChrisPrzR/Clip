# Clip API

Technical test API

## Usage

This project is hosted on heroku, please give the server a second to wake up.


## Endpoints
* Users
    * /api/user/   --> POST --> Returns confirmation message and userId in JSON
    * /api/user/:id   --> PUT --> Returns confirmation message and user object in JSON
        
```javascript
//USE OF JSON BODY FOR REQUEST

{
    "name": "John Doe",
    "email": "john@doe.io", //Must be a valid email format and cannot be modified once created
    "address": ['Array of Strings'],
    "phoneNumber": 123456789,
}
```

* Dishes
    * /api/dish/   --> POST --> Returns confirmation message and dishId in JSON
    * /api/dish/:id   --> PUT --> Returns confirmation message and dish object in JSON
        
```javascript
//USE OF JSON BODY FOR REQUEST

{
    "name": "chilaquiles", //Names cannot be repeated
    "description": "Simple description",
    "price": 200,
    "typeOfFood": "mexicana", //IMPORTANT! There are only 3 options (mexicana, italiana, japonesa), has to be lowercase.
    "available": true
}
```
* Orders (It can be an array of objects)
    * /api/order/:userId   --> POST --> Returns confirmation message and orderId in JSON
    * /api/order/:id   --> PUT --> Returns confirmation message and order object in JSON
        
```javascript
//USE OF JSON BODY FOR REQUEST

{
    "orderDetails": [
    {
            "dishName" : "chilaquiles",
            "quantity" : 3
    }
    ]
}
```

* Sales 
    * /api/sales/:foodCat/:startDate/:endDate   --> GET
        * foodCat = categories(mexicana, italiana, japonesa)
        * Date format must be YYYY-MM-DD


    * Example:
    #### /api/sales/mexicana/2021-10-06/2021-10-08

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
