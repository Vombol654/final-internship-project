const Button = ({ btnName, ...otherProps }) => {
  return <button {...otherProps}>{btnName}</button>;
};

export default Button;
