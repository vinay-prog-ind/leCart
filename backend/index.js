const express = require("express");
const app = express();

require("dotenv").config();

const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");

const userRouter = require("./src/routes/route.user");
const categoryRouter = require("./src/routes/route.category");
const productRouter = require("./src/routes/route.product");

app.use(morgan('dev'));
app.use(cors());    
app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRouter);
app.use('/api/category', categoryRouter);
app.use('/api/product', productRouter)

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Listening on PORT:${PORT}`));