import "../Styles/form.css";

const Form = ({
  children,
  className = "grid-col-1",
  submitHandler,
  ...otherprops
}) => {
  return (
    <form className={className} onSubmit={submitHandler} {...otherprops}>
      {children}
    </form>
  );
};

export default Form;
