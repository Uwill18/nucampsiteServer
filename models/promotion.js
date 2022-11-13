/////////////schema/////////////////////
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Currency = mongoose.Types.Currency;



const promotionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image:
    {
        type: String,
        required: true
    },
    featured: Boolean,
    cost:{
    type: Currency,
    required: true,
    min: 0
    },

     description: {
        type: String,
        required: true
    }},
    {
    timestamps: true
});

const Promotion = mongoose.model('Promotion', promotionSchema);
module.exports = Promotion; 



////////////////////////////////////////////////
//https://learn.nucamp.co/mod/book/view.php?id=3579&chapterid=4057
//https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/
//https://www.mongodb.com/docs/manual/core/index-unique/#:~:text=To%20create%20a%20unique%20index,unique%20option%20set%20to%20true%20.
//https://medium.com/@iamlittlerock/auto-generated-createdat-and-updatedat-fields-in-mongodb-86bb5980be2
//https://mongoosejs.com/docs/guide.html#models
 //--note, need to hard code some values for creating the document