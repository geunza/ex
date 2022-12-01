import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "scss/components/home/FilterButton.module.scss";
const FilterButton = ({
  v,
  i,
  selectedItems,
  setSelectedItems,
  infoBtnClick,
}) => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  return (
    <div className={styles.FilterBtnWrap}>
      <p className={styles.FilterBtnTitle}>
        {v.name}
        {v.multiply && <span className={styles.multiply}>(중복가능)</span>}
      </p>
      <ol className={styles.filterList}>
        {v.btns.map((v2, i2) => {
          const infoName = v.infoName;
          const target = selectedItems[infoName];
          let clicked;
          if (v.multiply) {
            clicked = target.some((item) => item.text == v2.value);
          } else {
            clicked = target.text == v2.value;
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
                    ? alert("로그인이 필요합니다.")
                    : infoBtnClick(
                        e,
                        infoName,
                        v.multiply,
                        v2.order,
                        v.required
                      );
                }}
                data-disabled={!isLoggedIn && i2 != 0 ? "disabled" : null}
              >
                {v2.text}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
export default FilterButton;
