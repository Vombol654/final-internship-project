import React from "react";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import axios from "axios";
import "../../Styles/admin/getmentor.css";

const Getmentor = () => {
  const [mentorDetails, setMentorDetails] = useState([]);
  useEffect(() => {
    axios({
      url: "http://localhost:8085/admin/mentordetails",
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        setMentorDetails(res.data.mentor);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Fragment>
      <div className="row right-top">
        <div className="col-1 item id">Id</div>
        <div className="col-3 item name">Name</div>
        <div className="col-2 item language">Language</div>
        <div className="col-2 item City">City</div>
        <div className="col-2 item Company">Company</div>
        <div className="col-2 item Status">Status</div>
      </div>
      {mentorDetails.map((item, index) => {
        // let color=item.status=="proposed"?
        return (
          <div className="row right-top" key={index}>
            <div className="col-1 item id">{index + 1}</div>
            <div className="col-3 item name">{item.mentor["name"]}</div>
            <div className="col-2 item language">{item.mentor["language"]}</div>
            <div className="col-2 item City">{item.mentor["city"]}</div>
            <div className="col-2 item Company">{item.mentor["company"]}</div>

            <div
              className={
                item.status == "proposed"
                  ? "col-2 item proposed"
                  : "col-2 item accepted"
              }
            >
              {item.status}
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};

export default Getmentor;
