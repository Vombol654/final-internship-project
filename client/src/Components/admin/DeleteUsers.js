import React, { useEffect, useState } from "react";
import axios from "axios";
const DeleteUsers = () => {
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
  const deleteHandler = (id) => {
    const delcourse = {
      _id: id,
    };
    axios({
      url: "http://localhost:8085/admin/deleteuser",
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      data: delcourse,
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="row" style={{ marginLeft: "0px" }}>
      {allUsers.map((item, index) => {
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
                <button
                  type="button"
                  className="btn btn-danger"
                  style={{ margin: "12px" }}
                  onClick={() => deleteHandler(item._id)}
                >
                  Delete
                </button>
              </div>
            )}
          </>
        );
      })}
    </div>
  );
};

export default DeleteUsers;
