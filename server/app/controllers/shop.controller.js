const Stripe = require("stripe");
const config = require("../config");
const stripe = Stripe(config.STRIPE.SECRET_KEY);

const { Product, validate } = require("../models/product.model");
const { Order } = require("../models/order.model");
const { Resident } = require("../models/resident.model");

exports.payment = async (req, res) => {
  const product = await Product.findById(req.body.product_id);
  if (!product) return res.status(404).send("The product was not found");

  try {
    let intent;
    if (req.body.payment_method_id) {
      // Create the PaymentIntent
      intent = await stripe.paymentIntents.create({
        payment_method: req.body.payment_method_id,
        amount: product.price * 100,
        currency: "cad",
        description: product.title,
        confirmation_method: "manual",
        confirm: true,
      });
    } else if (req.body.payment_intent_id) {
      intent = await stripe.paymentIntents.confirm(req.body.payment_intent_id);
    }
    const resident = await Resident.findOne({ user_id: req.body.user_id });
    console.log(resident);
    if (!resident) return res.status(404).send("The resident was not found");

    const order = new Order({
      unit_num: resident.unit_num,
      name: resident.name,
      type: product.title,
    });

    await order.save();

    // Send the response to the client
    res.send(generateResponse(intent));
  } catch (e) {
    // Display error on client
    return res.send({ error: e.message });
  }
};

const generateResponse = (intent) => {
  // Note that if your API version is before 2019-02-11, 'requires_action'
  // appears as 'requires_source_action'.
  if (
    intent.status === "requires_action" &&
    intent.next_action.type === "use_stripe_sdk"
  ) {
    // Tell the client to handle the action
    return {
      requires_action: true,
      payment_intent_client_secret: intent.client_secret,
    };
  } else if (intent.status === "succeeded") {
    // The payment didn’t need any additional actions and completed!
    // Handle post-payment fulfillment
    return {
      success: true,
    };
  } else {
    // Invalid status
    return {
      error: "Invalid PaymentIntent status",
    };
  }
};

exports.createProduct = (req, res) => {
  const file = req.file;
  const path = file ? file.path : undefined;

  const result = validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  const product = new Product({
    title: req.body.title,
    price: req.body.price,
    imagePath: path,
  });

  product
    .save()
    .then((data) => res.send(data))
    .catch(err => {
      console.log(err)
      return res.sendStatus(500)
    })
};

exports.getProducts = (req, res) => {
  Product
    .find()
    .then((data) => res.send(data))
    .catch(err => {
      console.log(err)
      return res.sendStatus(500)
    })
};
exports.getOrders = (req, res) => {
  Order
    .find()
    .then((data) => res.send(data))
    .catch(err => {
      console.log(err)
      return res.sendStatus(500)
    })
};
exports.deleteOrder = (req, res) => {
  const orderId = req.params.id;

  Order
    .deleteOne({ _id: orderId })
    .then((data) => res.send(data))
    .catch(err => {
      console.log(err)
      return res.sendStatus(500)
    })
};
