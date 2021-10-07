const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config')

const app = express();

dbConnection();

app.use(cors());

app.use(express.json());

app.use('/api/user', require('./routers/user'));
app.use('/api/dish', require('./routers/dish'));
app.use('/api/order', require('./routers/order'));
app.use('/api/sales', require('./routers/sales'));

app.listen(process.env.PORT , () => {
    console.log(`Running on port ${ process.env.PORT }`)
});
