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
      <span>{v.name}</span>
      <select name={v.name} key={idx} onChange={(e) => sltChange(e, idx)}>
        {v.opts.map((v2, i2) => {
          return (
            <option value={v2.value} key={v2.value}>
              {v2.text}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default FilterSelect;
