const MentorShipDetails = require("../Models/mentorshipdetail");
exports.getmentordetailsByLangId = (req, res) => {
  const { langId } = req.params;
  // console.log(langId);
  MentorShipDetails.find({
    status: "accepted",
    "mentor.language_id": parseInt(langId),
  })
    .then((response) => {
      // console.log(response);
      res.status(200).json({
        message: "mentor details fetched successfully",
        mentor: response,
      });
    })
    .catch((err) => console.log(err));
};

exports.filteredmentordetails = (req, res) => {
  let {
    coursetype,
    language,
    services,
    sort,
    lcost,
    hcost,
    page,
    itemsPerPage,
  } = req.body;

  sort = sort ? sort : 1;
  page = page ? page : 1;
  itemsPerPage = itemsPerPage ? itemsPerPage : 2;

  let startIndex = page * itemsPerPage - itemsPerPage;
  let endIndex = page * itemsPerPage;
  let filterObj = { status: "accepted" };
  // { status: "accepted" }
  coursetype && (filterObj["course_id"] = coursetype);
  language && (filterObj["mentor.language_id"] = parseInt(language));
  services && (filterObj["services_id"] = { $in: services });
  lcost && hcost && (filterObj["cost"] = { $gte: lcost, $lte: hcost });
  console.log(filterObj);
  MentorShipDetails.find(filterObj)
    .sort({ cost: sort })
    .then((response) => {
      const filteredResponse = response.slice(startIndex, endIndex);
      const data = Math.ceil(response.length / itemsPerPage);
      console.log(filteredResponse, data);
      res.status(200).json({
        message: "mentor details fetched successfully",
        mentorships: filteredResponse,
        pages: data,
      });
      // else{
      //     res.status(404).json({
      //         message:"The requested resource was not found ",
      //         mentor:filteredResponse,
      //         Data:data
      //     })
      // }
    })
    .catch((err) => console.log(err));
};

// exports.getmentordetailsByMentorId = (req, res) => {
//   const { mentorId } = req.params;
//   console.log(mentorId);
//   MentorShipDetails.findById(mentorId)
//     // MentorDetails.findOne({ mentor: { _id: mentorId } })
//     .then((response) => {
//       res.status(200).json({
//         message: "mentor details fetched successfully",
//         mentor: response,
//       });
//     })
//     .catch((err) => console.log(err));
// };

exports.getmentordetailsByMentorShipId = async (req, res) => {
  const { mentorShipId, mentorId } = req.params;
  console.log(mentorShipId, mentorId);
  MentorShipDetails.find({ _id: mentorShipId, "mentor._id": mentorId })
    .then((response) => {
      console.log(response);
      res.status(200).json({
        message: "mentorship details fetched successfully",
        mentorship: response,
      });
    })
    .catch((err) => console.log(err));
};

exports.getmentordetailsByMentorId = async (req, res) => {
  const { mentorId } = req.params;

  MentorShipDetails.find({ "mentor._id": mentorId })
    .then((response) => {
      res.status(200).json({
        message: "mentorship details fetched successfully",
        mentorship: response,
      });
    })
    .catch((err) => console.log(err));
};

exports.getmentordetailsByMenteeId = async (req, res) => {
  const { menteeId } = req.params;

  MentorShipDetails.find({ mentees: { $elemMatch: { _id: menteeId } } })
    .then((response) => {
      res.status(200).json({
        message: "mentorship details fetched successfully",
        mentorship: response,
      });
    })
    .catch((err) => console.log(err));
};

// POST MENTORSHIP

exports.postMentorShipDetails = async (req, res) => {
  console.log(req.body);

  const mentorship = new MentorShipDetails({
    ...req.body,
    spotsLeft: req.body.totalIntake,
    status: "proposed",
  });

  mentorship
    .save()
    .then((data) => {
      res
        .status(200)
        .json({ mentorship: data, message: "Proposed successfully" });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: err, message: "Mentorship Failed to Propose" });
    });
};

exports.getMentorShipDetails = async (req, res) => {
  const mentorship = await MentorShipDetails.find();
  res.json(mentorship);
};

exports.deleteMentorShipDetailById = async (req, res) => {
  const { _id } = req.params;
  const response = await MentorShipDetails.findOneAndDelete({ _id });
  res.json(response);
};

// UPDATE MENTORSHIP

exports.updateMentorShipDetail = async (req, res) => {
  const { _id } = req.body;
  const mentorship = await MentorShipDetails.findOneAndUpdate(
    { _id },
    {
      $set: { ...req.body },
    }
  );

  res.json({ mentorship, message: "Successfully Updated..." });
};

// PROPOSE A MENTOR BY MENTEE

exports.proposeMentorByMentee = async (req, res) => {
  const { _id, mentee_id } = req.body;
  let message = "",
    mentorship = {};
  await MentorShipDetails.updateOne(
    { _id: _id },
    { $push: { mentees: { _id: mentee_id, status: "proposed" } } }
  )
    .then(async (res) => {
      if (res.modifiedCount > 0) {
        mentorship = await MentorShipDetails.find({ _id });
        console.log(mentorship);
        message = "Proposed successfully";
      } else {
        message = "No data modified";
        mentorship = {};
      }
    })
    .catch((err) => {
      message = err;
      mentorship = {};
    });

  res.json({ message, mentorship });
};

exports.removeProposal = async (req, res) => {
  const { _id, mentee_id } = req.body;
  let message = "",
    mentorship = {};
  await MentorShipDetails.updateOne(
    { _id: _id },
    { $pull: { mentees: { _id: mentee_id, status: "proposed" } } }
  )
    .then(async (res) => {
      if (res.modifiedCount > 0) {
        mentorship = await MentorShipDetails.find({ _id });
        console.log(mentorship);
        message = "Proposal Recalled";
      } else {
        message = "No data modified";
        mentorship = {};
      }
    })
    .catch((err) => {
      message = err;
      mentorship = {};
    });

  res.json({ message, mentorship });
};

// ACTION ON PROPOSAL FROM MENTOR TO MENTEE

exports.actionMentorToMentee = async (req, res) => {
  const { mentorship_id, mentee_id, status } = req.body;
  console.log(mentorship_id, mentee_id, status);
  let message = "",
    mentorship = {};

  await MentorShipDetails.updateOne(
    { _id: mentorship_id, "mentees._id": mentee_id },
    { $set: { "mentees.$.status": status } }
  )
    .then(async (res) => {
      if (res.modifiedCount > 0) {
        mentorship = await MentorShipDetails.find({ _id: mentorship_id });
        message = "Action executed successfully";
      } else {
        message = "No data modified";
        mentorship = {};
      }
    })
    .catch((err) => {
      message = err;
      mentorship = {};
    });

  console.log(mentorship);

  res.json({ message, mentorship });
};

exports.updateMentorshipByMentorId = async (email, imageUrl) => {
  // const { email, imageUrl } = req.body;

  const mentorship = await MentorShipDetails.updateMany(
    { "mentor.email": email },
    { $set: { "mentor.imageUrl": imageUrl } }
  );
  console.log(mentorship);
  // res.json(mentorship);
};
