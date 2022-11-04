import React from "react";
import { useSelector } from "react-redux";

const FilterButton = ({ v, i, styles, selectedItems, setSelectedItems }) => {
  const btnClick = (e) => {
    const {
      target: { value },
    } = e;
    let copy = [...selectedItems];
    copy[i] = value;
    setSelectedItems(copy);
  };

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  return (
    <>
      <li className={styles.btnItem}>
        <span>{v.name}</span>
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
