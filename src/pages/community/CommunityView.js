import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const CommunityView = () => {
  const { id } = useParams();
  return (
    <>
      <div>CommunityView {id}</div>
    </>
  );
};
export default CommunityView;
