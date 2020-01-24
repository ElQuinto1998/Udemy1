const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 9000;

dotenv.config();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const routesv1 = require('./routes/v1');

routesv1(app);

mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Db is conected');
    app.listen(PORT, () => {
        console.log('Server running on port ' + PORT);
    });
}).catch(error => {
    console.log('Db error ', error);
});
