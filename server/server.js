const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const ConnectTODB = require('./config/db');


const allowedOrigins = ["*"];

const corsOptions = {
  origin: process.env.FRONTEND_URL, // or your frontend port
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

app.use(cors(corsOptions));

ConnectTODB();


// Routes
app.use('/private/admin', require('./routes/adminRoutes'));
app.use('/private/jobs', require('./routes/adminRoutes'));
app.use('/applications', require('./routes/applicationRoutes'));]

app.get("/" , (req,res) => {
  res.send("Welcome to the Job Portal Of Devmitra ");
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
