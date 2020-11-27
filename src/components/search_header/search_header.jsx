import styles from "./search_header.module.css";
import React, { memo, useRef } from "react";
import { Link } from "react-router-dom";

const SearchHeader = memo(({ onSearch }) => {
  const inputRef = useRef();

  const handleSearch = () => {
    const value = inputRef.current.value;
    // console.log(value);
    onSearch(value); //여기서 props를 바꿔주면 최상위 컴포넌트app의
    //onSearch가 다시 업데이트 된다!
  };

  const onClick = () => {
    handleSearch();
  };

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      //"Enter"은 진짜로 엔터쳤을때 이다!
      handleSearch();
    }
  };
  return (
    <header className={styles.header}>
      <Link
        className={styles.logo}
        to="/"
        onClick={() => window.location.reload()}
      >
        <img className={styles.img} src="/images/logo.png" alt="logo" />
        <h1 className={styles.title}>Kwangtube</h1>
      </Link>
      <div className={styles.inputBox}>
        <input
          ref={inputRef}
          className={styles.input}
          type="search"
          placeholder="Search..."
          onKeyPress={onKeyPress}
        />
        <button className={styles.button} onClick={onClick}>
          <img
            className={styles.buttonImg}
            src="/images/search.png"
            alt="search"
          />
        </button>
      </div>
    </header>
  );
});

export default SearchHeader;
