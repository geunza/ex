import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSupportInfo } from "store/supportInfoSlice";
const FilterButton = ({ v, i, styles, selectedItems, setSelectedItems }) => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const supportInfo = useSelector((state) => state.supportInfo);
  const dispatch = useDispatch();
  const btnClick = (e, infoName, multiply, order) => {
    const {
      target: { value },
    } = e;
    if (!isLoggedIn) {
      alert("로그인X");
      return false;
    }
    dispatch(
      setSupportInfo({
        name: infoName,
        value: value,
        multiply: multiply,
        order: order,
      })
    );
  };
  useEffect(() => {
    setSelectedItems(supportInfo);
  }, [supportInfo]);
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
            v.multiply
              ? (clicked = selectedItems[infoName].includes(v2.value))
              : (clicked = selectedItems[infoName].text == v2.value);
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
                      : btnClick(e, infoName, v.multiply, v2.order);
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
