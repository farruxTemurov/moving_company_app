const express = require("express");
const app = express();
let dbConnect = require("./config/db");
let dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const helmet = require('helmet');
const { authMiddleware } = require("./middlewares/auth.middleware");

let PORT = process.env.PORT || 9090;

const usersRoute = require("./routes/users.route");
const inquiriesRoute = require("./routes/inquiry.route");
const bookingsRoute = require("./routes/booking.route");

app.use(cors());  // Enable CORS
app.use(helmet());  // Set security headers

app.use(express.json());  // To parse JSON request bodies

// Use the routes
app.use("/api/users", usersRoute.router);
app.use("/api/inquiries", inquiriesRoute.router);
app.use("/api/bookings", bookingsRoute.router);

// General error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);

    const statusCode = err.status || 500;
    res.status(statusCode).json({
        message: err.message || "Internal Server Error"
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    dbConnect.MongoDbConnect();
});

process.on('SIGINT', () => {
    console.log('SIGINT received. Shutting down gracefully...');
    app.close(() => {
        console.log('Closed out remaining connections');
        dbConnect.MongoDbConnect.close();
        process.exit(0);
    });
});
