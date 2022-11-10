import React from "react";
import styles from "scss/components/support/SupportItems.module.scss";
const SupportItems = () => {
  return (
    <>
      <div className="supportItems">
        <div className="ordArea">
          <button type="button">전체</button>
          <button type="button">인기순</button>
          <button type="button">금액높은순</button>
          <button type="button">마감임박순</button>
        </div>
      </div>
    </>
  );
};
export default SupportItems;
