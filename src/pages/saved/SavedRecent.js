import React from "react";
import SavedTitle from "components/saved/SavedTitle";
import SavedCategory from "components/saved/SavedCategory";
import styles from "scss/pages/SavedRecent.module.scss";
const SavedRecent = () => {
  return (
    <div className={styles.SavedRecent}>
      <SavedTitle />
      <div className={`inner ${styles.savedCont}`}>
        <div className={styles.leftArea}>
          <SavedCategory />
        </div>
        <div className={styles.rightArea}>RIGHTAREA</div>
      </div>
    </div>
  );
};
export default SavedRecent;
