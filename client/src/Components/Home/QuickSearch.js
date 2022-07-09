import { Fragment } from "react";
import QuickSearchItem from "./QuickSearchItem/QuickSearchItem";
import "../../Styles/quickSearch.css";
const QuickSearch = (props) => {
  const { courseData } = props;
  return (
    <Fragment>
      <div className="quick">
        <h2>Quick Search</h2>
        <h5>Master your craft with leading mentors at your side.</h5>
      </div>
      <div className="container-fluid">
        <div className="row">
          {courseData.map((item, index) => {
            return <QuickSearchItem QuickSearchItemData={item} key={index} />;
          })}
        </div>
      </div>
    </Fragment>
  );
};
export default QuickSearch;
