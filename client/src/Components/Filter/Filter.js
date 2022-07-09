import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { connect } from "react-redux";
import axios from "axios";
import queryString from "query-string";
import "../../Styles/filter.css";
import Loading from "../Loading";
import Layout from "./Filres/Layout";
import Pagenition from "./Filres/Pagenition";
import Button from "../Button";

import { filter } from "../../store/action/filterAction";

const Filter = ({ filterData, filter }) => {
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [mentordetails, setmentordetails] = useState([]);
  const [courses, setCourses] = useState("");
  const [coursesI, setCoursesI] = useState("");
  const [language, setlanguage] = useState("");
  const [languageI, setlanguageI] = useState("");
  const [services, setServices] = useState([]);
  const [sort, setsort] = useState(1);
  const [lcost, setlcost] = useState("");
  const [hcost, sethcost] = useState("");
  const [page, setpage] = useState(1);
  const [pageCount, setpageCount] = useState(1);
  const filterHandler = () => {
    setIsFilterVisible((prevState) => !prevState);
  };
  const location = useLocation();
  const qs = queryString.parse(location.search);
  const { course_type, languageId } = qs;
  const selectCourse = document.getElementById("select-course");
  const selectLanguage = document.getElementById("select-lang");
  const filterObj = {
    coursetype: course_type,
    language: languageId,
  };

  useEffect(() => {
    filter(filterObj);

    axios({
      url: "http://localhost:8085/language",
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        setlanguage(res.data.language);
      })
      .catch((err) => {
        console.log(err);
      });

    axios({
      url: "http://localhost:8085/coursetypes",
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      setCourses(res.data.coursetypes);
    });
  }, []);

  useEffect(() => {
    setpage(1);
    setmentordetails(filterData.filteredData);
    setpageCount(filterData.pageCount);
  }, [filterData]);

  useEffect(() => {
    console.log("fr Fil " + page);
  }, [page]);

  const handleSortChange = (sort) => {
    const filterSortObj = {
      coursetype: course_type ? course_type : coursesI,
      language: languageId ? languageId : languageI,
      services: services.length > 0 ? services : "",
      lcost,
      hcost,
      sort: sort,
      page,
    };

    filter(filterSortObj);
    setsort(sort);
  };
  const handleCostChange = (lcost, hcost) => {
    const filterCostObj = {
      coursetype: course_type ? course_type : coursesI,
      language: languageId ? languageId : languageI,
      services: services.length > 0 ? services : "",
      lcost,
      hcost,
      sort: sort,
      page,
    };

    filter(filterCostObj);
    sethcost(hcost);
    setlcost(lcost);
  };
  const handleCourseChange = (course) => {
    const course_id = course === "" || course === "0" ? "" : course;
    const filterCourseObj = {
      coursetype: course_id,
      language: languageId ? languageId : languageI,
      services: services.length > 0 ? services : "",
      lcost,
      hcost,
      sort: sort,
      page,
    };
    filter(filterCourseObj);
    setCoursesI(course_id);
  };
  const handleLanguageChange = (language_id) => {
    const filterLangObj = {
      coursetype: course_type ? course_type : coursesI,
      language: language_id,
      services: services.length > 0 ? services : "",
      lcost,
      hcost,
      sort: sort,
      page,
    };
    filter(filterLangObj);
    setlanguageI(language_id);
  };
  const handleServices = (serviceId) => {
    const index = services.indexOf(serviceId);
    console.log(index, services);
    if (index >= 0) {
      services.splice(index, 1);
    } else {
      services.push(serviceId);
    }
    const filterFeatureObj = {
      coursetype: course_type ? course_type : coursesI,
      language: languageId ? languageId : languageI,
      services: services.length > 0 ? services : "",
      lcost,
      hcost,
      sort: sort,
    };

    filter(filterFeatureObj);
    setServices(services);
  };
  const handlePageClick = (pageNo) => {
    const filterPageObj = {
      coursetype: course_type ? course_type : coursesI,
      language: languageId ? languageId : languageI,
      services: services.length > 0 ? services : "",
      lcost,
      hcost,
      sort: sort,
      page: pageNo,
      itemsPerPage: 2,
    };
    filter(filterPageObj);
    setpage(pageNo);
  };

  const resetFilter = () => {
    const costRadio = document.getElementsByName("cost");
    const serviceCheckbox = document.getElementsByName("service");
    const sortRadio = document.getElementsByName("sort");
    const reset = (value, index, elements) => {
      // if (
      //   elements[0].parentElement.parentElement.classList[0] ===
      //     "filter-radio" &&
      //   elements[index].checked === true
      // ) {
      //   handleCostChange("", "");
      // } else if (
      //   elements[0].parentElement.parentElement.classList[0] ===
      //     "filter-checkbox" &&
      //   elements[index].checked === true
      // ) {
      //   handleServices(elements[index].value);
      // }

      elements[index].checked = !value;
    };

    costRadio.forEach(reset);
    serviceCheckbox.forEach(reset);
    sortRadio.forEach(reset);

    if (!course_type) {
      selectCourse.disabled = false;
      selectCourse.value = 0;
    }
    if (!languageId) {
      selectCourse.disabled = false;
      selectLanguage.value = 0;
    }
    if (course_type || languageId) {
      filter(filterObj);
    } else {
      filter({});
    }
    setCoursesI("");
    setlanguageI("");
    setServices([]);
    setsort(1);
    setlcost("");
    sethcost("");
    setpage(1);
  };

  return (
    <div className="filter-page">
      <div className="filter">
        <div className="filter-content">
          <h3>
            Filter
            <i className="fa-solid fa-angle-down" onClick={filterHandler}></i>
          </h3>
        </div>
        <div className={isFilterVisible ? "filter-main-content" : "visible"}>
          <div className="filter-course">
            <h5>Course</h5>
            <select
              id="select-course"
              defaultValue={0}
              // value={course_type ? course_type : "0"}
              disabled={course_type ? true : false}
              onChange={(e) => handleCourseChange(e.target.value)}
            >
              <option value="0" disabled selected={course_type ? true : false}>
                Select Course
              </option>
              <option value="">All Courses</option>
              {courses &&
                courses.map((item, index) => {
                  return (
                    <option
                      value={item._id}
                      key={index}
                      selected={course_type === item._id ? true : false}
                    >
                      {item.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="filter-lang">
            <h5>Language</h5>
            <select
              id="select-lang"
              defaultValue="0"
              disabled={languageId ? true : false}
              onChange={(e) =>
                handleLanguageChange(
                  e.target.value === "0" || e.target.value === ""
                    ? ""
                    : e.target.value
                )
              }
            >
              <option value="0" disabled selected={languageId ? true : false}>
                select Language
              </option>
              <option value="">All Language</option>
              {language &&
                language.map((item, index) => {
                  return (
                    <option
                      value={item.language_id}
                      key={index}
                      selected={
                        languageId === `${item.language_id}` ? true : false
                      }
                    >
                      {item.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="filter-feature">
            <h5>Services:</h5>
            <div className="filter-checkbox-container">
              {/* {services.map(({ name, _id }) => {
                return (
                  <div className="filter-checkbox">
                    <label>
                      <input
                        type="checkbox"
                        onChange={() => handleServices(_id)}
                      />{" "}
                      {name.charAt(0).toUpperCase()}
                      {name.slice(1)}
                    </label>
                  </div>
                );
              })} */}

              <div className="filter-checkbox">
                <label>
                  <input
                    id="chat"
                    type="checkbox"
                    name="service"
                    value="62c16318617dec7dd6e957a3"
                    onChange={(e) => handleServices(e.target.value)}
                  />{" "}
                  Chat
                </label>
              </div>
              <div className="filter-checkbox">
                <label>
                  <input
                    id="call"
                    type="checkbox"
                    name="service"
                    value="62c16326617dec7dd6e957a5"
                    onChange={(e) => handleServices(e.target.value)}
                  />{" "}
                  Call
                </label>
              </div>
              <div className="filter-checkbox">
                <label>
                  <input
                    id="task"
                    type="checkbox"
                    name="service"
                    value="62c16331617dec7dd6e957a7"
                    onChange={(e) => handleServices(e.target.value)}
                  />{" "}
                  Task
                </label>
              </div>
              <div className="filter-checkbox">
                <label>
                  <input
                    id="handson"
                    type="checkbox"
                    name="service"
                    value="62c1633a617dec7dd6e957a9"
                    onChange={(e) => handleServices(e.target.value)}
                  />{" "}
                  HandsOn
                </label>
              </div>
            </div>
          </div>
          <div className="filter-cost">
            <h5>Cost per Session</h5>
            <div className="filter-radio-container">
              <div className="filter-radio">
                <label>
                  <input
                    type="radio"
                    name="cost"
                    // min={1}
                    aria-valuemin={1}
                    aria-valuemax={499}
                    onChange={(e) =>
                      handleCostChange(
                        e.target.ariaValueMin,
                        e.target.ariaValueMax
                      )
                    }
                  />{" "}
                  less than 500
                </label>
              </div>
              <div className="filter-radio">
                <label>
                  <input
                    type="radio"
                    name="cost"
                    onChange={() => handleCostChange(500, 999)}
                  />{" "}
                  500-999
                </label>
              </div>
              <div className="filter-radio">
                <label>
                  <input
                    type="radio"
                    name="cost"
                    onChange={() => handleCostChange(1500, 2499)}
                  />{" "}
                  1000-1499
                </label>
              </div>
              <div className="filter-radio">
                <label>
                  <input
                    type="radio"
                    name="cost"
                    onChange={() => handleCostChange(1500, 2499)}
                  />{" "}
                  1500-2499
                </label>
              </div>
              <div className="filter-radio">
                <label>
                  <input
                    type="radio"
                    name="cost"
                    onChange={() => handleCostChange(2500, 9999)}
                  />{" "}
                  2500+
                </label>
              </div>
            </div>
          </div>
          <div className="filter-sort">
            <h5>Sort</h5>
            <div className="filter-sort-container">
              <div className="sort">
                <label>
                  <input
                    type="radio"
                    name="sort"
                    onChange={() => handleSortChange(1)}
                  />{" "}
                  Price low to high
                </label>
              </div>
              <div className="sort">
                <label>
                  <input
                    type="radio"
                    name="sort"
                    onChange={() => handleSortChange(-1)}
                  />{" "}
                  Price high to low
                </label>
              </div>
            </div>
          </div>
          <div className="filter-reset">
            <Button
              btnName="Reset Filter"
              className="btn-login"
              onClick={resetFilter}
            />
          </div>
        </div>
      </div>
      {filterData.loading && (
        <Loading content="Filtering data please wait..." />
      )}
      {!filterData.loading && filterData.filtered && (
        <div className="layout-grid">
          {mentordetails.length > 0 ? (
            mentordetails.map((item) => {
              return <Layout mentorData={item} key={item._id} />;
            })
          ) : (
            <p className="no-result">No Result!</p>
          )}
        </div>
      )}
      {pageCount > 1 || mentordetails.length > 0 ? (
        <Pagenition
          onPageChange={handlePageClick}
          activePage={page}
          totalPages={pageCount}
        />
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filterData: state.Filter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    filter: (filterObj) => dispatch(filter(filterObj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
