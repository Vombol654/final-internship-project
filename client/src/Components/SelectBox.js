import "../Styles/selectBox.css";

const SelectBox = ({
  data = [],
  id,
  label,
  value,
  error,
  onFocus,
  onChange,
  onBlur,
  type,
}) => {
  return (
    <div className="input-group">
      <div className="input-field">
        <label htmlFor={id} className={value === "" ? "shrink" : ""}>
          {label}
        </label>
        {/* <input type="file" onBeforeInput={(e)=>e.currentTarget.type} onChange={(e) => e.target.files[0]} /> */}
        <select
          className="select-box select-color-none"
          // defaultValue="none"
          value={value === "" ? "none" : value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        >
          <option value="none" disabled>
            Select {label}
          </option>
          {data.map((opt) => {
            return (
              <option key={opt[`${type}`]} value={opt[`${type}`]}>
                {opt[`${type}`]}
              </option>
            );
          })}
        </select>
      </div>
      <span className="error">{error}</span>
    </div>
  );
};

export default SelectBox;
