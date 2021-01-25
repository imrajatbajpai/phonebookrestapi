require('./db/connection')
require('dotenv').config();
const express = require('express')
const userRouter = require('./routers/user.routers')
const contactRouter = require('./routers/contact.routers')
const app = express();
app.use(express.json())
app.use(userRouter);
app.use(contactRouter);
const port = process.env.PORT || 3000
app.listen(3000);