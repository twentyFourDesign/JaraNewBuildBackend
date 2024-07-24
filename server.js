const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const connectDatabase = require('./connection/database');
const {errorMiddleware, ErrorResponse} = require('./middlewares/error/error');
const {statusCode} = require('./utils/statusCode');
const {allRoutes} = require('./routes');
const { termModel } = require('./models');
const { any } = require('joi');
const { RoomTypes, SubRooms } = require('./models/rooms.schema');
const { overnightBooking } = require('./models/overnight.booking.schema');

const app = express()
const port = 4000|| 4001;
connectDatabase(); // DATABASE CONNECTION

app.use(express.json());
app.use(cors({origin:"*"}));
app.use(morgan("dev"));
app.use(errorMiddleware); // CUSTOM ERROR MIDDLEWARE
app.use('/api/v1',allRoutes); // ALL API END POINTS

// INAVLID API CALL
app.use((req, res, next) => {
    next(new ErrorResponse("Invalid Api", statusCode?.notFound));
});

app.listen(port,()=>{
    console.log(`server is running on PORT ${port}`)
});

const del = async ()=>{
    // await RoomTypes.deleteMany()
    // await SubRooms.deleteMany()
    // await overnightBooking.deleteMany()
}

del()