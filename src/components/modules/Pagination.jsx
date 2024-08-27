import { useEffect } from "react";
import styles from "./Pagination.module.css";

function Pagination({ page, setPage }) {
  useEffect(() => {
    const paragraphs = document.querySelectorAll("p");
    paragraphs.forEach((paragraph) => {
      if (page === +paragraph.innerText) {
        paragraph.classList.add(styles.selected);
      } else {
        paragraph.classList.remove(styles.selected);
      }
    });
  }, [page]);

  const previousHandler = () => {
    if (page <= 1) return;
    setPage((page) => page - 1);
  };

  const nextHandler = () => {
    if (page >= 10) return;
    setPage((page) => page + 1);
  };

  return (
    <div className={styles.pagination}>
      <button
        onClick={previousHandler}
        className={page === 1 ? styles.disabled : null}
      >
        previous
      </button>
      <p>1</p>
      <p>2</p>
      <span>...</span>
      {page > 2 && page < 9 && (
        <>
          <p>{page}</p>
          <span>...</span>
        </>
      )}
      <p>9</p>
      <p>10</p>
      <button
        onClick={nextHandler}
        className={page === 10 ? styles.disabled : null}
      >
        next
      </button>
    </div>
  );
}

export default Pagination;
