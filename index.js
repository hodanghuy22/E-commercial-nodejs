const express = require('express')
const dbConnect = require('./config/dbConnect')
const app = express()
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 4000
const authRouter = require('./routes/authRoute');
const productRouter = require('./routes/productRoute');
const blogRouter = require('./routes/blogRoute')
const categoryRouter = require('./routes/prodcategoryRoute')
const blogCategoryRouter = require('./routes/blogCateRoute')
const brandRouter = require('./routes/brandRoute')
const couponRouter = require('./routes/couponRoute')
const bodyParser = require('body-parser')
const { notFound, errHandler } = require('./middlewares/errorHandler')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')

//ket noi database
dbConnect()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('dev'));

app.use("/api/user",authRouter);
app.use("/api/product",productRouter);
app.use("/api/blog",blogRouter);
app.use("/api/category",categoryRouter);
app.use("/api/blogCategory",blogCategoryRouter);
app.use("/api/brand",brandRouter);
app.use("/api/coupon",couponRouter);

app.use(notFound);
app.use(errHandler);

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`)
})