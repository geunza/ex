import React from "react";
const FilterSelect = ({ v, i, idx, selectedItems, setSelectedItems }) => {
  const sltChange = (e, idx) => {
    const {
      target: { value },
    } = e;
    let copy = [...selectedItems];
    copy[idx] = value;
    setSelectedItems(copy);
  };
  return (
    <div key={idx}>
      <p>{v.name}</p>
      <ol>
        <li>
          <button type="button">전체</button>
        </li>
      </ol>
    </div>
  );
};
export default FilterSelect;
