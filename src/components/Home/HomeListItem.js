import React from "react";
import { Link } from "react-router-dom";
import styles from "scss/components/Home/HomeListItem.module.scss";
const HomeListItem = ({ item, likeShow }) => {
  return (
    <>
      <li className={styles.HomeListItem}>
        <Link to="###">
          <h4>{item.title}</h4>
          <p>
            <span>View {item.view_count}</span>
            {likeShow && <span>Like {item.like_count}</span>}
          </p>
        </Link>
      </li>
    </>
  );
};
export default HomeListItem;
