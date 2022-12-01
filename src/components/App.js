import styles from "scss/components/App.module.scss";
import "scss/reset.scss";
import "scss/global.scss";
import { useState } from "react";
import AppRouter from "components/Router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { setSupportInfo1 } from "redux/store";
function App() {
  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
