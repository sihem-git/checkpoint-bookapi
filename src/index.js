const express = require("express");
const bookRouter = require("./routes/bookRouter");
const userRouter = require("./routes/userRouter");
const app =  new express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/book", bookRouter);
app.use("/user", userRouter)
app.listen(8080, () => console.log("API RUNNING IN PORT 80808"))