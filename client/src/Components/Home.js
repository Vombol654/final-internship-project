import { Fragment, useEffect, useState } from "react";
import Wallpaper from "./Home/Wallpaper";
import QuickSearch from "./Home/QuickSearch";
import axios from "axios";
import { connect } from "react-redux";
const Home = () => {
  const wallpaper = 1;
  const [languages, setlanguages] = useState([]);
  const [courseTypes, setcourseTypes] = useState([]);
  useEffect(() => {
    sessionStorage.clear();
    axios({
      url: "http://localhost:8085/language",
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        setlanguages(res.data.language);
      })
      .catch((err) => {
        console.log(err);
      });

    axios({
      url: "http://localhost:8085/coursetypes",
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        setcourseTypes(res.data.coursetypes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [wallpaper]);
  return (
    <Fragment>
      <Wallpaper languageData={languages} />
      <QuickSearch courseData={courseTypes} />
    </Fragment>
  );
};
export default connect()(Home);
