require('dotenv').config();
const express = require('express');
const app = express();

//database
const connectDB = require('./db/connect');

//routers
const authRouter = require('./routes/authRoutes');

//middleware
app.use(express.static('./public'));
app.use(express.json());

app.set('view engine', 'ejs');
// const authenticateUser = require('./middleware/authentication');

app.use('/api/v1/auth', authRouter);

//default port 8080
const port = process.env.PORT || 8080;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`server is linstening on ${port} port...`));
  } catch (error) {
    console.log(error);
  }
};

start();
