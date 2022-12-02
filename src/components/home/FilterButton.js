import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "scss/components/home/FilterButton.module.scss";
import Tooltip from "components/Tooltip";

const FilterButton = ({ item, onClick, idx, baseObj }) => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const supportInfo = useSelector((state) => state.supportInfo);
  const disabled = !isLoggedIn && idx != 0;
  const [hasToolTip, setHasToolTip] = useState(false);
  const [hastooltipCont, setTooltipCont] = useState("");
  const tooltipOpen = (e) => {
    e.stopPropagation();
    const target = e.currentTarget.querySelector(".toolTipBox");
    target.classList.contains("active")
      ? target.classList.remove("active")
      : target.classList.add("active");
  };
  useEffect(() => {
    if (item.ctg_nm == "기술분야" && item.code_nm == "기타") {
      setHasToolTip(true);
      setTooltipCont(
        "뷰티/화장품, 패션, 예술, 광고/마케팅, 화학, 유아/출산, 부동산/건설, 소셜미디어/커뮤니티, 화학, 인사/비지니스/법률 등을 포함합니다."
      );
    }
    if (item.ctg_nm == "기술분야" && item.code_nm == "딥테크") {
      setHasToolTip(true);
      setTooltipCont(
        "AI,자율주행, 블록체인, 나노소재, 5G/6G, 스마트팜, 빅데이터 스마트홈 등을 포함하는 분야입니다."
      );
    }
  }, []);

  return (
    <button
      className={
        styles.filterBtn +
        " " +
        ((baseObj[item.ctg_cd].datas.find(
          (x) => Object.entries(x).toString() == Object.entries(item).toString()
        )
          ? styles.selected
          : "") +
          " " +
          (hasToolTip ? styles.tooltipBtn : ""))
      }
      onClick={(e) => {
        onClick(item, e);
      }}
      disabled={disabled}
    >
      {item.code_nm}
      {hasToolTip && (
        <i class="btnToolTip" onClick={tooltipOpen}>
          <img
            src={
              process.env.PUBLIC_URL +
              "/public_assets/img/global/btn/btn_tooltip.png"
            }
            alt="tooltip"
          />
          <Tooltip cont={hastooltipCont} />
        </i>
      )}
    </button>
  );
};
export default FilterButton;
