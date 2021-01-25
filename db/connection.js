const mongoose = require('mongoose')
require('dotenv').config();
mongoose.connect('mongodb+srv://rajatbajpai33:Mighty62ss@cluster0.mzi2b.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})