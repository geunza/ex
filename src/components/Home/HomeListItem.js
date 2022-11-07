import React from "react";
import { Link } from "react-router-dom";
const HomeListItem = ({ item, /*likeShow,*/ styles }) => {
  return (
    <>
      <div className={styles.HomeListItem}>
        <Link to="###">
          <h5>{item.title}</h5>
          <p>
            <span>View {item.view_count}</span>
            {/* {likeShow && <span>Like {item.like_count}</span>} */}
          </p>
        </Link>
      </div>
    </>
  );
};
export default HomeListItem;
