const Language=require('../Models/languages')
exports.getLanguages=(req,res)=>{
Language.find().then(response=>{
    res.status(200).json({
        message:"language fetched successfully",
        language:response
    })
}).catch(err=>console.log(err))
}