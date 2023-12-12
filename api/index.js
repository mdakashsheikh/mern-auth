require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose  = require('mongoose');
const userRoutes = require('./routes/user.route');
const aithRoutes = require('./routes/auth.route');

const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json()) 

mongoose.connect(process.env.DB_URL)
.then(() => console.log('Database Connected.'))
.catch((err) => console.log(err));


app.use('/api/user', userRoutes);
app.use('/api/auth', aithRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    })
})

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})