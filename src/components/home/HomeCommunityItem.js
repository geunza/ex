import React from "react";
import { Link } from "react-router-dom";
const HomeCommunityItem = ({ item, likeShow, styles }) => {
  return (
    <>
      <div className={styles.HomeCommunityItem}>
        <Link to={`/community/communityView/${item.id}`}>
          <h5>{item.title}</h5>
          <div className={styles.countArea}>
            <p>
              <img
                src={require("assets/img/global/ico/ico_star.png")}
                alt="View count"
              />
              <span>{item.like_cnt}</span>
            </p>
            <p>
              <img
                src={require("assets/img/global/ico/ico_view.png")}
                alt="like count"
              />

              <span>{item.view_count}</span>
            </p>
          </div>
        </Link>
      </div>
    </>
  );
};
export default HomeCommunityItem;
