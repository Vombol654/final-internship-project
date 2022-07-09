const express = require("express");
const commonController = require("../Controllers/common");
const languagesController = require("../Controllers/languages");
const coursetypesController = require("../Controllers/coursetypes");
const mentorServiceController = require("../Controllers/mentorService");
const mentorshipdetailsController = require("../Controllers/mentorshipdetails");
const mentorController = require("../Controllers/mentor");
const userController = require("../Controllers/users");
const paymentController = require("../Controllers/payments");
const adminMentorController = require("../Controllers/admin/mentorDetails");
const adminCourseController = require("../Controllers/admin/courseDetails");
const adminUserController = require("../Controllers/admin/userDetails");

const route = express.Router();

// LANGUAGE
route.get("/language", languagesController.getLanguages);

// COURSES
route.get("/coursetypes", coursetypesController.getcoursetypes);
route.patch("/coursetypes/update", coursetypesController.updateCourse);

// MENTOR SERVICES
route.get("/mentorservices", mentorServiceController.getMentorServices);
route.post("/mentorservices", mentorServiceController.postMentorServices);

// MENTORSHIP
route.post(
  "/mentorshipdetail",
  mentorshipdetailsController.postMentorShipDetails
);
route.get(
  "/mentorshipdetail",
  mentorshipdetailsController.getMentorShipDetails
);

route.delete(
  "/mentorshipdetail/delete/:_id",
  mentorshipdetailsController.deleteMentorShipDetailById
);

route.patch(
  "/mentorshipdetail/update",
  mentorshipdetailsController.updateMentorShipDetail
);

route.patch(
  "/mentorshipdetail/mentee/propose",
  mentorshipdetailsController.proposeMentorByMentee
);

route.patch(
  "/mentorshipdetail/mentee/remove/propose",
  mentorshipdetailsController.removeProposal
);

route.patch(
  "/mentorshipdetail/mentee/action",
  mentorshipdetailsController.actionMentorToMentee
);

route.get(
  "/mentorshipdetails/:langId",
  mentorshipdetailsController.getmentordetailsByLangId
);
route.post("/filter", mentorshipdetailsController.filteredmentordetails);
route.get(
  "/mentorshipdetail/:mentorId",
  mentorshipdetailsController.getmentordetailsByMentorId
);

route.get(
  "/mentorshipdetail/mentee/:menteeId",
  mentorshipdetailsController.getmentordetailsByMenteeId
);
route.get(
  "/mentorshipdetail/:mentorShipId/:mentorId",
  mentorshipdetailsController.getmentordetailsByMentorShipId
);
// route.patch(
//   "/metorshipdetails/mentor/update",
//   mentorshipdetailsController.updateMentorshipByMentorId
// );

// MENTEE
route.get("/users/getUsers", userController.getAllUsers);
route.post("/signup/mentee", userController.signupuser);
route.get("/user/:_id", userController.getUser);
route.patch("/user/update", userController.updateMentee);
route.get("/user/delete/:email", userController.deleteUser);
route.get("/user/deleteById/:_id", userController.deleteUserById);

// MENTOR
route.get("/mentors/getMentors", mentorController.getAllMentors);
route.post("/signup/mentor", mentorController.signupmentor);
route.patch("/mentor/update", mentorController.updateMentor);

// COMMON
route.post("/login", commonController.login);

// PAYMENT
route.post("/payment", paymentController.payment);
route.post("/callback/:mentorship_id/:mentee_id", paymentController.callback);

// Admin related route
// view Mentor
route.get(
  "/admin/mentordetails",
  adminMentorController.getmentordetailsforAdmin
);
// Delete Mentor By Id
route.delete(
  "/admin/deletementor",
  adminMentorController.deleteMentorByIdforAdmin
);
// Update Mentor By Id
route.patch(
  "/admin/updatementor",
  adminMentorController.updateMentorByIdforAdmin
);
// Add a new Mentor
// route.post('/admin/creatementor',adminMentorController.createMentorforAdmin)
// view courses
route.get("/admin/getcourse", adminCourseController.getAllCoursesForAdmin);
// update Course
route.patch("/admin/updatecourse", adminCourseController.updateCourseforAdmin);
// delete Course by admin
route.delete("/admin/deletecourse", adminCourseController.deleteCourseforAdmin);
// Add a new Course
route.post("/admin/createcourse", adminCourseController.createCourseforAdmin);
// view user
route.get("/admin/userdata", adminUserController.getAllUserDetails);
// Delete User
route.delete("/admin/deleteuser", adminUserController.deleteUserById);
module.exports = route;
