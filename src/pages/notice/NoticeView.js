import React from "react";
import { useParams } from "react-router-dom";
import { loadingStart, loadingEnd } from "redux/store";
const NoticeView = () => {
  const { id } = useParams();
  return (
    <>
      <div>NoticeView</div>
    </>
  );
};
export default NoticeView;