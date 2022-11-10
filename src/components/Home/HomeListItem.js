import React from "react";
import { Link } from "react-router-dom";
const HomeListItem = ({ item, likeShow, styles }) => {
  return (
    <>
      <div className={styles.HomeListItem}>
        <Link to={`/community/communityView/${item.id}`}>
          <h5>{item.title}</h5>
          <div className={styles.countArea}>
            <p>
              {likeShow ? (
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/public_assets/img/home/ico_view.png"
                  }
                  alt="like count"
                />
              ) : (
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/public_assets/img/home/ico_view_black.png"
                  }
                  alt="like count"
                />
              )}

              <span>{item.view_count}</span>
            </p>
            {likeShow && (
              <p>
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/public_assets/img/home/ico_star.png"
                  }
                  alt="View count"
                />
                <span>{item.like_count}</span>
              </p>
            )}
          </div>
        </Link>
      </div>
    </>
  );
};
export default HomeListItem;
