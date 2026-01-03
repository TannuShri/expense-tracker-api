const express = require("express");

const app = express();
// const protect=require("./middleware/authMiddleware")
// app.get("/api/protected",protect,(req,res)=>{
//     res.json({
//         message:"Access granted",
//         user:req.user,
//     });
// });

// Middleware
app.use(express.json());

//Routes
app.use("/api/auth",require("./routes/authRoutes"));

app.get("/", (req, res) => {
  res.send("Expense Tracker API is running ");
});

//expense routes
app.use("/api/expenses",require("./routes/expenseRoutes"));

module.exports = app;
