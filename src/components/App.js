import styles from "scss/components/App.module.scss";
import "scss/reset.scss";
import "scss/global.scss";
import { useState } from "react";
import AppRouter from "components/Router";
import { useSelector } from "react-redux";
function App() {
  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
