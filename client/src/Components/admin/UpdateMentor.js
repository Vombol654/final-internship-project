import React from "react";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import axios from "axios";
import "../../Styles/admin/getmentor.css";
const UpdateMentor = () => {
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
  const acceptHandler = (_id) => {
    // let _id=_id;
    let acceptObj = {
      _id,
      status: "accepted",
    };
    axios({
      url: "http://localhost:8085/admin/updatementor",
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      data: acceptObj,
    });

    const remainMentors = mentorDetails.filter((mentor) => {
      return mentor._id !== _id;
    });

    console.log(remainMentors);
    setMentorDetails(remainMentors);
  };
  const rejectHandler = (_id) => {
    let acceptObj = {
      _id,
      status: "rejected",
    };
    axios({
      url: "http://localhost:8085/admin/updatementor",
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      data: acceptObj,
    });

    const remainMentors = mentorDetails.filter((mentor) => {
      return mentor._id !== _id;
    });

    console.log(remainMentors);
    setMentorDetails(remainMentors);
  };
  return (
    <Fragment>
      <div className="row right-top">
        <div className="col-1 item id">Id</div>
        <div className="col-3 item name">Name</div>
        <div className="col-2 item language">Language</div>
        <div className="col-2 item Company">Company</div>
        <div className="col-2 item Status">Status</div>
        <div className="col-2 item Request">Request</div>
      </div>
      {mentorDetails.map((item, index) => {
        // let color=item.status=="proposed"?
        return (
          <>
            {item.status === "proposed" && (
              <div className="row right-top" key={index}>
                <div className="col-1 item id">{index + 1}</div>
                <div className="col-3 item name">{item.mentor["name"]}</div>
                <div className="col-2 item language">
                  {item.mentor["language"]}
                </div>

                <div className="col-2 item Company">
                  {item.mentor["company"]}
                </div>

                <div
                  className={
                    item.status == "proposed"
                      ? "col-2 item proposed"
                      : "col-2 item accepted"
                  }
                >
                  {item.status}
                </div>
                <div className="col-2 item">
                  <button
                    type="button"
                    className="btn btn-success"
                    style={{ marginBottom: "12px" }}
                    onClick={() => acceptHandler(item._id)}
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    style={{ marginBottom: "12px" }}
                    onClick={() => rejectHandler(item._id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            )}
          </>
        );
      })}
      {mentorDetails.filter((mentor) => {
        return mentor.status === "proposed";
      }).length === 0 && (
        <p className="no-request">Currently No Requests in the Bucket...</p>
      )}
    </Fragment>
  );
};

export default UpdateMentor;
