import { useEffect, useState } from "react";
import "../../../Styles/pagination.css";

const Pagenition = (props) => {
  const { onPageChange, totalPages, activePage } = props;

  const [active, setActive] = useState(activePage);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    setTotalPage(totalPages);
  }, []);

  useEffect(() => {
    setTotalPage(totalPages);
  }, [totalPages]);

  //   useEffect(() => {
  //     setTotalPage(totalPages);
  //   }, [totalPages]);

  useEffect(() => {
    console.log(totalPage);
  }, [totalPage]);

  useEffect(() => {
    console.log("fr Pg Active Page " + activePage);
  }, [activePage]);

  const PageNo = () => {
    let pages = [];
    for (let i = 1; i <= totalPage; i++) {
      pages.push(
        <div
          className={`r r2 ${active === i ? "active" : ""}`}
          onClick={(e) => {
            onPageChange(i, e);
            setActive(i);
          }}
        >
          {i}
        </div>
      );
    }

    return pages;
  };

  return (
    <div className="z">
      <div
        className="r r2"
        onClick={() => {
          let page = active === 1 ? totalPage : active - 1;
          onPageChange(page);
          setActive(page);
        }}
      >
        &#10094;
      </div>
      {totalPage > 0 && PageNo().map((page) => page)}

      <div
        className="r r2"
        onClick={() => {
          console.log(active);
          let page = active === totalPage ? 1 : active + 1;
          console.log(page);
          setActive(page);
          onPageChange(page);
        }}
      >
        &#10095;
      </div>
    </div>
  );
};
export default Pagenition;
