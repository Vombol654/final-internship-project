import React, { Fragment, useEffect, useRef, useState } from "react";
import axios from "axios";
const AddCourse = () => {
  const [name, setname] = useState("");
  const [content, setcontent] = useState("");
  const [nameV, setnameV] = useState("");
  const [contentV, setcontentV] = useState("");
  const [skill, setSkill] = useState("");
  const [Skills, setSkills] = useState([]);
  const [SkillsV, setSkillsV] = useState([]);
  const [imgUrl, setImgUrl] = useState(
    "http://localhost:8085/file/1656790286442-MentorOnDemand-js.png"
  );
  //   const nameInputRef = useRef();
  // const contentInputRef=useRef();

  useEffect(() => {
    if (nameV && contentV && SkillsV) {
      // console.log(nameV,contentV,SkillsV)
      const createcourse = {
        name: nameV,
        content: contentV,
        image: imgUrl,
        skillsRequired: SkillsV,
      };
      axios({
        url: "http://localhost:8085/admin/createcourse",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: createcourse,
      })
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
    }
  }, [nameV, contentV, Skills, SkillsV]);
  const skillHandler = (event) => {
    setSkill(event.target.value);
    // console.log(event.target.value)
  };
  const nameHandler = (event) => {
    setname(event.target.value);
  };
  const contentHandler = (event) => {
    setcontent(event.target.value);
  };
  const addSkillHandler = () => {
    setSkills([...Skills, skill]);
    setSkill("");
    //   console.log(Skills)
    {
      /*
        if(skills.indexOf(skill)>-1){
        //   console.log(skill)
        // return
        }
        else{
            // setSkills(Skills.push(skill)) 
            // setSkill(' ')
            skills.push(skill)
            console.log(skills)
        }
    // setSkills(skills)
    */
    }
  };
  const handleFormData = (event) => {
    event.preventDefault();
    // setname(nameInputRef.current.value);
    // setcontent(contentInputRef.current.value)
    setnameV(name);
    setcontentV(content);
    setSkillsV(Skills);
    setname("");
    setcontent("");
    setSkills("");
  };
  return (
    <Fragment>
      <form onSubmit={handleFormData}>
        <div class="form-group">
          <label for="formGroupExampleInput">Name</label>
          <input
            type="text"
            class="form-control"
            id="formGroupExampleInput"
            placeholder="ABC "
            onChange={nameHandler}
            value={name}
            // ref={nameInputRef}
          />
        </div>
        <div class="form-group">
          <label for="formGroupExampleInput2">Content</label>
          <input
            type="text"
            class="form-control"
            id="formGroupExampleInput2"
            placeholder="Content input"
            onChange={contentHandler}
            value={content}
            // ref={contentInputRef}
          />
        </div>
        <div class="custom-file">
          <input type="file" class="custom-file-input" id="customFile" />
          <label class="custom-file-label" for="customFile">
            Choose image file
          </label>
        </div>
        <div class="form-group mb-2" style={{ marginTop: "3em" }}>
          <label for="skill">Skills Required: </label>
          <input type="text" id="skill" value={skill} onChange={skillHandler} />
          <button
            type="button"
            style={{ display: "inline", marginLeft: "2em" }}
            onClick={addSkillHandler}
          >
            Add
          </button>
        </div>

        <div class="col-auto">
          <button type="submit" class="btn btn-primary mb-2">
            Submit
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default AddCourse;
