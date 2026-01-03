const mongoose=require("mongoose");

const expenseSchema=new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        amount:{
            type:Number,
            required:true,
        },
        category:{
            type:String,
            required:true,
            enum:["Food","Travel","Rent","Shopping","Medical","Others"]
        },
        description:{
            type:String,
            trim:true,
            default:"",
        },
          date: {
          type: Date,
          default: Date.now,
    },
    },
    {timestamps:true}
);

module.exports=mongoose.model("Expense",expenseSchema);