import mongoose from "mongoose";

const cartSchema  =  mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    totalPrice : {
        type: Number,
        required: true,
    },
    items : [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                default: 1,
                required: true,
            },
        }
    ],

 
})

export default mongoose.model("Cart", cartSchema);