import React from "react";
import { useSelector } from "react-redux";

const FilterButton = ({ v, i, styles, selectedItems, setSelectedItems }) => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const btnClick = (e) => {
    const {
      target: { value },
    } = e;
    if (!isLoggedIn) {
      alert("로그인X");
      return false;
    }
    let copy = [...selectedItems];

    copy[i] = value;
    setSelectedItems(copy);
  };

  return (
    <>
      <li className={styles.btnItem}>
        <p>{v.name}</p>
        <ol>
          {v.btns.map((v2, i2) => {
            const clicked = selectedItems.includes(v2.value);
            return (
              <li key={v2.value}>
                <button
                  type="button"
                  name={v.name}
                  value={v2.value}
                  data-clicked={clicked}
                  onClick={btnClick}
                >
                  {v2.text}
                </button>
              </li>
            );
          })}
        </ol>
      </li>
    </>
  );
};
export default FilterButton;
