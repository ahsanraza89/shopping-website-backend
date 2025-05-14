import Products from "../models/Products.js";

export const addReview =  async (req , res)=> {

    try {
         const { id } = req.params;
         const {  text } = req.body;
         const userId = req.user.id;
         console.log("🚀 ~ addReview ~ userId:", userId)

         const product = await Products.findById(id);
         if(!product){
            return res.status(404).json({ message: "Product not found" });
         }
         
            product.reviews.push({
                userId , text
            })
            await product.save();

            res.status(200).json({ message: "Review added successfully" , product });


    } catch (error) {
         res.status(500).json({ message : "Failed adding review" , message: error.message });
    }
}

