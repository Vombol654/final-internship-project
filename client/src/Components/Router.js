import { BrowserRouter, Route } from "react-router-dom";
import { Fragment } from "react";
import Header from "./Header";
import Filter from "./Filter/Filter";
import Home from "./Home";
import Details from "./Details";
import Payment from "./Payment";
import Login from "./Login/Login.page";
import SignUp from "./SignUp/SignUp.page";
import Courses from "./Courses/Courses.page";
import CourseForm from "./Courses/CourseForm.page";
import MyMentorships from "./MyMentorships/MyMentorships.page";
import Mentorship from "./Mentorship/Mentorship.page";
import MentorRequest from "./MentorAction/MentorRequest.page";
import MyMentors from "./MyMentors/MyMentors.page";
import AdminHome from "./admin/AdminHome";
function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Route path="/admin" component={AdminHome} />
      <Route exact path="/" component={Home} />
      <Route path="/filter" component={Filter} />
      <Route path="/Courses" component={Courses} />
      <Route path="/details" component={Details} />
      <Route path="/courseform" component={CourseForm} />
      <Route path="/myMentorships" component={MyMentorships} />
      <Route path="/Mentorship" component={Mentorship} />
      <Route path="/MentorRequest" component={MentorRequest} />
      <Route path="/payment" component={Payment} />
      <Route path="/MyMentors" component={MyMentors} />
      <Route path="/Login" component={Login} />
      <Route path="/SignUp" component={SignUp} />
    </BrowserRouter>
  );
}
export default Router;
