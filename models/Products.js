import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({ 
   
  userId : {
  type : mongoose.Schema.Types.ObjectId,
  ref : "User",
  required: true,
}
  ,

   text : {
    type: String,
    required: true,
 
   }

});


const productSchema = new mongoose.Schema({
    userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User",
 
  } ,

  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  reviews : [reviewSchema]
});




export default mongoose.model("Product", productSchema);
