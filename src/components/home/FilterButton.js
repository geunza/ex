import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSupportInfo } from "store/supportInfoSlice";
const FilterButton = ({
  v,
  i,
  styles,
  selectedItems,
  setSelectedItems,
  infoBtnClick,
}) => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  return (
    <>
      <li className={styles.btnItem}>
        <p>
          {v.name}
          {v.multiply && <span className={styles.multiply}>(중복가능)</span>}
        </p>
        <ol>
          {v.btns.map((v2, i2) => {
            const infoName = v.infoName;
            let clicked;
            if (v.multiply) {
              clicked = selectedItems[infoName].some(
                (item) => item.text == v2.value
              );
            } else {
              clicked = selectedItems[infoName].text == v2.value;
            }
            return (
              <li key={v2.value}>
                <button
                  type="button"
                  name={v.name}
                  value={v2.value}
                  data-clicked={clicked}
                  onClick={(e) => {
                    !isLoggedIn && i2 != 0
                      ? alert("로그인하세요")
                      : infoBtnClick(e, infoName, v.multiply, v2.order);
                  }}
                  data-disabled={!isLoggedIn && i2 != 0 ? "disabled" : null}
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
