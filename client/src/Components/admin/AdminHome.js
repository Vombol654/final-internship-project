import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Getmentor from "./Getmentor";
import UpdateMentor from "./UpdateMentor";
import ViewCourse from "./ViewCourse";
import AddCourse from "./AddCourse";
import UpdateCourse from "./UpdateCourse";
import UpdateById from "./UpdateById";
import DeleteCourse from "./DeleteCourse";
import ViewUsers from "./ViewUsers";
import DeleteUsers from "./DeleteUsers";
import "../../Styles/admin/adminhome.css";
const AdminHome = () => {
  const history = useHistory();
  const handleGetMentor = () => {
    history.push(`/admin/viewmentor`);
  };
  const handleUpdateMentor = () => {
    history.push(`/admin/updatementor`);
  };
  const viewCourseHandler = () => {
    history.push(`/admin/viewcourse`);
  };
  const addCourseHandler = () => {
    history.push(`/admin/addcourse`);
  };
  const updateCourseHandler = () => {
    history.push(`/admin/updatecourse`);
  };
  const deleteCourseHandler = () => {
    history.push(`/admin/deletecourse`);
  };
  const viewUserHandler = () => {
    history.push(`/admin/getuser`);
  };
  const deleteuser = () => {
    history.push(`/admin/deleteuser`);
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3 leftside">
          <ul className="nav flex-column mentor">
            {" "}
            Mentors
            <li className="nav-item">
              <a className="nav-link" onClick={handleGetMentor}>
                View Mentors
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={handleUpdateMentor}>
                Mentor Requests
              </a>
            </li>
          </ul>
          <ul className="nav flex-column mentor course">
            {" "}
            Courses
            <li className="nav-item">
              <a className="nav-link" onClick={viewCourseHandler}>
                View Courses
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={addCourseHandler}>
                Add Courses
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={updateCourseHandler}>
                Update Courses
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={deleteCourseHandler}>
                Delete Courses
              </a>
            </li>
          </ul>
          <ul className="nav flex-column mentor course">
            {" "}
            Users
            <li className="nav-item">
              <a className="nav-link" onClick={viewUserHandler}>
                View User
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={deleteuser}>
                Delete User
              </a>
            </li>
          </ul>
        </div>
        <div className="col-8 rightside">
          <Switch>
            <Route path="/admin/viewmentor" component={Getmentor}></Route>
            <Route path="/admin/updatementor" component={UpdateMentor}></Route>
            <Route path="/admin/viewcourse" component={ViewCourse}></Route>
            <Route path="/admin/addcourse" component={AddCourse}></Route>
            <Route path="/admin/updatecourse" component={UpdateCourse}></Route>
            <Route
              path="/admin/updatecourseById"
              component={UpdateById}
            ></Route>
            <Route path="/admin/deletecourse" component={DeleteCourse}></Route>
            <Route path="/admin/getuser" component={ViewUsers}></Route>
            <Route path="/admin/deleteuser" component={DeleteUsers}></Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
