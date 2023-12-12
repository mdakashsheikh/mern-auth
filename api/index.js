require('dotenv').config();
const express = require('express');
const app = express();
const mongoose  = require('mongoose');

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DB_URL)
.then(() => console.log('Database Connected.'))
.catch((err) => console.log(err));

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})