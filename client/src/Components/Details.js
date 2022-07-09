import { Fragment, useEffect, useState } from "react";
import queryString from "query-string";
import { useLocation, useHistory } from "react-router";
import Toast from "react-bootstrap/Toast";
import axios from "axios";
import "../Styles/details.css";
import "../Styles/mentorDetailPage.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { propose } from "../store/action/proposeAction";

const ratingComponent = (rating) => {
  let rate = [];
  let round = (rating * 10) % 10;
  let limit = round > 5 ? Math.round(rating) : Math.floor(rating);
  let half = round === 5 ? 1 : 0;

  for (let i = 0; i < (limit < 0 ? 0 : limit); i++) {
    rate.push(<ion-icon name="star" class="md hydrated icon"></ion-icon>);
  }

  if (half === 1) {
    rate.push(<ion-icon name="star-half" class="md hydrated icon"></ion-icon>);
  }

  for (let i = 0; i < rating - limit - half; i++) {
    rate.push(
      <ion-icon name="star-outline" class="md hydrated icon"></ion-icon>
    );
  }

  return rate;
};

const Details = ({ loginData, proposeData, proposeMentor }) => {
  const location = useLocation();
  const qs = queryString.parse(location.search);
  const { mentorShipId, mentorId } = qs;

  const [mentorData, setMentorData] = useState({
    _id: 0,
    about: "About Mentor",
    mentor: {
      name: "Mentor Name",
      designation: "Mentor Designation",
      city: "City",
      language: "Language",
      imageUrl: "",
      company: "Company Name",
      phone: "Phone Number",
      email: "Mentor Email Id",
      skills: [],
    },
    rating: 0,
    reviewCount: 0,
    services: [],
    spotsLeft: 0,
    tag: "Top Mentor",
    cost: 0,
    callCount: 2,
    mentees: [],
  });
  const [mentee, setMentee] = useState({ status: "", _id: "" });

  // HELPER STATES
  const [showToast, setShowToast] = useState(false);

  const {
    _id,
    about,
    rating = 0,
    reviewCount = 0,
    cost,
    services,
    spotsLeft = 100,
    tag = "Top",
    curriculum = [],
    callCount = 2,
    mentees = [],
  } = mentorData;

  const {
    name = "",
    designation,
    city,
    language,
    imageUrl,
    company,
    phone,
    email,
    skills,
  } = mentorData.mentor;

  const history = useHistory();

  const toggleToast = () => {
    setShowToast(!showToast);
    while (proposeData.loading) {}
    delayToast();
  };

  const delayToast = () => {
    setTimeout(() => {
      setShowToast(false);
    }, 1000);
  };

  useEffect(() => {
    console.log(proposeData);
    if (proposeData.proposed) {
      axios({
        url: `http://localhost:8085/mentorshipdetail/${mentorShipId}/${mentorId}`,
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          console.log(res.data.mentorship);
          setMentorData({ ...res.data.mentorship[0] });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [proposeData]);

  useEffect(() => {
    // if (!showToast && proposeData.proposed) {
    console.log(showToast);
    // }
  }, [showToast]);

  // useEffect(() => {
  //   console.log(mentorships);
  // }, [mentorships]);

  useEffect(() => {
    axios({
      url: `http://localhost:8085/mentorshipdetail/${mentorShipId}/${mentorId}`,
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log(res.data);
        setMentorData({ ...res.data.mentorship[0] });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log(mentorData);
    let findMentee = mentorData.mentees.find((mentee) => {
      return mentee._id === loginData.user._id;
    });
    // console.log(findMentee);
    if (findMentee) {
      if (findMentee["status"] === "accepted") {
        sessionStorage.setItem("mentorName", name);
        sessionStorage.setItem("mentorship_id", _id);
        sessionStorage.setItem(
          "menteeName",
          `${loginData.user.firstname} ${loginData.user.lastname}`
        );
        sessionStorage.setItem("mentee_id", loginData.user._id);
        sessionStorage.setItem("amount", cost);
      }
    }
    setMentee(findMentee ? findMentee : { status: "", _id: "" });
  }, [mentorData]);

  const handleProposal = () => {
    proposeMentor({ _id, mentee_id: loginData.user._id });
    toggleToast();
  };

  const handlePayment = () => {
    history.push("/payment");
  };

  return (
    <>
      <div className="mentor-details-container">
        {/* <div className="navigate-container"> */}
        <div className="navigation-list">
          <Link to="/">
            <ion-icon class="md hydrated icon" name="home"></ion-icon>
          </Link>
          <span className="right-icon">&#10095;</span>
          <Link onClick={() => history.goBack()}>Filter</Link>
          <span className="right-icon">&#10095;</span>
          <Link to={`/details?mentorId=${_id}`}>{name}</Link>
          {/* </div> */}
        </div>
        <div className="mentor-page">
          {/* <span className="spots-left">Only {spotsLeft} Spots Left</span> */}
          <div className="mentor-img">
            {/* <img src={require(`../${images}`)} alt={name} /> */}
            <img src={imageUrl} alt={name} />
          </div>
          <div className="mentor-details">
            <div className="mentor-details-header">
              <div className="mentor-name-tag">
                <div className="mentor-name-country">
                  <h1 className="mentor-name">{name}</h1>
                  {/* <span className="country">{country}</span> */}
                </div>
                {tag !== "" && (
                  <p className="mentor-tag">
                    <span>
                      <ion-icon name="star" class="md hydrated icon"></ion-icon>
                    </span>
                    <span>{tag} Mentor</span>
                  </p>
                )}
              </div>
              <div className="mentor-occupation">
                <ion-icon class="md hydrated icon" name="ribbon"></ion-icon>
                <p>
                  {designation} at{" "}
                  <span className="mentor-company">{company}</span>
                </p>
              </div>
              <div className="locality">
                <div className="location">
                  <ion-icon class="md hydrated icon" name="pin"></ion-icon>
                  <span>
                    {city.charAt(0).toUpperCase()}
                    {city.slice(1)}
                  </span>
                </div>
                <div className="language">
                  <ion-icon class="md hydrated icon" name="mic"></ion-icon>
                  <span>
                    {language.charAt(0).toUpperCase()}
                    {language.slice(1)}
                  </span>
                </div>
              </div>
              {reviewCount > 0 && (
                <div className="mentor-review">
                  <div className="ratings">
                    {ratingComponent(rating).map((r) => {
                      return r;
                    })}
                  </div>
                  <span className="review-count">({reviewCount} reviews)</span>
                </div>
              )}
              {reviewCount === 0 && (
                <div className="mentor-review">
                  <div className="ratings">
                    <ion-icon
                      name="star-outline"
                      class="md hydrated icon"
                    ></ion-icon>
                    <ion-icon
                      name="star-outline"
                      class="md hydrated icon"
                    ></ion-icon>
                    <ion-icon
                      name="star-outline"
                      class="md hydrated icon"
                    ></ion-icon>
                    <ion-icon
                      name="star-outline"
                      class="md hydrated icon"
                    ></ion-icon>
                    <ion-icon
                      name="star-outline"
                      class="md hydrated icon"
                    ></ion-icon>
                  </div>
                  <span className="review-count">({reviewCount} reviews)</span>
                </div>
              )}
            </div>
            <div className="mentor-services">
              {services.map((service, i) => {
                if (service === "chat") {
                  return (
                    <div key={i} className="service-item">
                      <ion-icon
                        name="chatboxes"
                        class="md hydrated icon"
                      ></ion-icon>
                      <span className="service-name">Chat</span>
                    </div>
                  );
                } else if (service === "call") {
                  return (
                    <div key={i} className="service-item">
                      <ion-icon name="call" class="md hydrated icon"></ion-icon>
                      <span className="service-name">
                        {callCount !== "Regular"
                          ? callCount + " x "
                          : callCount + " "}
                        Call
                      </span>
                    </div>
                  );
                } else if (service === "task") {
                  return (
                    <div key={i} className="service-item">
                      <ion-icon
                        name="checkmark-circle-outline"
                        class="md hydrated icon"
                      ></ion-icon>
                      <span className="service-name">Task</span>
                    </div>
                  );
                } else if (service === "handson") {
                  return (
                    <div key={i} className="service-item">
                      <ion-icon
                        name="briefcase"
                        class="md hydrated icon"
                      ></ion-icon>
                      <span className="service-name">HandsOn</span>
                    </div>
                  );
                }
              })}
            </div>
            <div className="mentor-description">{about}</div>
          </div>
          <div className="mentorship-academic-details">
            <div className="mentor-skills">
              <h3>Mentor's Skilled Areas :</h3>
              <div className="mentor-skill-sets">
                {skills.map((skill, i) => {
                  return (
                    <span key={i} className="mentor-skill">
                      {skill}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="mentor-curriculum-container">
              <h3>Curriculum of the course :</h3>
              <div className="mentor-curriculums">
                {curriculum.map((skill, i) => {
                  return (
                    <span key={i} className="mentor-curriculum">
                      {skill}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="mentorship-details">
            <div className="mentorship-details-header">
              <p className="free-trail">
                <ion-icon name="trophy" class="md hydrated icon"></ion-icon>{" "}
                <span>7 Day Free Trial</span>
              </p>
            </div>

            <p className="mentorship-expectation">
              What can I expect from this mentor?
            </p>
            <div className="feature-item">
              <ion-icon name="school" class="md hydrated icon"></ion-icon>
              <p className="tag-line">
                One of our {tag.toLowerCase()} mentor,{tag.toLowerCase()}{" "}
                services & fast responses
              </p>
            </div>
            <div className="feature-item">
              <div className="icon-container">
                <ion-icon name="chatboxes" class="md hydrated icon"></ion-icon>
                <ion-icon name="mail" class="md hydrated icon"></ion-icon>
                <ion-icon name="text" class="md hydrated icon"></ion-icon>
              </div>
              <p className="tag-line">
                Unlimited chat, e-mail or text with mentor, within boundaries.
              </p>
            </div>
            <div className="feature-item">
              <ion-icon name="call" class="md hydrated icon"></ion-icon>
              <p className="tag-line">
                {callCount !== "Regular"
                  ? `Up to ${parseInt(callCount)} ${
                      parseInt(callCount) > 1 ? "calls" : "call"
                    } per month`
                  : `Regular 1-on-1 calls, per agreement with mentor`}
              </p>
            </div>
          </div>
          <div className="price">
            ₹{cost}
            <span>/month</span>
          </div>
          <div className="view-profile">
            {loginData.loggedIn && mentee._id === "" ? (
              <button onClick={handleProposal}>Propose Mentor</button>
            ) : null}
            {loginData.loggedIn &&
            mentee._id !== "" &&
            mentee.status === "proposed" ? (
              <button
                title="Waiting for mentor to accept your proposal"
                style={{ cursor: "not-allowed" }}
              >
                Proposed Mentor
              </button>
            ) : null}
            {loginData.loggedIn &&
            mentee._id !== "" &&
            mentee.status === "accepted" ? (
              <button onClick={handlePayment}>Proceed to Payment</button>
            ) : null}
            {loginData.loggedIn &&
            mentee._id !== "" &&
            mentee.status === "confirmed" ? (
              <button>Go to My Mentors</button>
            ) : null}
            {!loginData.loggedIn && (
              <Link to="/Login">
                <button>Login to Proceed</button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <Toast
        show={showToast}
        onClose={toggleToast}
        style={{
          width: "50%",
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
        className="toast-bg mt-5"
      >
        <Toast.Header closeButton={true}>
          {proposeData.proposed && (
            <strong className="me-auto">Proposed Successfully...</strong>
          )}
          {proposeData.loading && <strong className="me-auto">Loading</strong>}
          {proposeData.error !== "" && (
            <strong className="me-auto">Proposal Failed</strong>
          )}
        </Toast.Header>
        {proposeData.loading && (
          <Toast.Body>
            <span className="spinner-border spinner-border-sm"></span>{" "}
            Loading...
          </Toast.Body>
        )}
        {proposeData.proposed && !proposeData.loading && (
          <Toast.Body>
            {loginData.user.firstname}, your proposal sent to {name}, wait for
            the acceptation process which may take some days.
          </Toast.Body>
        )}
        {proposeData.error && !proposeData.loading && (
          <Toast.Body>
            {/* <p>{proposeData.error}</p> */}
            <p>Your request is failure try again...</p>
          </Toast.Body>
        )}
      </Toast>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loginData: state.Login,
    mentorships: state.Mentor,
    proposeData: state.Proposed,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    proposeMentor: (proposeData) => dispatch(propose(proposeData, "mentee")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);
