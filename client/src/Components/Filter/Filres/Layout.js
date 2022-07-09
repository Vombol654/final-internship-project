import { Fragment } from "react";
import { useHistory } from "react-router-dom";
import "../../../Styles/layout.css";
import "../../../Styles/mentorCard.css";

const Layout = (props) => {
  const history = useHistory();
  // const { mentorData } = props;
  const {
    _id,
    about = "",
    // designation,
    // expert,
    rating,
    reviewCount,
    // imageUrl,
    // name,
    // language,
    // city,
    services,
    cost,
    spotsLeft = 100,
    curriculum = [],
    // company = "Cognizant Technology Solutions",
    tag = "Top",
    callCount,
  } = props.mentorData;

  const { name, city, language, imageUrl, company, designation, skills } =
    props.mentorData.mentor;

  const ratingComponent = (rating) => {
    let rate = [];
    let round = (rating * 10) % 10;
    let limit = round > 5 ? Math.round(rating) : Math.floor(rating);
    let half = round === 5 ? 1 : 0;

    for (let i = 0; i < (limit < 0 ? 0 : limit); i++) {
      rate.push(<ion-icon name="star" class="md hydrated icon"></ion-icon>);
    }

    if (half === 1) {
      rate.push(
        <ion-icon name="star-half" class="md hydrated icon"></ion-icon>
      );
    }

    for (let i = 0; i < rating - limit - half; i++) {
      rate.push(
        <ion-icon name="star-outline" class="md hydrated icon"></ion-icon>
      );
    }

    return rate;
  };

  const handleNavigate = (mentorShipId, mentorId) => {
    console.log(mentorShipId, mentorId);
    history.push(`/details?mentorShipId=${mentorShipId}&mentorId=${mentorId}`);
  };

  return (
    <Fragment>
      <div className="mentor-card">
        <span className="spots-left">Only {spotsLeft} Spots Left</span>
        <div className="mentor-img">
          {/* <img src={require(`../../../${images}`)} alt={name} /> */}
          <img src={imageUrl} alt={name} />
        </div>
        <div className="mentor-details">
          <div className="mentor-details-header">
            <div className="mentor-name-tag">
              <div className="mentor-name-country">
                <h1 className="mentor-name">{name}</h1>
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
            {services.map((name) => {
              if (name === "chat") {
                return (
                  <div className="service-item">
                    <ion-icon
                      name="chatboxes"
                      class="md hydrated icon"
                    ></ion-icon>
                    <span className="service-name">Chat</span>
                  </div>
                );
              } else if (name === "call") {
                return (
                  <div className="service-item">
                    <ion-icon name="call" class="md hydrated icon"></ion-icon>
                    <span className="service-name">
                      {callCount !== "Regular"
                        ? callCount + " x "
                        : callCount + " "}
                      Call
                    </span>
                  </div>
                );
              } else if (name === "task") {
                return (
                  <div className="service-item">
                    <ion-icon
                      name="checkmark-circle-outline"
                      class="md hydrated icon"
                    ></ion-icon>
                    <span className="service-name">Task</span>
                  </div>
                );
              } else if (name === "handson") {
                return (
                  <div className="service-item">
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
          <div className="mentor-description">{about.substring(0, 250)}...</div>
          <div className="mentor-skill-sets">
            {curriculum.map((skill) => {
              return <span className="mentor-skill">{skill}</span>;
            })}
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
              One of our {tag.toLowerCase()} mentor,{tag.toLowerCase()} services
              & fast responses
            </p>
          </div>
          <div className="feature-item">
            <div className="icon-container">
              <ion-icon name="chatboxes" class="md hydrated icon"></ion-icon>
              <ion-icon name="mail" class="md hydrated icon"></ion-icon>
              <ion-icon name="text" class="md hydrated icon"></ion-icon>
            </div>
            <p className="tag-line">
              One of our {tag.toLowerCase()} mentor,{tag.toLowerCase()} services
              & fast responses
            </p>
          </div>
          <div className="feature-item">
            <ion-icon name="call" class="md hydrated icon"></ion-icon>
            <p className="tag-line">
              {callCount !== "Regular"
                ? `Up to ${callCount} ${
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
          <button
            onClick={() => handleNavigate(_id, props.mentorData.mentor._id)}
          >
            Read More
          </button>
        </div>
      </div>
    </Fragment>
  );
};
export default Layout;

{
  /* <div className="container-fluid">
        <div className="row">
          <div
            className="filter-right"
            onClick={() => handleNavigate(mentorData._id)}
          >
            <div className="layout-pic col-lg-3 col-md-4 col-sm-6">
              <img
                className="card-img-top"
                src={require(`../../../${mentorData.images}`)}
                alt="Card image cap"
              />
            </div>
            <div className="layout-details col-lg-8 col-md-7 col-sm-6">
              <span>Name:{mentorData.name}</span>
              <span>Language: {mentorData.language}</span>
              <span>Location: {mentorData.city}</span>
            </div>
            <hr />
            <div className="layout-feture">
              <span>
                {" "}
                Features:{mentorData.features.map((item) => `${item.name}, `)}
              </span>
              <span>Cost: {mentorData.cost}</span>
            </div>
          </div>
        </div>
      </div> */
}
