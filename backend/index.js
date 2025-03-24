const express = require("express");
const app = express();

require("dotenv").config();

const cors = require("cors");
const morgan = require("morgan");

const userRouter = require("./src/routes/route.user");
const categoryRouter = require("./src/routes/route.category");

app.use(cors());

app.use(morgan('dev'));
app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/home', categoryRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Listening on PORT:${PORT}`));