import { useState } from "react";
import "../Styles/InputField.css";
import ShowPassword from "./ShowPassword/ShowPassword.component";

const InputField = ({
  label,
  id,
  name = "",
  type = "text",
  value,
  error = "",
  Children = null,
  style = {},
  ...otherprops
}) => {
  const [showpassword, setShowPassword] = useState(false);

  return (
    <div className="input-group" style={style}>
      <div className="input-field">
        <label
          htmlFor={id}
          className={
            value === "" || (type === "text" && name === "image")
              ? "shrink"
              : ""
          }
        >
          {label}
        </label>
        {name !== "password" && name !== "image" && (
          <input id={id} type={type} value={value} {...otherprops} />
        )}
        {name === "image" && (
          <input id={id} type={type} defaultValue="" {...otherprops} />
        )}
        {name === "password" && (
          <input
            id={id}
            type={showpassword ? "text" : "password"}
            value={value}
            {...otherprops}
          />
        )}
      </div>
      <span className="error">{error}</span>
      {name === "password" && (
        <ShowPassword
          label="Show Password"
          id="sp"
          setState={setShowPassword}
          checked={showpassword}
        />
      )}
    </div>
  );
};

export default InputField;
