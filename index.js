const express = require('express');
const {errorMiddleware} = require('./src/middlewares/error_middleware');

const PORT = process.env.PORT || 3000;
const app = express();


app.use(errorMiddleware)

app.listen(PORT, () => {
    console.log("Server running on port: ", PORT)
})