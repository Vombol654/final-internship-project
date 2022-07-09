const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const languageSchema=new Schema({
    name:{
        type:String,
        require:true
    },
    language_id:{
        type:Number,
        require:true
    },
    city:{
        type:String
    },
    country:{
        type:String
    }
})
module.exports=mongoose.model('language',languageSchema,'languages')