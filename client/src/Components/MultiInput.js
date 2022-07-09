import { useEffect, useState } from "react";
import "../Styles/multiInput.css";

const MultiInput = ({ label, style = {}, setState, state }) => {
  const [value, setValue] = useState("");
  const [data, setData] = useState([state.value]);

  const handleAdd = () => {
    setState({ ...state, value: [...state.value, value] });
    setValue("");
  };

  useEffect(() => {
    console.log(state);
    setData(state.value);
  }, [state]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="input-group" style={style}>
      <div className="multi-input-container">
        <div className="input-field">
          <label className={value ? "" : "shrink"}>{label}</label>
          <input value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
        <button className="btn-add" onClick={handleAdd}>
          Add
        </button>

        <div className="data-added-list">
          {data.map((d, index) => {
            return (
              <p key={index} className="data-added">
                {d}
              </p>
            );
          })}
        </div>
      </div>
      <span className="error">{state.err}</span>
    </div>
  );
};

export default MultiInput;
