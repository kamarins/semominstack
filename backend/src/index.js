const express = require('express'); //importa funcionalidades do express
const cors = require ('cors'); 
const routes = require('./routes');


const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333); //porta 3333

