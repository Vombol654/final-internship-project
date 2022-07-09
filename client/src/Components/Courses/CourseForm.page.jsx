import Form from "../Form";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import InputField from "../InputField";
import MultiInput from "../MultiInput";
import Button from "../Button";
import { validate } from "../../validate";
import Toast from "react-bootstrap/Toast";
import "./CourseForm.page.css";
import { propose } from "../../store/action/proposeAction";
import { useHistory } from "react-router-dom";

const defaultState = { value: "", valid: false, err: "" };

const CourseForm = ({ myData, proposeData, proposeNewMentorship }) => {
  const course = JSON.parse(sessionStorage.getItem("course"));
  const [totalIntake, setTotalIntake] = useState(defaultState);
  const [services, setServices] = useState([]);
  const [servicesProvideId, setServicesProvideId] = useState({
    ...defaultState,
    value: [],
  });
  const [servicesProvide, setServicesProvide] = useState([]);
  const [callCount, setCallCount] = useState(defaultState);
  const [curriculum, setCurriculum] = useState({ ...defaultState, value: [] });
  const [cost, setCost] = useState(defaultState);
  const [about, setAbout] = useState(defaultState);

  // HELPER STATE
  const [showToast, setShowToast] = useState(false);
  const [showCC, setshowCC] = useState(false);
  const [show, setShow] = useState(false);

  const history = useHistory();

  const servicesHandler = (e) => {
    if (e.target.checked) {
      if (e.target.name === "call") {
        setshowCC(true);
      }
      setServicesProvideId({
        ...servicesProvide,
        value: [...servicesProvideId.value, e.target.value],
      });
      setServicesProvide([...servicesProvide, e.target.name]);
    } else {
      if (e.target.name === "call") {
        setshowCC(false);
      }
      setServicesProvideId({
        ...servicesProvide,
        value: servicesProvideId.value.filter((sp) => {
          return sp !== e.target.value;
        }),
      });
      setServicesProvide(
        servicesProvide.filter((sp) => {
          return sp !== e.target.name;
        })
      );
    }
  };

  const checkCurriculum = async () => {
    return validate({
      field: "curriculum",
      value: curriculum.value,
      setState: setCurriculum,
    });
  };

  const checkService = async () => {
    return validate({
      field: "services",
      value: servicesProvideId.value,
      setState: setServicesProvideId,
    });
  };

  const resetHandler = () => {
    setTotalIntake(defaultState);
    setServicesProvideId({ ...defaultState, value: [] });
    servicesProvide.map((service) => {
      document.getElementById("service-" + service).checked = false;
    });
    setServicesProvide([]);
    setCallCount(defaultState);
    setCurriculum({ ...defaultState, value: [] });
    setCost(defaultState);
    setAbout(defaultState);
  };

  const proposeHandler = async () => {
    let curriculumValid = await checkCurriculum();
    let serviceValid = await checkService();

    if (showCC) {
      if (
        totalIntake.valid &&
        curriculumValid &&
        serviceValid &&
        callCount.valid &&
        cost.valid &&
        about.valid
      ) {
        proposeMentorship(callCount.value);
      } else {
        alert("Failed to propose");
      }
    } else {
      if (
        totalIntake.valid &&
        curriculumValid &&
        serviceValid &&
        cost.valid &&
        about.valid
      ) {
        proposeMentorship(0);
      } else {
        alert("Failed to propose");
      }
    }
  };

  const proposeMentorship = (call) => {
    console.log("Call Count " + call);
    proposeNewMentorship(
      {
        totalIntake: totalIntake.value,
        mentor: myData.user,
        services: servicesProvide,
        services_id: servicesProvideId.value,
        cost: cost.value,
        course_id: course._id,
        about: about.value,
        curriculum: curriculum.value,
        callCount: call,
      },
      "mentor"
    );
    toggleToast();
  };

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
    if (!showToast && proposeData.proposed) {
      resetHandler();
      setTimeout(() => {
        history.push("/Courses");
      }, 500);
    }
  }, [proposeData, showToast]);

  useEffect(() => {
    fetch("http://localhost:8085/mentorservices")
      .then((res) => res.json())
      .then((data) => {
        setServices(data.services);
      })
      .catch((err) => alert(err));
  }, []);

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setShow(false);
      }, 2000);
    }
  }, [show]);

  return (
    <>
      <div
        id="course-form-container"
        className="course-form-container"
        style={showCC ? { width: "60%" } : {}}
      >
        <Form
          className={showCC ? "grid-col-2" : "grid-col-1"}
          submitHandler={(e) => e.preventDefault()}
        >
          <InputField
            label="Total Intake"
            id="totalIntake"
            value={totalIntake.value}
            error={totalIntake.err}
            onChange={(e) =>
              setTotalIntake({ ...totalIntake, value: e.target.value })
            }
            onBlur={() =>
              validate({
                field: "totalIntake",
                value: totalIntake.value,
                setState: setTotalIntake,
              })
            }
          />
          <div className="course-form-grid-item">
            <div className="services-container">
              <p>Services</p>
              <div className="services-input-container">
                {services.map((service) => {
                  return (
                    <div key={service._id} className="service">
                      <input
                        id={`service-${service.name}`}
                        type="checkbox"
                        value={`${service._id}`}
                        name={`${service.name}`}
                        onChange={servicesHandler}
                      />
                      <label htmlFor={`service-${service.name}`}>
                        {service.name.charAt(0).toUpperCase()}
                        {service.name.slice(1)}
                      </label>
                    </div>
                  );
                })}
              </div>
              <span className="error">{servicesProvide.err}</span>
            </div>
          </div>
          {showCC && (
            <div
              style={{ position: "relative" }}
              className={show ? "" : "popover-hide"}
            >
              <InputField
                id="call-count"
                label="No of Calls Per Month"
                value={callCount.value}
                error={callCount.err}
                onChange={(e) =>
                  setCallCount({ ...callCount, value: e.target.value })
                }
                onBlur={() =>
                  validate({
                    field: "callcount",
                    value: callCount.value,
                    setState: setCallCount,
                  })
                }
                onMouseEnter={() => {
                  setShow(true);
                }}
              />
              <div className="popover">
                <span>
                  If the call count is infinite mention <strong>Regular</strong>{" "}
                  or mention the <strong>Number</strong>.
                </span>
              </div>
            </div>
          )}
          {showCC && (
            <InputField
              label="Fee Expected per month (Rupee)"
              id="cost"
              value={cost.value}
              error={cost.err}
              onChange={(e) => setCost({ ...cost, value: e.target.value })}
              onBlur={() =>
                validate({
                  field: "cost",
                  value: cost.value,
                  setState: setCost,
                })
              }
            />
          )}
          <div className="grid-col-full">
            <MultiInput
              label="Curriculum"
              setState={setCurriculum}
              state={curriculum}
              style={showCC ? { width: "90%" } : { width: "80%" }}
            />
          </div>
          <div className="grid-col-full">
            <InputField
              label="About your mentorship"
              id="about"
              value={about.value}
              error={about.err}
              onChange={(e) => setAbout({ ...about, value: e.target.value })}
              onBlur={() =>
                validate({
                  field: "about",
                  value: about.value,
                  setState: setAbout,
                })
              }
              style={showCC ? { width: "90%" } : {}}
            />
          </div>
          {!showCC && (
            <InputField
              label="Fee Expected per month (Rupee)"
              id="cost"
              value={cost.value}
              error={cost.err}
              onChange={(e) => setCost({ ...cost, value: e.target.value })}
              onBlur={() =>
                validate({
                  field: "cost",
                  value: cost.value,
                  setState: setCost,
                })
              }
            />
          )}
          <div className="grid-col-full">
            <div
              className="course-form-btn-container"
              style={showCC ? { width: "90%" } : {}}
            >
              <Button
                btnName="Reset"
                className="btn-login"
                onClick={resetHandler}
              />
              <Button
                btnName="Propose"
                className="btn-login"
                onClick={proposeHandler}
              />
            </div>
          </div>
        </Form>
      </div>
      <Toast show={showToast} onClose={toggleToast} className="toast-bg mt-5">
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
            {proposeData.propose.mentor.name}, your proposal received as wait
            for the acceptation process which may take some days.
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
    //coursesData: state.Courses,
    myData: state.Login,
    mentor: state.Mentor,
    proposeData: state.Proposed,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // getCourses: () => dispatch(getCourses()),
    proposeNewMentorship: (proposeData, proposedfrom) =>
      dispatch(propose(proposeData, proposedfrom)),
    // setMentorship: (mentorshipDetails) =>
    //   dispatch(setMentorships(mentorshipDetails)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseForm);
