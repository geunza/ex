import React from "react";
const FilterSelect = ({
  v,
  i,
  modalOpener,
  selectedItems,
  setSelectedItems,
  modalStep,
  setModalStep,
}) => {
  return (
    <div>
      <p>{v.name}</p>
      <ol>
        <li>
          <button
            type="button"
            name="Modal1"
            value={true}
            onClick={(e) => {
              setModalStep(i);
              modalOpener(e);
            }}
          >
            {v.name}
          </button>
        </li>
      </ol>
    </div>
  );
};
export default FilterSelect;
