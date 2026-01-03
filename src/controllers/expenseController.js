const Expense=require("../models/Expense");

//add expense
exports.addExpense=async (req,res)=>{
    try{
        const {amount,category,description,date}=req.body;

        const expense=await Expense.create({
            user:req.user._id,
            amount,
            category,
            description,
            date,
        });

        res.status(201).json({
            message:"Expense added successfully",
            expense,
        });
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Server error"});
    }
};

//get expense

exports.getExpenses=async(req,res)=>{
    try{
        const expenses=await Expense.find({user:req.user._id}).sort({
            date:-1,
        });
        res.status(200).json({
            count:expenses.length,
            expenses,
        });
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Server error"});
    }
};


//update
exports.updateExpense=async (req,res)=>{
    try{
        const expense=await Expense.findById(req.params.id);

        if(!expense){
            return res.status(404).json({message:"Expense not found"});
        }

        if(expense.user.toString()!=req.user._id.toString()){
            return res.status(401).json({message:"Not authorized"});
        }

        const updateExpense=await Expense.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );

        res.status(200).json({
            message:"Expense updates successfully",
            updateExpense,
        });
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Server error"});
    }
};


//delete expense
exports.deleteExpense=async (req,res)=>{
    try{
        const expense=await Expense.findById(req.params.id);

        if(!expense){
            return res.status(404).json({message:"Expense not found"});
        }
        //ownership check
        if(expense.user.toString()!==req.user._id.toString()){
            return res.status(401).json({message:"Not authorized"});
        }
        await expense.deleteOne();

        res.status(200).json({message:"Expense deleted successfully"});
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Server error"});
    }
};


//category wise report

exports.getCategoryReport=async (req,res)=>{
    try{
        const report=await Expense.aggregate([
            {$match:{user:req.user._id}},
            {
                $group:{
                    _id:"$category",
                    totalAmount:{$sum:"$amount"},
                },
            },
            {$sort:{totalAmount:-1}},
        ]);
        res.status(200).json(report);
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Server error"});
    }
};


exports.getMonthlyReport= async (req,res)=>{
    try{
        const report=await Expense.aggregate([
            {$match:{user:req.user._id}},
            {
                $group:{
                    _id:{
                        year:{$year:"$date"},
                        month:{$month:"$date"},
                    },
                    totalAmount:{$sum:"$amount"},
                },
            },
            {$sort:{"_id.year":-1,"_id.month":-1}},
        ]);
        res.status(200).json(report);
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Server error"});
    }
};