require("dotenv").config();
const uniquId = require("uniqid");
const path = require("path");
const Formidable = require("formidable");
const crypto = require("crypto");
const request = require("request");
const orderSchema = require("../Models/orderSchema");
const Razorpay = require("razorpay");
let orderId;

var instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.SECRET_KEY,
});
exports.payments = (req, res) => {
  var options = {
    amount: 50000,
    currency: "INR",
    receipt: uniquId(),
  };
  instance.orders.create(options, function (err, order) {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    }
    orderId = order.id;
    res.json(order);
  });
};
exports.paymentController = (req, res) => {
  const form = Formidable();
  form.parse(req, (err, fields, files) => {
    if (fields) {
      console.log("FIELDS", fields);
      const hash = crypto
        .createHmac("sha256", process.env.SECREAT_KEY)
        .update(orderId + "|" + fields.razorpay_payment_id)
        .digest("hex");

      if (fields.razorpay_signature === hash) {
        const info = {
          _id: fields.razorpay_payment_id,
          razorpay_order_id: fields.razorpay_order_id,
        };
        const order = new orderSchema({
          _id: info._id,
          orders: fields.razorpay_order_id,
        });

        order.save((err, data) => {
          if (err) {
            res.status(400).json({
              error: "Not able to save in Db",
            });
          } else {
            res.redirect(
              `${process.env.FRONTEND}/payment/status/${fields.razorpay_payment_id}`
            );
          }
        });
      } else {
        res.send("ERROR");
      }
    }
  });
};
exports.getPayment = (req, res) => {
  orderSchema.findById(req.params.paymentId).exec((err, data) => {
    if (err || data == null) {
      return res.json({
        error: "No order Found",
      });
    }
    request(
      `https://${process.env.KEY_ID}:${process.env.SECREAT_KEY}@api.razorpay.com/v1/payments/${req.params.paymentId}`,
      function (error, response, body) {
        if (body) {
          const result = JSON.parse(body);
          console.log(result);
          res.status(200).json(result);
        }
      }
    );
  });
};
