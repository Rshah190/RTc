const express          = require('express');
const app              = express();
const dotenv           = require('dotenv');
const {chats}          = require('./data/data');
const UserRoute        = require('./routes/UserRoute');
const ChatRoute        = require('./routes/ChatRoute');

const connectDB        = require("./config/database");
const {notFound ,errorHandler}= require('./middlewares/ErrorMiddleware');

dotenv.config();
connectDB();

app.use(express.json()); // to accept json data

app.use("/api/user",UserRoute);
app.use("/api/chat",ChatRoute);

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 5000

app.listen(PORT,  console.log(`Server running on PORT ${PORT}...`.yellow.bold)
);