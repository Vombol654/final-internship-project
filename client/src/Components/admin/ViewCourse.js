import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import axios from "axios";
const ViewCourse = () => {
  const [allCourses, setAllCourses] = useState([]);
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
  return (
    <Fragment>
      <div className="row" style={{ marginLeft: "0px" }}>
        {allCourses.map((item, index) => {
          return (
            <div class="card col-5">
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
      </div>
    </Fragment>
  );
};

export default ViewCourse;
