require("dotenv").config();
const formidable = require("formidable");
const { v4: uuidv4 } = require("uuid");
const https = require("https");
const PaytmChecksum = require("./checksum");
const MentorShipDetails = require("../Models/mentorshipdetail");

exports.payment = (req, res) => {
  const { amount, email, mentorship_id, mentee_id } = req.body;
  console.log(mentorship_id, mentee_id);

  /* import checksum generation utility */
  const totalAmount = JSON.stringify(amount);
  var params = {};

  /* initialize an array */
  (params["MID"] = process.env.PAYTM_MID),
    (params["WEBSITE"] = process.env.PAYTM_WEBSITE),
    (params["CHANNEL_ID"] = process.env.PAYTM_CHANNEL_ID),
    (params["INDUSTRY_TYPE_ID"] = process.env.PAYTM_INDUSTRY_TYPE_ID),
    (params["ORDER_ID"] = uuidv4()),
    (params["CUST_ID"] = process.env.PAYTM_CUST_ID),
    (params["TXN_AMOUNT"] = totalAmount),
    (params[
      "CALLBACK_URL"
    ] = `http://localhost:8085/callback/${mentorship_id}/${mentee_id}`),
    (params["EMAIL"] = email),
    // (params["TIME"] = new Date().toString()),
    (params["MOBILE_NO"] = process.env.MOBILE_NUMBER);

  /**
   * Generate checksum by parameters we have
   * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
   */
  var paytmChecksum = PaytmChecksum.generateSignature(
    params,
    process.env.PAYTM_MERCHANT_KEY
  );
  paytmChecksum
    .then(function (checksum) {
      let paytmParams = {
        ...params,
        CHECKSUMHASH: checksum,
      };
      res.json(paytmParams);
    })
    .then((data) => console.log(data))
    .catch(function (error) {
      console.log(error);
    });
};

exports.callback = (req, res) => {
  const { mentorship_id, mentee_id } = req.params;
  console.log(mentorship_id, mentee_id);
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, file) => {
    paytmChecksum = fields.CHECKSUMHASH;
    delete fields.CHECKSUMHASH;

    var isVerifySignature = PaytmChecksum.verifySignature(
      fields,
      process.env.PAYTM_MERCHANT_KEY,
      paytmChecksum
    );
    if (isVerifySignature) {
      var paytmParams = {};
      paytmParams["MID"] = fields.MID;
      paytmParams["ORDERID"] = fields.ORDERID;

      /*
       * Generate checksum by parameters we have
       * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
       */
      PaytmChecksum.generateSignature(
        paytmParams,
        process.env.PAYTM_MERCHANT_KEY
      ).then(function (checksum) {
        paytmParams["CHECKSUMHASH"] = checksum;

        var post_data = JSON.stringify(paytmParams);
        var options = {
          hostname: "securegw-stage.paytm.in",
          port: 443,
          path: "/order/status",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": post_data.length,
          },
        };

        var response = "";
        var post_req = https.request(options, function (post_res) {
          post_res.on("data", function (chunk) {
            response += chunk;
          });
          post_res.on("end", async () => {
            const filteredResponse = JSON.parse(response);
            let mentorship = {},
              message = "";
            if (filteredResponse.STATUS == "TXN_SUCCESS") {
              await MentorShipDetails.updateOne(
                { _id: mentorship_id, "mentees._id": mentee_id },
                { $set: { "mentees.$.status": "confirmed" } }
              ).then(async (res) => {
                if (res.modifiedCount > 0) {
                  mentorship = await MentorShipDetails.find({
                    _id: mentorship_id,
                  });
                  message = "Action executed successfully";
                } else {
                  message = "No data modified";
                  mentorship = {};
                }
              });
              res.sendFile(__dirname + "/response.html");
            } else {
              res.sendFile(__dirname + "/failure.html");
            }
          });
        });
        post_req.write(post_data);
        post_req.end();
      });
    } else {
      console.log("Checksum Mismatched");
    }
  });
};
