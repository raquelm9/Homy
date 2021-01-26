const mongoose = require("mongoose");
const Joi = require("joi");

const schema = mongoose.Schema({
    title: String,
    imagePath: String,
    price: Number
});

const Product = mongoose.model("product", schema);

function validateProduct(product) {
    const schema = Joi.object({
        title: Joi.string().required(),
        imagePath: Joi.string(),
        price: Joi.number().required()
    });

    return schema.validate(product);
}
exports.Product = Product;
exports.validate = validateProduct;
