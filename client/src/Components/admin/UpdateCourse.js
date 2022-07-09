import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Loading from "../Loading";

const UpdateCourse = () => {
  const [allCourses, setAllCourses] = useState([]);
  const history = useHistory();
  useEffect(() => {
    axios({
      url: "http://localhost:8085/admin/getcourse",
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        setAllCourses(res.data.courses);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const updateByIdHandler = (id) => {
    console.log(id);
    sessionStorage.setItem("id", id);
    history.push(`/admin/updatecourseById`);
  };
  return (
    <Fragment>
      <p>select anyone which you want to update</p>
      <div className="row" style={{ marginLeft: "0px" }}>
        {allCourses &&
          allCourses.map((item, index) => {
            return (
              <div
                class="card col-5"
                onClick={() => updateByIdHandler(item._id)}
              >
                <img
                  className="card-img-top"
                  src={item.image}
                  alt="Card image cap"
                />
                <div class="card-body">
                  <p className="card-text">{item.name}</p>
                  <p class="card-text">{item.content}</p>
                  <div>
                    Skills Required:
                    <ul>
                      {item.skillsRequired.map((ite, inde) => {
                        return <li>{ite}</li>;
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        {!allCourses && <Loading content="Fetching Courses..." />}
      </div>
    </Fragment>
  );
};

export default UpdateCourse;
