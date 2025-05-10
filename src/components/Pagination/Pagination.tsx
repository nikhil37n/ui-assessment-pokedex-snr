import React, { FC } from "react";
import { createUseStyles } from "react-jss";
import { PaginationProps } from "../Model/Pokemon.model";

const Pagination: FC<PaginationProps> = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
  loading,
}) => {
  const classes = useStyles();
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }
  return (
    <div className={classes.pagination}>
      {!loading && <span>Prev &lt; &lt;</span>}

      {pages.map((page: number, index: number) => {
        return (
          <button
            className={
              page == currentPage
                ? `${classes.button} + active`
                : classes.button
            }
            key={index}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        );
      })}

      {!loading && <span>Next &gt;&gt;</span>}
    </div>
  );
};

const useStyles = createUseStyles(
  {
    pagination: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      position: "fixed",
      bottom: "20px",
      left: "22%",
    },
    button: {
      width: "38px",
      height: "38px",
      fontFamily: "inherit",
      fontWeight: 600,
      fontSize: "12px",
      margin: "0 10px",
      borderRadius: "6px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      background: "darkslategrey",
      color: "#fff",
      border: "1px solid rgba(0,255,255,0.5)",
      "&.active": {
        fontWeight: 900,
        border: "1px solid darkslategrey",
        background: "rgba(0,255,255,0.5)",
        color: "#fff",
      },
    },
  },
  { name: "Pagination" }
);

export default Pagination;
