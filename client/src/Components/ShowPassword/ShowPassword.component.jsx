import { useState } from "react";
import "./ShowPassword.style.css";

const ShowPassword = ({ setState, checked }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="showpassword-icon">
      <ion-icon
        name={checked ? "eye" : "eye-off"}
        onClick={(e) => {
          if (e.target.name === "eye-off") {
            setState(true);
          } else {
            setState(false);
          }
        }}
        class="md hydrate icon"
      ></ion-icon>
    </div>
    // <div className="showPassword">
    //   <input
    //     type="checkbox"
    //     id={id}
    //     onChange={(e) => setState(e.target.checked)}
    //     checked={checked}
    //   />
    //   <label htmlFor={id}>{label}</label>
    // </div>
  );
};

export default ShowPassword;
