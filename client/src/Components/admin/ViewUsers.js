import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import axios from "axios";
import Loading from "../Loading";

const ViewUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    axios({
      url: "http://localhost:8085/admin/userdata",
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        setAllUsers(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Fragment>
      <div className="row" style={{ marginLeft: "0px" }}>
        {allUsers &&
          allUsers.map((item, index) => {
            return (
              <>
                {item.userType === "mentee" && (
                  <div class="card col-5" key={index}>
                    <img
                      className="card-img-top"
                      src={item.imageUrl}
                      alt="Card image cap"
                    />
                    <div class="card-body">
                      <p className="card-text">{`${item.firstname}  ${item.lastname}`}</p>
                      <p class="card-text">{item.content}</p>
                      <p className="card-text">{item.email}</p>
                    </div>
                  </div>
                )}
              </>
            );
          })}
        {!allUsers && <Loading content="Fetching data..." />}
      </div>
    </Fragment>
  );
};

export default ViewUsers;
