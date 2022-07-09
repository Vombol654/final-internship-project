import "../Styles/loading.css";

const Loading = ({ content }) => {
  return (
    <div className="loading">
      <div class="spinner-border" role="status"></div>
      <span>{content}</span>
    </div>
  );
};

export default Loading;
